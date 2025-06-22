import DonutChartWithText from "@/components/DonutChartWithText";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import InfoCard from "@/components/InfoCard";
import Panel from "@/components/Panel";
import RadarChart from "@/components/RadarChart";
import { LucideActivity, LucideCalendarCheck, LucidePercentCircle, LucideSearch, LucideUsers } from "lucide-react";
import getAvailableDates from "./actions/available-dates";

export default async function Home() {
    await getAvailableDates()

    return (
        <div className="min-h-full flex flex-grow flex-col items-start space-y-4 p-4">
            <section className="w-full grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
                <Panel label="Total Searches" value="128,732" icon={LucideSearch} />
                <Panel label="Avg per Day" value="159" icon={LucideActivity} />
                <Panel label="Arrest Rate (%)" value="12.4%" icon={LucidePercentCircle} />
                <Panel label="Most Searched Age Group" value="18-24" icon={LucideUsers} />
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
    );
}
