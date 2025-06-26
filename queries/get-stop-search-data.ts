import { baseUrl } from "@/lib/constants";
import { FilteredStatistic } from "@/types/stats";

type ReturnType = {
  statistics: FilteredStatistic;
  lastUpdated: Date | null;
  stale: boolean;
};

export default async function (
  date?: string,
  ageRange?: string,
  type?: string
): Promise<ReturnType | undefined> {
  console.log(`getting data for date (${date ? date : "ALL"})`);
  const url = new URL("/api/stop-search-data", baseUrl);

  if (date) {
    url.searchParams.set("date", date);
  }

  if (ageRange) {
    url.searchParams.set("ageRange", ageRange);
  }

  if (type) {
    url.searchParams.set("type", type);
  }
  try {
    const response = await fetch(url.toString());
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
