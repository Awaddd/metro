"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with lines only"

const chartData = [
    { month: "Under 10", value: 186 },
    { month: "February", value: 185 },
    { month: "March", value: 207 },
    { month: "April", value: 173 },
    { month: "May", value: 160 },
    { month: "Over 30", value: 174 },
]

const chartConfig = {
    value: {
        label: "Value",
        color: "var(--chart-1)",
    }
} satisfies ChartConfig

export default function () {
    return (
        <Card className="w-full">
            <CardHeader className="items-center pb-4">
                <CardTitle>Radar Chart - Lines Only</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px] w-full"
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid radialLines={false} />
                        <Radar
                            dataKey="value"
                            fill="var(--color-value)"
                            fillOpacity={0}
                            stroke="var(--color-value)"
                            strokeWidth={2}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground flex items-center gap-2 leading-none">
                    January - June 2024
                </div>
            </CardFooter>
        </Card>
    )
}
