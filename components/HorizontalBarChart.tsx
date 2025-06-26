"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

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
import { capitaliseFirstLetter } from "@/lib/helpers"

export default function () {
    const { data } = useSearch()

    const { chartConfig, chartData } = useMemo(() => {
        if (!data?.statistics.objectsOfSearch) {
            return {}
        }

        const chartData: {
            object: string;
            value: number;
            fill?: string;
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
            })

            chartConfig[key.toLowerCase()] = {
                label: key,
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
                <CardTitle>Object of search</CardTitle>
                <CardDescription>This chart shows the object of search distribution for the Metropolitan Police Force</CardDescription>
            </CardHeader>
            <CardContent className="w-full h-full">
                <ChartContainer config={chartConfig ?? {}} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={chartData}
                            margin={{ left: 40, bottom: 80 }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="object"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                                tick={({ x, y, payload }) => {
                                    const text = capitaliseFirstLetter(payload.value)
                                    const truncated = text.split(" ")[0]

                                    return (
                                        <g transform={`translate(${x},${y})`}>
                                            <text
                                                transform="rotate(-55)"
                                                textAnchor="end"
                                                dominantBaseline="middle"
                                                className="font-black text-black text-lg"
                                                style={{
                                                    userSelect: "none",
                                                    fontWeight: 600,
                                                    fontSize: 14,
                                                    fill: "#333",
                                                    fontFamily: "'Inter', sans-serif",
                                                    letterSpacing: "0.03em",
                                                }}
                                            >
                                                <title>{text}</title>
                                                {truncated}
                                            </text>
                                        </g>

                                    )
                                }}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="value" fill="var(--color-chart-3)" radius={8} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
