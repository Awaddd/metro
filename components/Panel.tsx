import { LucideHelpCircle, LucideIcon, LucideInfo } from "lucide-react"
import { Button } from "./ui/button"

type Props = {
    label: string
    value: string
    icon: LucideIcon
}

export default function ({ label, value, icon: Icon }: Props) {
    return (
        <div className="w-full min-h-24 p-4 bg-muted text-foreground border rounded-lg">
            <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                    <div className="bg-primary/20 p-2 w-fit rounded-lg">
                        <Icon color="black" size="16" />
                    </div>
                    <span className="text-lg font-medium">{label}</span>
                </div>
                <div className="bg-muted p-2 w-fit rounded-lg">
                </div>
                <Button variant="invisible" size="icon">
                    <LucideInfo />
                </Button>
            </div>
            <h4 className="mt-4 text-3xl font-black">{value}</h4>
        </div>
    )
}
