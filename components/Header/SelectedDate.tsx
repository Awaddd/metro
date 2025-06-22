"use client"

import { useCtx } from "@/state"
import { format, parse } from "date-fns"
import { useEffect } from "react"

type Props = {
    date?: string
}

export default function ({ date: initialDate }: Props) {
    const updateDate = useCtx(state => state.updateDate)
    const date = useCtx(state => format(state.date, 'MMM yyyy'))

    useEffect(() => {
        if (!initialDate) {
            return
        }

        const date = parse('2024-08', 'yyyy-MM', new Date());
        updateDate(date)
    }, [])

    return (
        <span>Showing results for <span className="underline">{date}</span></span>
    )
}
