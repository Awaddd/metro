"use client"

import { useSearch } from "@/hooks/use-search";
import { LucideActivity, LucidePercentCircle, LucideSearch, LucideUsers } from "lucide-react";
import Panel from "./Panel";

export default function () {
    const { data } = useSearch()

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