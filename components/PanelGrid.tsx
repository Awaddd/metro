"use client"

import { LucideActivity, LucidePercentCircle, LucideSearch, LucideUsers } from "lucide-react";
import Panel from "./Panel";
import { useCtx } from "@/state";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import getStopSearchData from "@/functions/get-stop-and-search-data";

export default function () {
    const date = useCtx(state => format(state.date, 'yyyy-MM'))

    const { data } = useQuery({
        queryKey: ["stop-search-data", date],
        queryFn: () => getStopSearchData(date)
    })

    return (
        <>
            <Panel label="Total Searches" value="128,732" icon={LucideSearch} />
            <Panel label="Avg per Day" value="159" icon={LucideActivity} />
            <Panel label="Arrest Rate (%)" value="12.4%" icon={LucidePercentCircle} />
            <Panel label="Most Searched Age Group" value="18-24" icon={LucideUsers} />
        </>
    )
}