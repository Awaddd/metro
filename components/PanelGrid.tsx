"use client"

import { LucideActivity, LucidePercentCircle, LucideSearch, LucideUsers } from "lucide-react";
import Panel from "./Panel";
import { useCtx } from "@/state";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getQueryKey } from "@/lib/get-query-key";
import getStopSearchData from "@/queries/get-stop-search-data";
import { FilterParams } from "@/types/stats";
import { useMemo } from "react";

export default function () {
    const { date, type, ageRange } = useCtx()

    const filters = useMemo(() => {
        const result: FilterParams = {}

        if (date) {
            result.month = date ? format(date, 'yyyy-MM') : date
        }

        if (ageRange) {
            result.ageRange = ageRange
        }

        if (type) {
            result.type = type
        }

        return result
    }, [date, type, ageRange])

    const { data } = useQuery({
        queryKey: getQueryKey(filters),
        queryFn: () => getStopSearchData(filters)
    })

    console.log("data", data)

    return (
        <>
            <Panel label="Total Searches" value={data?.statistics.totalSearches ?? 0} icon={LucideSearch} />
            <Panel label="Avg per Day" value={data?.statistics.averagePerDay ?? 0} icon={LucideActivity} />
            <Panel label="Arrest Rate (%)" value={`${data?.statistics.arrestRate ?? 0}%`} icon={LucidePercentCircle} />
            <Panel label="Most Searched Age Group" value={data?.statistics.mostSearchedAgeGroup ?? "N/A"} icon={LucideUsers} />
        </>
    )
}