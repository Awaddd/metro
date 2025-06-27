import { baseUrl } from "@/lib/constants";
import { AvailableDatesResponse } from "@/app/api/available-dates/route";

export default async function getAvailableDates() {
  const availableDates = await fetchAvailableDates();
  return filterData(availableDates);
}

async function fetchAvailableDates() {
  const url = new URL("/api/available-dates", baseUrl);

  try {
    const response = await fetch(url.toString());
    return await response.json();
  } catch (e) {
    console.error("Error fetching from route, original error", e);
  }
}

function filterData(availableDates: AvailableDatesResponse[]) {
  const dates: string[] = [];

  availableDates.forEach((object) => {
    if (!("stop-and-search" in object)) {
      return;
    }

    if (object["stop-and-search"].includes("metropolitan")) {
      dates.push(object.date);
    }
  });

  console.log("getting dates for metro...", dates);

  return dates;
}
