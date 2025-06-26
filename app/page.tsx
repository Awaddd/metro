import DonutChartWithText from "@/components/DonutChartWithText";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import InfoCard from "@/components/InfoCard";
import PanelGrid from "@/components/PanelGrid";
import RadarChart from "@/components/RadarChart";
import { getQueryClient } from "./get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryKey } from "@/lib/get-query-key";
import getStopSearchData from "@/queries/get-stop-search-data";

export default async function Home() {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: getQueryKey(),
        queryFn: () => getStopSearchData({})
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="min-h-full flex flex-grow flex-col items-start space-y-4 p-4">
                <section className="w-full grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    <PanelGrid />
                </section>

                <section className="w-full flex flex-col xl:flex-row gap-4">
                    <HorizontalBarChart />
                    <DonutChartWithText />
                    <RadarChart />
                </section>

                <section className="w-full flex flex-grow flex-col xl:flex-row gap-4">
                    <InfoCard />
                </section>
            </div>
        </HydrationBoundary>
    );
}
