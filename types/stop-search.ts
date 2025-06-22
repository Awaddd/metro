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

export type Outcome = {
  id: string;
  name: string;
};

export type Street = {
  id: number;
  name: string;
};

export type Location = {
  latitude: string;
  longitude: string;
  street: Street;
};
