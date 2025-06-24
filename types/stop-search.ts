export type StopSearchResponse = {
  age_range: string | null;
  officer_defined_ethnicity: string | null;
  involved_person: boolean;
  self_defined_ethnicity: string | null;
  gender: string | null;
  legislation: string | null;
  outcome_linked_to_object_of_search: boolean | null;
  datetime: string;
  outcome: string | null;
  outcome_object: Outcome | null;
  location: Location | null;
  object_of_search: string | null;
  operation: boolean | null;
  operation_name: string | null;
  type: string;
  removal_of_more_than_outer_clothing: boolean | null;
};

export type StopSearchData = {
  ageRange: "under 10" | "10-17" | "18-24" | "25-34" | "over 34" | null;
  officerDefinedEthnicity: string | null;
  involvedPerson: boolean;
  selfDefinedEthnicity: string | null;
  gender: string | null;
  legislation: string | null;
  outcomeLinkedToObjectOfSearch: boolean | null;
  datetime: string;
  outcome: string | null;
  outcomeObject: Outcome | null;
  location: Location | null;
  objectOfSearch: string | null;
  operation: boolean | null;
  operationName: string | null;
  type: "Person search" | "Vehicle search" | "Person and Vehicle search";
  removalOfMoreThanOuterClothing: boolean | null;
};

type Outcome = {
  id: string;
  name: string;
};

type Street = {
  id: number;
  name: string;
};

type Location = {
  latitude: string;
  longitude: string;
  street: Street;
};

export type StopSearchFilters = {
  date?: string | null;
};
