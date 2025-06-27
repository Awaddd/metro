"use client"

import * as React from "react"
import { Rocket, TrendingDown, TrendingUp } from "lucide-react"
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

    const { chartConfig, chartData, percentage } = useMemo(() => {
        if (!data?.statistics.genders || !data?.statistics.mostSearchedGenderValue) {
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

        const percentage = (data.statistics.mostSearchedGenderValue / data.statistics.totalSearches) * 100

        return {
            chartData,
            chartConfig,
            percentage
        }
    }, [data?.statistics])

    return (
        <Card className="relative flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Genders</CardTitle>
                <CardDescription>This chart shows the gender distribution for the Metropolitan Police Force</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig ?? {}}
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
                            outerRadius={90}
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
                <div className="absolute bottom-7 left-0 w-full flex flex-col items-center gap-2 text-sm">
                    {percentage && (
                        <div className="flex items-center gap-2 leading-none font-medium">
                            {data?.statistics.mostSearchedGender} makes up {percentage?.toFixed(0)}% of all searches
                            {percentage > 50 && (
                                <TrendingUp className="h-4 w-4" />
                            )}
                        </div>
                    )}
                    <div className="text-muted-foreground leading-none">
                        Showing genders for the data set
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
