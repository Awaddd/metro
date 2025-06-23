import client from "@/utils/mongodb";
import getAvailableDates from "./available-dates";

export default async function getStopSearchData(date?: string) {
  // check cached data in mongo
  // if present, return from cache
  // else fetch anew
  // normalise
  // update cache

  //   const availableDates = await getAvailableDates();
  //   batch(availableDates, 10);
  const data = await fetchData(date);

  normaliseData(data);
  persist(data);

  return data;
}

async function fetchData(date?: string) {
  console.log(`getting data for date (${date ? date : "ALL"})`);
  const url = "https://jsonplaceholder.typicode.com/posts";
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function normaliseData(data: any) {
  return data;
}

async function persist(data: any) {
  try {
    const mongoClient = await client.connect();
  } catch (e) {
    console.error(e);
  }

  return data;
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
