"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

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

    const { chartConfig, chartData } = useMemo(() => {
        if (!data?.statistics.genders) {
            return {}
        }

        const chartData: {
            gender: string;
            value: number;
            fill: string;
        }[] = []

        const chartConfig: ChartConfig = {
            value: {
                label: "Value",
            }
        }

        let i = 0

        for (const [key, value] of Object.entries(data.statistics.genders)) {
            i++;

            chartData.push({
                gender: key.toLowerCase(),
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
    }, [data?.statistics.genders])

    if (!chartConfig || !chartData) {
        return null
    }

    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Genders</CardTitle>
                <CardDescription>This chart shows the gender distribution for the metropolitan police stop and search data</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="gender"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {data?.statistics.mostSearchedGenderValue}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground text-sm"
                                                >
                                                    {data?.statistics.mostSearchedGender}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    {/* todo: dont hard code this */}
                    {data?.statistics.mostSearchedGender} makes up 70% of the diagram <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing genders for the filtered data set
                </div>
            </CardFooter>
        </Card>
    )
}
