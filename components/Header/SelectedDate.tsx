"use client"

import { useCtx } from "@/state"
import { format, parse } from "date-fns"
import { useEffect, useRef } from "react"
import { Separator } from "../ui/separator"

type Props = {
    date?: string
}

const dateFormat = "MMM yyyy"

export default function ({ date }: Props) {
    const initialDate = useRef<string>(null)

    const selectedDate = useCtx(state => state.date ? format(state.date, dateFormat) : state.date)

    useEffect(() => {
        if (!date) {
            return
        }

        // create a date object from our year month string
        const parsed = parse(date, 'yyyy-MM', new Date())

        // format the date to use for comparing later
        initialDate.current = format(parsed, dateFormat)
    }, [])

    if (!selectedDate) {
        return null
    }

    return (
        <>
            <Separator
                orientation="vertical"
                className="data-[orientation=vertical]:h-4 bg-gray-900/50"
            />
            <div className="px-2">
                <span>Showing results for <span className="underline">{selectedDate}</span></span>

                {initialDate.current === selectedDate && (
                    <span className="py-1 px-2.5 ml-3 bg-primary/20 text-primary rounded-lg text-sm font-black">Latest</span>
                )}
            </div>
        </>
    )
}
