"use client"

import { LucideActivity, LucidePercentCircle, LucideSearch, LucideUsers } from "lucide-react";
import Panel from "./Panel";
import { useCtx } from "@/state";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getQueryKey } from "@/lib/get-query-key";
import getStopSearchData from "@/queries/get-stop-search-data";

export default function () {
    const date = useCtx(state => state.date ? format(state.date, 'yyyy-MM') : state.date)

    // todo: pass in other filters
    const { data } = useQuery({
        queryKey: getQueryKey(date),
        queryFn: () => getStopSearchData(date)
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