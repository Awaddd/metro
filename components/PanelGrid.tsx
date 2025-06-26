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
import { useSearch } from "@/hooks/use-search";

export default function () {
    const { data } = useSearch()

    console.log("data", data)

    const averagePerDay = Math.round((data?.statistics?.averagePerDay ?? 0) * 10) / 10
    const arrestRate = Math.round((data?.statistics?.arrestRate ?? 0) * 10) / 10

    return (
        <>
            <Panel label="Total Searches" value={data?.statistics?.totalSearches ?? 0} icon={LucideSearch} />
            <Panel label="Avg per Day" value={averagePerDay} icon={LucideActivity} />
            <Panel label="Arrest Rate (%)" value={`${arrestRate}%`} icon={LucidePercentCircle} />
            <Panel label="Most Searched Gender" value={data?.statistics?.mostSearchedGender ?? "N/A"} icon={LucideUsers} />
        </>
    )
}