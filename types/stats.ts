import { StopSearchData } from "./stop-search";

// this is 1 statistic with its combination of filters, we could have hundreds like this
export type Stats = {
  month: string; // i.e. 2024-08
  type: StopSearchData["type"]; // i.e. Person Search
  ageRange: StopSearchData["ageRange"]; // i.e. 18-24
  totalSearches: number;
  averagePerDay: number;
  arrestRate: number;
  mostSearchedAgeGroup: string | null;
  ethnicities: Map<string, number>;
  // ... other statistics
};
