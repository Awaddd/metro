import { baseUrl } from "@/lib/constants";
import { FilteredStatistic } from "@/types/stats";

type ReturnType = {
  statistics: FilteredStatistic;
  lastUpdated: Date | null;
  stale: boolean;
};

export default async function (date?: string): Promise<ReturnType | undefined> {
  console.log(`getting data for date (${date ? date : "ALL"})`);
  // todo: pass in other filters
  const url = `${baseUrl}/api/stop-search-data?date=${date}`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
