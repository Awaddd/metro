import { StopSearchData, StopSearchResponse } from "@/types/stop-search";

// when transforming, we will ignore many unnecessary properties, drastically reducing the size of objects
// we store in mongo, this helps both with performance and keeping costs low
// TODO: remove unnecessary properties not used in calculations like legislation
export function transformData(data: StopSearchResponse): StopSearchData {
  return {
    ageRange: data.age_range as StopSearchData["ageRange"],
    officerDefinedEthnicity: data.officer_defined_ethnicity,
    involvedPerson: data.involved_person,
    selfDefinedEthnicity: data.self_defined_ethnicity,
    gender: data.gender,
    legislation: data.legislation,
    outcomeLinkedToObjectOfSearch: data.outcome_linked_to_object_of_search,
    datetime: data.datetime,
    outcome: data.outcome,
    outcomeObject: data.outcome_object,
    location: data.location,
    objectOfSearch: data.object_of_search,
    operation: data.operation,
    operationName: data.operation_name,
    type: data.type as StopSearchData["type"],
    removalOfMoreThanOuterClothing: data.removal_of_more_than_outer_clothing,
  };
}
