import DonutChartWithText from "@/components/DonutChartWithText";
import HorizontalBarChart from "@/components/HorizontalBarChart";
import InfoCard from "@/components/InfoCard";
import Panel from "@/components/Panel";
import PanelGrid from "@/components/PanelGrid";
import RadarChart from "@/components/RadarChart";
import { LucideActivity, LucidePercentCircle, LucideSearch, LucideUsers } from "lucide-react";

export default function Home() {
    return (
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
    );
}
