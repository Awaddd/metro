"use client"

import { TrendingUp } from "lucide-react"
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { useSearch } from "@/hooks/use-search"
import { useMemo } from "react"

export const description = "A radial chart with text"

export default function () {

    const { data } = useSearch()

    const { chartConfig, chartData, percentage, mostSearchedObject } = useMemo(() => {
        if (!data?.statistics.mostSearchedObject || !data?.statistics.mostSearchedObjectValue || !data?.statistics.totalSearchedObjects) {
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

        const percentage = (data.statistics.mostSearchedObjectValue / data.statistics.totalSearchedObjects) * 100

        chartData.push({
            object: data.statistics.mostSearchedObject,
            value: percentage,
        })

        chartConfig[data.statistics.mostSearchedObject] = {
            label: data.statistics.mostSearchedObject,
            color: `var(--chart-2)`
        }

        return {
            chartData,
            chartConfig,
            percentage,
            mostSearchedObject: data.statistics.mostSearchedObject
        }
    }, [data?.statistics.genders])
    return (
        <Card className="flex flex-col w-full">
            <CardHeader className="items-center pb-0">
                <CardTitle>Most common searched object</CardTitle>
                <CardDescription>This chart shows the most common searched object for the Metropolitan Police Force</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig ?? {}}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={chartData}
                        startAngle={0}
                        endAngle={250}
                        innerRadius={80}
                        outerRadius={110}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey="value" background cornerRadius={10} fill="var(--chart-2)" />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                                                    className="fill-foreground text-4xl font-bold"
                                                >
                                                    {percentage && `${percentage?.toFixed()}%`}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 32}
                                                    className="fill-muted-foreground"
                                                >
                                                    {mostSearchedObject}
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    {percentage?.toFixed(0)}% of all searches were for {mostSearchedObject}
                </div>
                <div className="text-muted-foreground leading-none">
                    Showing most common object of search for the data set
                </div>
            </CardFooter>
        </Card>
    )
}
