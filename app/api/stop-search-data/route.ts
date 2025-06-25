import { runInBackground } from "@/lib/helpers";
import client from "@/lib/mongodb";
import {
  validateCache,
  loadFromCache,
  persist,
} from "@/services/stopSearch/cache";
import { fetchStopSearchData } from "@/services/stopSearch/fetch";
import { transformData } from "@/services/stopSearch/transform";
import { StopSearchFilters } from "@/types/stop-search";
import { Db } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  // get date filter if present
  const date = url.searchParams.get("date");

  try {
    const { data, stale, lastUpdated } = await getData({});

    console.log("data", data);

    const totalSearches = data.length;

    // slice date instead of formatting with date-fns for improved performance
    // creating a date obj and formatting each would add unnecessary computation
    // especially since we are dealing with many records
    const uniqueDays = new Set(data.map((item) => item.datetime.slice(0, 10)));
    const averagePerDay = totalSearches / uniqueDays.size;

    const stats = {
      overview: {
        totalSearches,
        averagePerDay,
      },
    };

    console.log("stats", stats);

    return NextResponse.json({
      stats,
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

async function getData(filters: StopSearchFilters) {
  const db = client.db("metro");

  const { stale, hasData, lastUpdated } = await validateCache(db);

  if (stale && hasData) {
    console.log("stale, has data... fetching data in background");
    // return stale data in the mean time, trigger a fetch to happen in the background
    runInBackground(() => fetchAndPersist(db));
  } else if (stale && !hasData) {
    // fetch new data and force user to wait (rare edgecase, we most probably always will have stale data)
    console.log("stale, no data... fetching data and waiting");
    await fetchAndPersist(db);
  } else {
    console.log("fresh cached data is available, loading from cache...");
  }

  const data = await loadFromCache(db, filters);

  return {
    data,
    stale,
    lastUpdated,
  };
}

async function fetchAndPersist(db: Db) {
  const freshData = await fetchStopSearchData();
  const transformed = freshData.map(transformData);
  await persist(db, transformed);
}
