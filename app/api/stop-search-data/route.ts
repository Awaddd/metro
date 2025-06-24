import { DATA_COLLECTION, META_COLLECTION } from "@/utils/constants";
import client from "@/utils/mongodb";
import { Collection, Db } from "mongodb";
import { NextResponse } from "next/server";

type Params = {};

export async function GET(request: Request, params: Params) {
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
  // check cached data in mongo
  await client.connect();
  const db = client.db("metro");

  // if present, return from cache
  // else fetch anew

  //   const availableDates = await getAvailableDates();
  //   batch(availableDates, 10);
  const data = await fetchData(date);

  // normalise

  normaliseData(data);

  // update cache
  const docs = [
    {
      age_range: "over 34",
      datetime: "2024-08-22T16:15:00+00:00",
      type: "Person search",
      object_of_search: "Controlled drugs",
    },
    {
      age_range: "18-24",
      datetime: "2024-08-26T13:50:00+00:00",
      type: "Person search",
      object_of_search: "Anything to threaten or harm anyone",
    },
  ];

  persist(db, docs);

  await client.close();
  return data;
}

async function fetchData(date?: string) {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function normaliseData(data: any) {
  return data;
}

async function validateCache(db: Db) {
  const meta = db.collection(META_COLLECTION);

  const startOfDay = new Date();
  const endOfDay = new Date();

  startOfDay.setHours(0, 0, 0, 0);
  endOfDay.setHours(23, 59, 59, 999);

  try {
    const record = await meta.findOne({
      lastUpdated: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    return !!record;
  } catch (e) {
    console.error("Error checking last updated, original error: ", e);
    return false;
  }
}

async function persist(db: Db, docs: any[]) {
  const dataCollection = db.collection(DATA_COLLECTION);
  const metaCollection = db.collection(META_COLLECTION);

  let updated = false;

  try {
    const result = await dataCollection.insertMany(docs);
    console.log("updated stop search collection with", result.insertedCount);
    updated = result.insertedCount === docs.length;
  } catch (e) {
    console.error(
      "Failed to update mongo cache with fresh data, original error:",
      e
    );
  }

  if (!updated) {
    return;
  }

  // update meta if successfully updated data
  try {
    const doc = {
      lastUpdated: new Date(),
    };

    const result = await metaCollection.insertOne(doc);
    console.log("updated meta with", result.insertedId);
  } catch (e) {
    console.error("Failed to update mongo meta, original error", e);
  }
}

async function batch(dates: string[], size: number) {
  console.log("batching array in chunks of", size);
  for (let i = 0; i < dates.length; i += size) {
    console.log("executing batch ", i);
    const chunk = dates.slice(i, i + size);
    const promises = chunk.map((date) => fetchData(date));
    await Promise.all(promises);
  }
}
