import data from "@/testData/metro-aug-24.json";
import { StopSearchResponse } from "@/types/stop-search";

export default async function getStopSearchData() {
  // working with test data for aug 24, the most recent date that has data

  (data as StopSearchResponse[]).forEach((item) => {});
}
