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
import ClearSelect from "../ClearSelect"
import { ReactNode, useMemo } from "react"
import { cn } from "@/lib/utils"

type Props = {
    className?: ReactNode
}

export default function ({ className }: Props) {
    const state = useCtx()

    const { type, updateType } = useMemo(() => ({
        type: state.type as StopSearchData["type"] | null,
        updateType: state.updateType as (type: StopSearchData["type"] | null) => void
    }), [state.type, state.updateType])

    return (
        // if time allows fix controlled uncontrolled complaint
        <Select value={type ?? ""} onValueChange={(value) => updateType(value as StopSearchData["type"])}>
            <SelectTrigger className={cn(className)}>
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
                <ClearSelect value={type} updateValue={updateType} />
            </SelectContent>
        </Select>
    );
}
