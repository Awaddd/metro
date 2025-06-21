import { LucideHelpCircle, LucideIcon, LucideInfo } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"

type Props = {
    label: string
    value: string
    icon: LucideIcon
}

export default function ({ label, value, icon: Icon }: Props) {
    return (
        <Card className="w-full gap-0 py-6">
            <CardHeader className="">
                <div className="flex justify-between">
                    <div className="flex gap-4 items-center">
                        <div className="bg-muted p-2 w-fit rounded-lg">
                            <Icon className="stroke-foreground" size="16" />
                        </div>
                        <span className="text-lg font-medium">{label}</span>
                    </div>
                    <Button variant="invisible" size="icon">
                        <LucideInfo />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="">
                <h4 className="mt-3 text-3xl font-black">{value}</h4>
            </CardContent>
        </Card>
    )
}
