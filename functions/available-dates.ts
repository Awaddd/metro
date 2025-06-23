import availableDates from "@/testData/dates.json";

// move to queries
export default async function getAvailableDates() {
  const dates: string[] = [];

  (availableDates ?? []).forEach((object) => {
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
