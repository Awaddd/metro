import getAvailableDates from "@/queries/get-available-dates";
import { StopSearchResponse } from "@/types/stop-search";

export async function fetchStopSearchData(
  date?: string
): Promise<StopSearchResponse[]> {
  // const availableDates = await getAvailableDates();
  // batchFetchData(availableDates, 10);
  return tempData;
}

async function batchFetchData(dates: string[], size: number) {
  console.log("batching array in chunks of", size);
  for (let i = 0; i < dates.length; i += size) {
    console.log("executing batch ", i);
    const chunk = dates.slice(i, i + size);
    const promises = chunk.map((date) => fetchData(date));
    await Promise.all(promises);
  }
}

async function fetchData(date: string): Promise<StopSearchResponse[]> {
  // fetch data from police api

  try {
    //
  } catch (e) {
    //
  }

  return [];
}

const tempData: StopSearchResponse[] = [
  {
    age_range: "over 34",
    outcome: "A no further action disposal",
    involved_person: true,
    self_defined_ethnicity: "Other ethnic group - Not stated",
    gender: "Male",
    legislation: "Misuse of Drugs Act 1971 (section 23)",
    outcome_linked_to_object_of_search: false,
    datetime: "2024-08-22T16:15:00+00:00",
    removal_of_more_than_outer_clothing: false,
    outcome_object: {
      id: "bu-no-further-action",
      name: "A no further action disposal",
    },
    location: {
      latitude: "51.486807",
      street: {
        id: 1677490,
        name: "On or near St George'S Square Mews",
      },
      longitude: "-0.133480",
    },
    operation: false,
    officer_defined_ethnicity: "White",
    type: "Person search",
    operation_name: null,
    object_of_search: "Controlled drugs",
  },
  {
    age_range: "18-24",
    outcome: "A no further action disposal",
    involved_person: true,
    self_defined_ethnicity: "Black/African/Caribbean/Black British - Caribbean",
    gender: "Male",
    legislation: "Criminal Justice and Public Order Act 1994 (section 60)",
    outcome_linked_to_object_of_search: false,
    datetime: "2024-08-26T13:50:00+00:00",
    removal_of_more_than_outer_clothing: false,
    outcome_object: {
      id: "bu-no-further-action",
      name: "A no further action disposal",
    },
    location: {
      latitude: "51.526292",
      street: {
        id: 1666210,
        name: "On or near Park/Open Space",
      },
      longitude: "-0.216618",
    },
    operation: false,
    officer_defined_ethnicity: "Black",
    type: "Person search",
    operation_name: null,
    object_of_search: "Anything to threaten or harm anyone",
  },
];
