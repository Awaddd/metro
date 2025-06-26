import { baseUrl } from "@/lib/constants";
import { FilteredStatistic, FilterParams } from "@/types/stats";

type ReturnType = {
  statistics: FilteredStatistic;
  lastUpdated: Date | null;
  stale: boolean;
};

export default async function (
  filters: FilterParams
): Promise<ReturnType | undefined> {
  console.log(
    `getting data for month (${filters.month ? filters.month : "ALL"})`
  );

  const url = new URL("/api/stop-search-data", baseUrl);

  if (filters.month) {
    url.searchParams.set("month", filters.month);
  }

  if (filters.ageRange) {
    url.searchParams.set("age", filters.ageRange);
  }

  if (filters.type) {
    url.searchParams.set("type", filters.type);
  }

  try {
    const response = await fetch(url.toString());
    return await response.json();
  } catch (e) {
    console.error("Error fetching from route, original error", e);
  }
}
