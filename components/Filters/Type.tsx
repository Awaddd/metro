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
import { ALLOWED_TYPES, StopSearchData } from "@/types/stop-search"

export default function () {
    const { type, updateType } = useCtx()

    return (
        // if time allows fix controlled uncontrolled complaint
        <Select value={type ?? undefined} onValueChange={(value) => updateType(value as StopSearchData["type"])}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Age ranges</SelectLabel>
                    {ALLOWED_TYPES.map(type => {
                        if (!type) return null

                        return (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        )
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
