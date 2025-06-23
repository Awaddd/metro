import getAvailableDates from "./available-dates";

export default async function getStopSearchData(dateString: string) {
  let date;

  if (dateString) {
    date = new Date(dateString);
  }

  const availableDates = await getAvailableDates();
  batch(availableDates, 10);
}

function fetchData(date: string) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("fetched", date);
      resolve();
    }, 1000);
  });
}

async function batch(dates: string[], size: number) {
  console.log("batching array in chunks of", size);
  for (let i = 0; i < dates.length; i += size) {
    console.log("executing batch ", i);
    const chunk = dates.slice(i, i + size);
    const promises = chunk.map((date) => fetchData(date));
    await Promise.all(promises);
  }
}
