import { baseUrl } from "@/utils/constants";

export default async function (date?: string) {
  console.log(`getting data for date (${date ? date : "ALL"})`);
  const url = `${baseUrl}/api/stop-search-data?date=${date}`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
