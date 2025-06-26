// todo: include other filters in query key to cache those results too
export function getQueryKey(date?: string) {
  const key = "stop-search-data";
  if (date) {
    return [key, date];
  }

  return [key];
}
