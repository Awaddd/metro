"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
import { useSearch } from "@/hooks/use-search"
import { useMemo } from "react"

export default function () {
    const { data } = useSearch()

    console.log("objects", data?.statistics.objectsOfSearch)

    const { chartConfig, chartData } = useMemo(() => {
        if (!data?.statistics.objectsOfSearch) {
            return {}
        }

        const chartData: {
            object: string;
            value: number;
            fill: string;
        }[] = []

        const chartConfig: ChartConfig = {
            value: {
                label: "Value",
            }
        }

        let i = 0

        for (const [key, value] of Object.entries(data.statistics.objectsOfSearch)) {
            i++;

            chartData.push({
                object: key.toLowerCase(),
                value: value,
                fill: `var(--color-${key.toLowerCase()})`
            })

            chartConfig[key.toLowerCase()] = {
                label: key,
                color: `var(--chart-${i})`
            }
        }

        return {
            chartData,
            chartConfig
        }
    }, [data?.statistics.objectsOfSearch])

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Bar Chart - Horizontal</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig ?? {}}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout="vertical"
                        margin={{
                            left: -20,
                        }}
                    >
                        <XAxis type="number" dataKey="value" hide />
                        <YAxis
                            dataKey="object"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="value" fill="var(--color-value)" radius={5} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Trending up by 5.2% this object <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing total visitors for the last 6 objects
                </div>
            </CardFooter>
        </Card>
    )
}
