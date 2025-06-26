import { FilterParams } from "@/types/stats";

export function getQueryKey(filters?: FilterParams) {
  const key = ["stop-search-data"];

  if (filters?.month) {
    key.push(`month=${filters.month}`);
  }

  if (filters?.ageRange) {
    key.push(`ageRange=${filters.ageRange}`);
  }

  if (filters?.type) {
    key.push(`type=${filters.type}`);
  }

  return key;
}
