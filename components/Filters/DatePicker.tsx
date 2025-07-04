"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { MonthPicker } from "../ui/monthpicker"
import { useCtx } from "@/state"
import { ReactNode } from "react"

type Props = {
    className?: ReactNode
}

export default function ({ className }: Props) {
    const { date, updateDate } = useCtx()

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant={"outline"} className={cn("w-[180px] justify-start text-left font-normal rounded-sm bg-background cursor-default hover:bg-muted/20", !date && "text-muted-foreground", className)}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "MMM yyyy") : <span>Pick a month</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <MonthPicker selectedMonth={date} onMonthSelect={updateDate} />
            </PopoverContent>
        </Popover>
    );
}
