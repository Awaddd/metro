import getAvailableDates from "@/queries/get-available-dates";
import { StopSearchResponse } from "@/types/stop-search";

export async function fetchStopSearchData(): Promise<StopSearchResponse[]> {
  console.log("*** fetching fresh data ***");
  const availableDates = await getAvailableDates();

  // temp limit all data to just 7 months
  console.time("fetchRecordsFromApi");
  const data = await batchFetchData(availableDates.slice(0, 7), 10);
  console.timeEnd("fetchRecordsFromApi");
  return data;
}

async function batchFetchData(dates: string[], size: number) {
  console.log("batching array in chunks of", size);

  const results: StopSearchResponse[] = [];

  for (let i = 0; i < dates.length; i += size) {
    console.log("executing batch ", i);
    const chunk = dates.slice(i, i + size);
    const promises = chunk.map((date) => fetchData(date));
    const batchResult = await Promise.all(promises);
    results.push(...batchResult.flat());
  }

  return results;
}

// fetch data from police api
async function fetchData(date: string): Promise<StopSearchResponse[]> {
  const uri = `${process.env.POLICE_API}/stops-force?force=metropolitan&date=${date}`;
  console.log("fetching at uri", uri);

  try {
    const response = await fetch(uri);
    const data = (await response.json()) as StopSearchResponse[];
    return data;
  } catch (e) {
    console.error(`Failed to fetch data at uri ${uri}, original error: `, e);
  }
  return [];
}
