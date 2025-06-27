"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useCtx } from "@/state"
import { ALLOWED_AGE_RANGES, StopSearchData } from "@/types/stop-search"
import { ReactNode } from "react"
import ClearSelect from "../ClearSelect"
import { cn } from "@/lib/utils"

type Props = {
    className?: ReactNode
}

export default function ({ className }: Props) {
    const { ageRange, updateAgeRange } = useCtx()

    return (
        // if time allows fix controlled uncontrolled complaint
        <Select value={ageRange ?? ""} onValueChange={(value) => updateAgeRange(value as StopSearchData["ageRange"])}>
            <SelectTrigger className={cn(className)}>
                <SelectValue placeholder="Select an age range" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Age ranges</SelectLabel>
                    {ALLOWED_AGE_RANGES.map(range => {
                        if (!range) return null

                        return (
                            <SelectItem key={range} value={range}>{range}</SelectItem>
                        )
                    })}
                </SelectGroup>
                <ClearSelect value={ageRange} updateValue={updateAgeRange} />
            </SelectContent>
        </Select>
    );
}
