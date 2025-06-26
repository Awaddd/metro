import { StopSearchData } from "./stop-search";

// consider 2 types, one for what is held in mongo i.e. raw vals
// and one to hold the computed vals that are shown to the end user
export type StopSearchStatistics = {
  totalSearches: number;
  daysWithData: number;
  averagePerDay?: number;
  arrests: number;
  arrestRate?: number;
  genders: Map<string, number> | Record<string, any>;
  mostSearchedGender?: string | null;
  mostSearchedGenderValue?: number;
  objectsOfSearch: Map<string, number> | Record<string, any>;
  totalSearchedObjects?: number;
  mostSearchedObject?: string | null;
  mostSearchedObjectValue?: number;
  outcomes: Map<string, number> | Record<string, any>;
  mostSearchedOutcome?: string | null;
  mostSearchedOutcomeValue?: number;
};

// this is 1 statistic with its combination of filters, we could have hundreds like this
// since this is stored in mongo, it must have a value for each filter and it must be
// one of the valid values for that filter
export type StatisticDocument = StopSearchStatistics & {
  month: string; // i.e. 2024-08
  type: StopSearchData["type"]; // i.e. Person Search
  ageRange: StopSearchData["ageRange"]; // i.e. 18-24
};

type StatisticFilters = {
  month: string | null;
  type: StopSearchData["type"] | null;
  ageRange: StopSearchData["ageRange"] | null;
};

// this is what is returned to the user, since filters are applied conditionally
// they don't all have to be set, and none can be set
export type FilteredStatistic = StopSearchStatistics & StatisticFilters;

export type FilterParams = Partial<StatisticFilters>;
