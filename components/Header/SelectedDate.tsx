"use client"

import { useCtx } from "@/state"
import { format, parse } from "date-fns"
import { useEffect, useRef } from "react"

type Props = {
    date?: string
}

const dateFormat = "MMM yyyy"

export default function ({ date }: Props) {
    const initialDate = useRef<string>(null)

    const updateDate = useCtx(state => state.updateDate)
    const selectedDate = useCtx(state => format(state.date, dateFormat))

    useEffect(() => {
        if (!date) {
            return
        }

        // create a date object from our year month string
        const parsed = parse(date, 'yyyy-MM', new Date())

        // update state
        updateDate(parsed)

        // format the date to use for comparing later
        initialDate.current = format(parsed, dateFormat)
    }, [])

    return (
        <div className="px-2">
            <span>Showing results for <span className="underline">{selectedDate}</span></span>

            {initialDate.current === selectedDate && (
                <span className="py-1 px-2.5 ml-3 bg-primary/20 text-primary rounded-lg text-sm font-black">Latest</span>
            )}
        </div>
    )
}
