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
            <div className="h-full flex flex-grow flex-col gap-4 items-start">
                <div className="flex flex-col h-full w-full gap-2.5 p-4">
                    <section className="w-full h-full flex flex-col flex-1 lg:grid lg:grid-cols-2 gap-2">
                        <PanelGrid />
                    </section>
                    <section className="w-full h-full flex flex-1">
                        <div className="h-full flex flex-col 2xl:grid 2xl:grid-cols-[10fr_7fr_7fr] gap-2 w-full">
                            <section>
                                <HorizontalBarChart />
                            </section>
                            <section className="h-full">
                                <RadialChart />
                            </section>
                            <section className="h-full">
                                <GenderPieChart />
                            </section>
                        </div>
                    </section>
                    <section className="w-full flex flex-shrink">
                        <InfoCard />
                    </section>
                </div>
            </div>
        </HydrationBoundary>
    );
}
