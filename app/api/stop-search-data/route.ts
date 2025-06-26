import {
  ALLOWED_AGE_RANGES,
  ALLOWED_TYPES,
} from "./../../../types/stop-search";
import { runInBackground } from "@/lib/helpers";
import client from "@/lib/mongodb";
import {
  validateCache,
  loadFromCache,
  persist,
} from "@/services/stopSearch/cache";
import { fetchStopSearchData } from "@/services/stopSearch/fetch";
import { transformData } from "@/services/stopSearch/transform";
import {
  FilteredStatistic,
  FilterParams,
  StatisticDocument,
} from "@/types/stats";
import { StopSearchData } from "@/types/stop-search";
import { Db } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  // get filters if present
  const month = url.searchParams.get("month");
  const ageParam = url.searchParams.get("age");
  const typeParam = url.searchParams.get("type");

  // would be better to show an error if the filter is invalid otherwise ainaccurate results will be shown
  // users would not be able to pass in an invalid filter now anyway
  // as we will show them fixed values they can select from
  // but its better to be safe in case things are changed in the future
  const ageRange = ALLOWED_AGE_RANGES.includes(ageParam)
    ? (ageParam as FilterParams["ageRange"])
    : null;

  const type = ALLOWED_TYPES.includes(typeParam ?? "")
    ? (typeParam as FilterParams["type"])
    : null;

  try {
    const { statistics, stale, lastUpdated } = await getData({
      month,
      ageRange,
      type,
    });

    return NextResponse.json({
      statistics,
      stale,
      lastUpdated,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function getData(filters: FilterParams) {
  console.time("totalGetData");
  const db = client.db("metro");

  const { stale, hasData, lastUpdated } = await validateCache(db);

  // todo: improve the fetch in background mechanism and UX or replace with cron job
  if (stale && hasData) {
    console.log("stale, has data... fetching data in background");
    // return stale data in the mean time, trigger a fetch to happen in the background
    runInBackground(() => fetchAndPersist(db));
    // need a mechanism to change the stale property returned when this is completed
    // so the frontend knows to show new data and stop showing "showing stale data, fetching in the background"
  } else if (stale && !hasData) {
    // fetch new data and force user to wait (rare edgecase, we most probably always will have stale data)
    console.log("stale, no data... fetching data and waiting");
    await fetchAndPersist(db);
  } else {
    console.log("fresh cached data is available, loading from cache...");
  }

  const data = await loadFromCache(db);

  // fix this logic, this is always true
  console.log("filters", filters);

  const filtersAreApplied = !!(
    filters?.month ||
    filters?.ageRange ||
    filters?.type
  );

  console.timeEnd("totalGetData");

  // must always return one document, either the unfiltered one with all of the records showing
  // or another record filtered to a single filter or a combination of filters
  return {
    statistics: getTotals(filtersAreApplied ? lookUp(data, filters) : data),
    stale,
    lastUpdated,
  };
}

async function fetchAndPersist(db: Db) {
  console.time("overallFetchAndPersistComputedStatistics");
  const freshData = await fetchStopSearchData();
  const transformed = freshData.map(transformData);
  const statistics = calculateStatistics(transformed);
  await persist(db, statistics);
  console.timeEnd("overallFetchAndPersistComputedStatistics");
}

function calculateStatistics(data: StopSearchData[]) {
  console.time("calculateStatistics");

  // create sets to collect all possible filters
  const uniqueMonths = new Set<string>();
  const uniqueAgeGroups = new Set<StopSearchData["ageRange"]>();
  const uniqueTypes = new Set<StopSearchData["type"]>();

  for (const item of data) {
    uniqueMonths.add(item.datetime.slice(0, 7));
    uniqueAgeGroups.add(item.ageRange);
    uniqueTypes.add(item.type);
  }

  const statistics: StatisticDocument[] = [];

  // precompute statistics for each filter combination
  for (const month of uniqueMonths) {
    for (const ageGroup of uniqueAgeGroups) {
      for (const type of uniqueTypes) {
        // try to find an item in testData where the month, ageGroup and type are the same

        const matchedItems = [];

        for (const item of data) {
          if (
            item.datetime.includes(month) &&
            item.ageRange === ageGroup &&
            item.type === type
          ) {
            matchedItems.push(item);
          }
        }

        if (matchedItems.length === 0) {
          continue;
        }

        const statistic: StatisticDocument = {
          month: month,
          ageRange: ageGroup,
          type: type,
          totalSearches: matchedItems.length,
          arrestRate: 0,
          averagePerDay: 0,
          mostSearchedAgeGroup: "null",
        };

        statistics.push(statistic);
      }
    }
  }

  console.timeEnd("calculateStatistics");
  return statistics;
}

function lookUp(data: StatisticDocument[], filters: FilterParams) {
  console.time("filterStatistics");

  const filtered = data.filter((item) => {
    if (filters?.month && item.month !== filters.month) return false;
    if (filters?.ageRange && item.ageRange !== filters.ageRange) return false;
    if (filters?.type && item.type !== filters.type) return false;
    return true;
  });

  console.timeEnd("filterStatistics");
  return filtered;
}

function getTotals(data: StatisticDocument[]): FilteredStatistic {
  const totals = data.reduce(
    (previous, next) => {
      const n = {
        totalSearches: previous.totalSearches + next.totalSearches,
        arrestRate: previous.arrestRate + next.arrestRate,
        averagePerDay: previous.averagePerDay,
        mostSearchedAgeGroup: previous.mostSearchedAgeGroup,
      };
      return n;
    },
    {
      totalSearches: 0,
      arrestRate: 0,
      averagePerDay: 0,
      mostSearchedAgeGroup: null,
    }
  );

  return {
    month: null,
    ageRange: null,
    type: null,
    ...totals,
  };
}

// todo: take real calculations from here

// function calculateStatistics(data: StopSearchData[]) {
//   console.log("total data", data.length);

//   const totalSearches = data.length;

//   // when determining uniqye days, slice date instead of formatting with date-fns for improved performance
//   // creating a date obj and formatting each would add unnecessary computation
//   // especially since we are dealing with many records
//   const uniqueDays = new Set();
//   let arrestCount = 0;
//   const ages = new Map<string, number>();
//   const ethnicities = new Map<string, number>();

//   // do all calculations in one loop as we are going through a huge number of records
//   // so inefficient to calculate separately
//   for (const item of data) {
//     uniqueDays.add(item.datetime.slice(0, 10));

//     if (item.outcome?.toLowerCase() === "arrest") {
//       arrestCount += 1;
//     }

//     const key = item.ageRange == null ? "null" : item.ageRange;
//     ages.set(key, (ages.get(key) ?? 0) + 1);

//     const ethnicity =
//       item.selfDefinedEthnicity == null ? "null" : item.selfDefinedEthnicity;
//     ethnicities.set(ethnicity, (ethnicities.get(ethnicity) ?? 0) + 1);
//   }

//   const averagePerDay = totalSearches / uniqueDays.size;
//   const arrestRate = (arrestCount / totalSearches) * 100;

//   return {
//     totalSearches,
//     averagePerDay: Math.round(averagePerDay * 10) / 10,
//     arrestRate: Math.round(arrestRate * 10) / 10,
//     mostSearchedAgeGroup: getMostSearchedAgeGroup(ages),
//     ethnicities,
//   };
// }

function getMostSearchedAgeGroup(ages: Map<string, number>) {
  let greatestValue = 0;
  let mostSearchedAgeGroup = null;

  for (const [key, value] of ages) {
    if (value > greatestValue) {
      greatestValue = value;
      mostSearchedAgeGroup = key;
    }
  }

  console.log(
    `Most searched age group ${mostSearchedAgeGroup} with value ${greatestValue}`
  );

  return mostSearchedAgeGroup;
}
