"use client"

import { LucideActivity, LucidePercentCircle, LucideSearch, LucideUsers } from "lucide-react";
import Panel from "./Panel";
import { useEffect } from "react";
import { useCtx } from "@/state";
import { format } from "date-fns";

export default function () {
    const date = useCtx(state => state.date)

    // avoid calling when this is changed initially to the last date with data
    useEffect(() => {
        console.log("date has changed...")
        getData(date)
    }, [date])

    // placeholder
    function getData(date: Date) {
        console.log("fetching data for date", format(date, "MMM yyyy"))
    }

    return (
        <>
            <Panel label="Total Searches" value="128,732" icon={LucideSearch} />
            <Panel label="Avg per Day" value="159" icon={LucideActivity} />
            <Panel label="Arrest Rate (%)" value="12.4%" icon={LucidePercentCircle} />
            <Panel label="Most Searched Age Group" value="18-24" icon={LucideUsers} />
        </>
    )
}