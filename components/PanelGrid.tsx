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

    const { data } = useQuery({
        queryKey: getQueryKey(date),
        queryFn: () => getStopSearchData(date)
    })

    return (
        <>
            <Panel label="Total Searches" value={data?.stats?.overview.totalSearches ?? 0} icon={LucideSearch} />
            <Panel label="Avg per Day" value={data?.stats?.overview.averagePerDay ?? 0} icon={LucideActivity} />
            <Panel label="Arrest Rate (%)" value="12.4%" icon={LucidePercentCircle} />
            <Panel label="Most Searched Age Group" value="18-24" icon={LucideUsers} />
        </>
    )
}