import { SelectSeparator } from "@radix-ui/react-select"
import { Button } from "./ui/button"

type Props<T> = {
    value: T
    updateValue: (value: null) => void
}

export default function <T>({ value, updateValue }: Props<T>) {
    if (!value) {
        return null
    }

    return (
        <SelectSeparator className="mt-0.5">
            <Button
                className="w-full px-2"
                variant="outline"
                size="sm"
                onClick={(e) => {
                    e.stopPropagation()
                    updateValue(null)
                }}
            >
                Clear
            </Button>
        </SelectSeparator>
    )
}
