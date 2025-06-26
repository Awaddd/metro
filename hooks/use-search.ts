import { useCtx } from "@/state";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getQueryKey } from "@/lib/get-query-key";
import getStopSearchData from "@/queries/get-stop-search-data";
import { FilterParams } from "@/types/stats";
import { useMemo } from "react";

export function useSearch() {
  const { date, type, ageRange } = useCtx();

  const filters = useMemo(() => {
    const result: FilterParams = {};

    if (date) {
      result.month = date ? format(date, "yyyy-MM") : date;
    }

    if (ageRange) {
      result.ageRange = ageRange;
    }

    if (type) {
      result.type = type;
    }

    return result;
  }, [date, type, ageRange]);

  const queryResult = useQuery({
    queryKey: getQueryKey(filters),
    queryFn: () => getStopSearchData(filters),
  });

  return queryResult;
}
