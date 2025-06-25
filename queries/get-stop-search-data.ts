import { baseUrl } from "@/lib/constants";

type ReturnType = {
  stats: Stats | null;
  lastUpdated: Date | null;
  stale: boolean;
};

type Stats = {
  overview: {
    totalSearches: number;
    averagePerDay: number;
  };
};

export default async function (date?: string): Promise<ReturnType | undefined> {
  console.log(`getting data for date (${date ? date : "ALL"})`);
  const url = `${baseUrl}/api/stop-search-data?date=${date}`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
