import Card from "@/components/Card";
import DonutChartWithText from "@/components/DonutChartWithText";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import Panel from "@/components/Panel";
import RadarChart from "@/components/RadarChart";
import { LucideActivity, LucideCalendarCheck, LucidePercentCircle, LucideScanSearch, LucideSearch } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-full flex flex-grow flex-col items-start space-y-4 p-4">
            <section className="w-full flex flex-col sm:flex-row gap-4">
                <Panel label="Total Searches" value="128,732" icon={LucideSearch} />
                <Panel label="This Month" value="4,932" icon={LucideCalendarCheck} />
                <Panel label="Arrest Rate (%)" value="12.4%" icon={LucidePercentCircle} />
                <Panel label="Avg per Day" value="159" icon={LucideActivity} />
            </section>

            <section className="w-full flex flex-col xl:flex-row gap-4">
                <HorizontalBarChart />
                <DonutChartWithText />
                <RadarChart />
            </section>

            <section className="w-full flex flex-col xl:flex-row gap-4">
                <Card />
                <Card />
            </section>
        </div>
    );
}
