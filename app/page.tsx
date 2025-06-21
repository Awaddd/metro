import { cn } from "@/lib/utils";
import { insetHeight } from "./layout";

export default function Home() {
    return (
        <section className={cn(insetHeight, "flex flex-grow flex-col space-y-8 justify-center items-center bg-blue-300")}>
            <h3 className="text-7xl font-black">Overview</h3>
        </section>
    );
}
