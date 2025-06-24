import client from "@/lib/mongodb";
import {
  isCacheValid,
  loadFromCache,
  persist,
} from "@/services/stopSearch/cache";
import { fetchStopSearchData } from "@/services/stopSearch/fetch";
import { transformData } from "@/services/stopSearch/transform";
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

async function getStopSearchData(date?: string) {
  await client.connect();
  const db = client.db("metro");

  let cachedData: any[] = [];

  const isValid = await isCacheValid(db);

  if (isValid) {
    cachedData = await loadFromCache(db);
  }

  if (cachedData.length > 0) {
    return cachedData;
  }

  // else fetch anew

  const data = await fetchStopSearchData();
  const docs = data.map((item) => transformData(item));

  // placeholder fetch response transformed

  // update cache
  persist(db, docs);

  await client.close();
  return docs;
}
