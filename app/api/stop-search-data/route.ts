import { StopSearchData, StopSearchResponse } from "@/types/stop-search";
import { DATA_COLLECTION, META_COLLECTION } from "@/lib/constants";
import client from "@/lib/mongodb";
import { Db } from "mongodb";
import { NextResponse } from "next/server";
import metroData from "@/testData/metro-aug-24.json";

type Params = {};

export async function GET(request: Request) {
  const url = new URL(request.url);

  // get date filter if present
  const date = url.searchParams.get("date");

  try {
    // const uniqueAgeRanges = [
    //   ...new Set(
    //     ((metroData as { type: string }[]) ?? []).map((obj) => obj.type)
    //   ),
    // ];
    // console.log("type", uniqueAgeRanges);

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

  //   const availableDates = await getAvailableDates();
  //   batch(availableDates, 10);
  //   const data = await fetchData(date);
  const data: StopSearchResponse[] = [
    {
      age_range: "over 34",
      outcome: "A no further action disposal",
      involved_person: true,
      self_defined_ethnicity: "Other ethnic group - Not stated",
      gender: "Male",
      legislation: "Misuse of Drugs Act 1971 (section 23)",
      outcome_linked_to_object_of_search: false,
      datetime: "2024-08-22T16:15:00+00:00",
      removal_of_more_than_outer_clothing: false,
      outcome_object: {
        id: "bu-no-further-action",
        name: "A no further action disposal",
      },
      location: {
        latitude: "51.486807",
        street: {
          id: 1677490,
          name: "On or near St George'S Square Mews",
        },
        longitude: "-0.133480",
      },
      operation: false,
      officer_defined_ethnicity: "White",
      type: "Person search",
      operation_name: null,
      object_of_search: "Controlled drugs",
    },
    {
      age_range: "18-24",
      outcome: "A no further action disposal",
      involved_person: true,
      self_defined_ethnicity:
        "Black/African/Caribbean/Black British - Caribbean",
      gender: "Male",
      legislation: "Criminal Justice and Public Order Act 1994 (section 60)",
      outcome_linked_to_object_of_search: false,
      datetime: "2024-08-26T13:50:00+00:00",
      removal_of_more_than_outer_clothing: false,
      outcome_object: {
        id: "bu-no-further-action",
        name: "A no further action disposal",
      },
      location: {
        latitude: "51.526292",
        street: {
          id: 1666210,
          name: "On or near Park/Open Space",
        },
        longitude: "-0.216618",
      },
      operation: false,
      officer_defined_ethnicity: "Black",
      type: "Person search",
      operation_name: null,
      object_of_search: "Anything to threaten or harm anyone",
    },
  ];

  const docs = data.map((item) => transformData(item));

  // placeholder fetch response transformed

  // update cache
  persist(db, docs);

  await client.close();
  return docs;
}

async function fetchData(date?: string) {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function transformData(data: StopSearchResponse): StopSearchData {
  return {
    ageRange: data.age_range as StopSearchData["ageRange"],
    officerDefinedEthnicity: data.officer_defined_ethnicity,
    involvedPerson: data.involved_person,
    selfDefinedEthnicity: data.self_defined_ethnicity,
    gender: data.gender,
    legislation: data.legislation,
    outcomeLinkedToObjectOfSearch: data.outcome_linked_to_object_of_search,
    datetime: data.datetime,
    outcome: data.outcome,
    outcomeObject: data.outcome_object,
    location: data.location,
    objectOfSearch: data.object_of_search,
    operation: data.operation,
    operationName: data.operation_name,
    type: data.type as StopSearchData["type"],
    removalOfMoreThanOuterClothing: data.removal_of_more_than_outer_clothing,
  };
}

async function isCacheValid(db: Db) {
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

async function loadFromCache(db: Db) {
  const dataCollection = db.collection(DATA_COLLECTION);

  try {
    return await dataCollection.find().toArray();
  } catch (e) {
    console.error(
      "Failed to load stop and search data from cache, original error:",
      e
    );
    return [];
  }
}

async function persist(db: Db, docs: any[]) {
  const dataCollection = db.collection(DATA_COLLECTION);
  const meta = db.collection(META_COLLECTION);

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
    return false;
  }

  // update meta if successfully updated data
  try {
    const doc = {
      lastUpdated: new Date(),
    };

    const result = await meta.updateOne({}, { $set: doc }, { upsert: true });

    console.log("updated meta with", result.upsertedId);
    return true;
  } catch (e) {
    console.error("Failed to update mongo meta, original error", e);
    return false;
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
