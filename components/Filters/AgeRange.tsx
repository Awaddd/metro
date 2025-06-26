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
import { SelectSeparator } from "@radix-ui/react-select"
import { Button } from "../ui/button"
import { useState } from "react"
import ClearSelect from "../ClearSelect"

export default function () {
    const { ageRange, updateAgeRange } = useCtx()

    return (
        // if time allows fix controlled uncontrolled complaint
        <Select value={ageRange ?? ""} onValueChange={(value) => updateAgeRange(value as StopSearchData["ageRange"])}>
            <SelectTrigger className="w-[180px]">
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
