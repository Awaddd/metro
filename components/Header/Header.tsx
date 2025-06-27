import DatePicker from "@/components/Filters/DatePicker";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import SelectedDate from "./SelectedDate";
import getAvailableDates from "@/queries/get-available-dates";
import { getQueryClient } from "@/app/get-query-client";
import AgeRange from "../Filters/AgeRange";
import Type from "../Filters/Type";

export default async function () {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({
        queryKey: ["available-dates"],
        queryFn: getAvailableDates
    })

    return (
        <SidebarInset>
            <header className="flex flex-col lg:flex-row lg:h-[70px] shrink-0 lg:items-end lg:justify-between gap-4 pt-6 pb-0.5 bg-sidebar">
                <div className="flex flex-col items-center justify-center lg:justify-start w-full lg:flex-row px-4 lg:py-0 text-center gap-2 lg:gap-2">
                    <div className="flex items-center justify-center lg:justify-start lg:flex-row px-4 lg:px-0 lg:py-0 text-center gap-2">
                        <SidebarTrigger className="-ml-1 cursor-pointer" />
                        <Separator
                            orientation="vertical"
                            className="data-[orientation=vertical]:h-4 bg-gray-900/50"
                        />
                        <h2 className="px-2">Overview</h2>
                    </div>
                    <SelectedDate className="flex lg:hidden xl:flex xl:flex-row items-center xl:justify-start text-center gap-2" />
                </div>
                <div className="lg:pr-8 flex flex-col md:flex-row px-4 items-center justify-center gap-2">
                    <DatePicker className="w-full md:max-w-[180px]" />
                    <AgeRange className="w-full md:max-w-[180px] bg-background cursor-default hover:bg-muted/20" />
                    <Type className="w-full md:max-w-[180px] bg-background cursor-default hover:bg-muted/20" />
                </div>
            </header>
        </SidebarInset>
    )
}