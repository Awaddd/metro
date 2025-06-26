"use client"

import { useCtx } from "@/state"
import { ALLOWED_AGE_RANGES, StopSearchData } from "@/types/stop-search"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function () {
    const { ageRange, updateAgeRange } = useCtx()

    return (
        <Select value={ageRange ?? undefined} onValueChange={(value) => updateAgeRange(value as StopSearchData["ageRange"])}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select an age range" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Age ranges</SelectLabel>
                    {ALLOWED_AGE_RANGES.map(range => {
                        if (!range) return null

                        return (
                            <SelectItem value={range}>{range}</SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
