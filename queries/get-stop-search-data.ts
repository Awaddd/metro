import { baseUrl } from "@/lib/constants";
import { StopSearchData } from "@/types/stop-search";

type ReturnType = {
  data: StopSearchData[];
  lastUpdated: Date | null;
  stale: boolean;
};

export default async function (date?: string): Promise<ReturnType> {
  console.log(`getting data for date (${date ? date : "ALL"})`);
  const url = `${baseUrl}/api/stop-search-data?date=${date}`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    return {
      data: [],
      lastUpdated: null,
      stale: true,
    };
  }
}
