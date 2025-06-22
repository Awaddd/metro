import dates from "@/testData/dates.json";

export default async function getAvailableDates() {
  const d: string[] = [];

  (dates ?? []).forEach((object) => {
    if (object["stop-and-search"].includes("metropolitan")) {
      d.push(object.date);
    }
  });
  console.log("getting dates for metro...", d);
}
