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

    return NextResponse.json({
      data,
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
    // return stale data in the mean time, trigger a fetch to happen in the background
    runInBackground(() => fetchAndPersist(db));
  } else if (stale && !hasData) {
    // fetch new data and force user to wait (rare edgecase, we most probably always will have stale data)
    await fetchAndPersist(db);
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
