import Card from "@/components/Card";
import Panel from "@/components/Panel";
import { LucideCalendarCheck, LucidePercentCircle, LucideSearch } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-full flex flex-grow flex-col items-start space-y-4 p-4">
            <section className="w-full flex flex-col sm:flex-row gap-4">
                <Panel label="Total Searches" value="128,732" icon={LucideSearch} />
                <Panel label="This Month" value="4,932" icon={LucideCalendarCheck} />
                <Panel label="Arrest Rate (%)" value="12.4%" icon={LucidePercentCircle} />
            </section>

            <section className="w-full flex flex-col xl:flex-row gap-4">
                <Card />
                <Card />
            </section>

            <section className="w-full flex flex-col xl:flex-row gap-4">
                <Card />
                <Card />
            </section>
        </div>
    );
}
