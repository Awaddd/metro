"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import { useSearch } from "@/hooks/use-search"
import { Zap } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

export default function () {
    const isMobile = useIsMobile()

    const { data } = useSearch()
    const [fact, setFact] = useState<string>()

    useEffect(() => {
        if (!data?.statistics.objectsOfSearch || !data?.statistics.totalSearches) {
            setFact("No data available")
            return
        }

        const arr = Object.entries(data.statistics.objectsOfSearch)
        const randomIndex = Math.floor(Math.random() * arr.length)

        const [key, value] = arr[randomIndex]
        const percentage = (value / data.statistics.totalSearches) * 100

        const label = !key || key == "null" ? "other" : key

        setFact(`${percentage.toFixed(2)}% of all searches involve "${label}"`)
    }, [data?.statistics.objectsOfSearch, data?.statistics.totalSearches])

    return (
        <div className="w-full min-h-full pt-6 pb-4 px-6 bg-card border shadow-xs rounded-lg">
            <div className="flex items-center gap-4">
                <Zap size={isMobile ? 32 : 48} className="stroke-primary fill-yellow-300" />
                <h1 className="text-card-foreground text-3xl xl:text-4xl font-black">Did you know?</h1>
            </div>
            <div className="min-h-6 mt-4">
                <p className="text-card-foreground/80 text-lg lg:text-xl font-medium">{fact}</p>
            </div>
        </div>
    )
}
