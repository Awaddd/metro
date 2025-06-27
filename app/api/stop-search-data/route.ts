import client from "@/lib/mongodb";
import { loadFromCache, validateCache } from "@/services/stopSearch/cache";
import {
  FilteredStatistic,
  FilterParams,
  StatisticDocument,
} from "@/types/stats";
import { NextResponse } from "next/server";
import {
  ALLOWED_AGE_RANGES,
  ALLOWED_TYPES,
} from "./../../../types/stop-search";

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

  // load data from cache, never write to it from a client. the cron job will be responsible for this
  const data = await loadFromCache(db);

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
  const genders = new Map<string, number>();
  const objectsOfSearch = new Map<string, number>();
  const outcomes = new Map<string, number>();

  const totals = data.reduce(
    (previous, next) => {
      if (next.genders) {
        for (const [key, count] of Object.entries(next.genders)) {
          genders.set(key, (genders.get(key) ?? 0) + count);
        }
      }

      if (next.objectsOfSearch) {
        for (const [key, count] of Object.entries(next.objectsOfSearch)) {
          objectsOfSearch.set(key, (objectsOfSearch.get(key) ?? 0) + count);
        }
      }

      if (next.outcomes) {
        for (const [key, count] of Object.entries(next.outcomes)) {
          outcomes.set(key, (outcomes.get(key) ?? 0) + count);
        }
      }

      return {
        totalSearches: previous.totalSearches + next.totalSearches,
        arrests: previous.arrests + next.arrests,
        daysWithData: previous.daysWithData + next.daysWithData,
      };
    },
    {
      totalSearches: 0,
      arrests: 0,
      daysWithData: 0,
    }
  );

  const { mostSearched: mostSearchedGender, value: mostSearchedGenderValue } =
    getMostSearchedItem(genders);

  const { mostSearched: mostSearchedOutcome, value: mostSearchedOutcomeValue } =
    getMostSearchedItem(outcomes);

  const { mostSearched: mostSearchedObject, value: mostSearchedObjectValue } =
    getMostSearchedItem(objectsOfSearch);

  return {
    month: null,
    ageRange: null,
    type: null,
    arrestRate: (totals.arrests / totals.totalSearches) * 100,
    averagePerDay: totals.totalSearches / totals.daysWithData,
    objectsOfSearch: Object.fromEntries(objectsOfSearch),
    mostSearchedObject,
    mostSearchedObjectValue,
    genders: Object.fromEntries(genders),
    mostSearchedGender,
    mostSearchedGenderValue,
    outcomes: Object.fromEntries(outcomes),
    mostSearchedOutcome,
    mostSearchedOutcomeValue,
    ...totals,
  };
}

function getMostSearchedItem(items: Map<string, number>) {
  let greatestValue = 0;
  let mostSearched = null;

  for (const [key, value] of items) {
    if (value > greatestValue) {
      greatestValue = value;
      mostSearched = key;
    }
  }

  return {
    mostSearched,
    value: greatestValue,
  };
}
