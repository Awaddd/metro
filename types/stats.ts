import { StopSearchData } from "./stop-search";

export type Statistics = {
  totalSearches: number;
  averagePerDay: number;
  arrestRate: number;
  mostSearchedAgeGroup: string | null;
  //   ethnicities: Map<string, number>;
  // ... other statistics
};

// this is 1 statistic with its combination of filters, we could have hundreds like this
// since this is stored in mongo, it must have a value for each filter and it must be
// one of the valid values for that filter
export type StatisticDocument = Statistics & {
  month: string; // i.e. 2024-08
  type: StopSearchData["type"]; // i.e. Person Search
  ageRange: StopSearchData["ageRange"]; // i.e. 18-24
};

// this is what is returned to the user, since filters are applied conditionally
// they don't all have to be set, and none can be set
export type FilteredStatistic = Statistics & {
  month: string | null;
  type: StopSearchData["type"] | null;
  ageRange: StopSearchData["ageRange"] | null;
};
