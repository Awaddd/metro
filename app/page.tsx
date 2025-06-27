import GenderPieChart from "@/components/GenderPieChart";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import InfoCard from "@/components/InfoCard";
import PanelGrid from "@/components/PanelGrid";
import RadarChart from "@/components/RadarChart";
import { getQueryClient } from "./get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryKey } from "@/lib/get-query-key";
import getStopSearchData from "@/queries/get-stop-search-data";
import RadialChart from "@/components/RadialChart";

export default async function Home() {
    const queryClient = getQueryClient()

    await queryClient.prefetchQuery({
        queryKey: getQueryKey(),
        queryFn: () => getStopSearchData({})
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="min-h-full flex flex-grow flex-col gap-4 xl:grid xl:grid-rows-[max-content_1fr_max-content] items-start xl:gap-2.5 p-4">
                <section className="w-full grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    <PanelGrid />
                </section>

                <section className="w-full flex flex-col flex-grow gap-4">
                    <div className="flex flex-col xl:grid xl:grid-cols-[1fr_1fr_1fr] gap-4 w-full">
                        <HorizontalBarChart />
                        <RadialChart />
                        <GenderPieChart />
                    </div>
                </section>

                <section className="w-full flex flex-col xl:flex-row gap-4">
                    <InfoCard />
                </section>
            </div>
        </HydrationBoundary>
    );
}
