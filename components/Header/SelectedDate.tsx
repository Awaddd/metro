"use client"

import getAvailableDates from "@/queries/get-available-dates"
import { useCtx } from "@/state"
import { useQuery } from "@tanstack/react-query"
import { format, parse } from "date-fns"
import { Separator } from "../ui/separator"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

const dateFormat = "MMM yyyy"

export default function ({ className }: { className?: ReactNode }) {
    const { data } = useQuery({
        queryKey: ["available-dates"],
        queryFn: getAvailableDates
    })

    const date = (data ?? [])[0]
    const lastDateWithData = (() => {
        if (!date) {
            return
        }

        const parsed = parse(date, 'yyyy-MM', new Date())
        return format(parsed, dateFormat)
    })()

    const selectedDate = useCtx(state => state.date ? format(state.date, dateFormat) : state.date)

    if (!selectedDate) {
        return null
    }

    return (
        <div className={cn(className)}>
            <Separator
                orientation="vertical"
                className="hidden xl:inline-block data-[orientation=vertical]:h-4 bg-gray-900/50"
            />
            <div className="px-2">
                <span>Showing results for <span className="underline">{selectedDate}</span></span>

                {lastDateWithData === selectedDate && (
                    <span className="py-1 px-2.5 ml-3 bg-primary/20 text-primary rounded-lg text-sm font-black">Latest</span>
                )}
            </div>
        </div>
    )
}
