import client from "@/lib/mongodb";
import {
  validateCache,
  loadFromCache,
  persist,
} from "@/services/stopSearch/cache";
import { fetchStopSearchData } from "@/services/stopSearch/fetch";
import { transformData } from "@/services/stopSearch/transform";
import { StopSearchFilters } from "@/types/stop-search";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  // get date filter if present
  const date = url.searchParams.get("date");

  try {
    return NextResponse.json({ message: "connected!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function getData(filters: StopSearchFilters) {
  await client.connect();
  const db = client.db("metro");

  const { stale, hasData, lastUpdated } = await validateCache(db);

  if (stale && hasData) {
    // return stale data in the mean time, trigger a fetch to happen in the background
    fetchStopSearchData()
      .then((data) => data.map(transformData))
      .then((transformed) => persist(db, transformed))
      .catch((e) => console.log("Failed to update data, original error: ", e));

    return await loadFromCache(db, filters);
  }

  if (stale && !hasData) {
    // fetch new data and force user to wait (rare edgecase, we most probably always will have stale data)
    const freshData = await fetchStopSearchData();
    const transformed = freshData.map(transformData);
    await persist(db, transformed);
  }

  const data = await loadFromCache(db, filters);

  return {
    data,
    stale,
    lastUpdated,
  };
}
