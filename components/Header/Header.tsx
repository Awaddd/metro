import DatePicker from "@/components/DatePicker/DatePicker";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import SelectedDate from "./SelectedDate";
import getAvailableDates from "@/app/actions/available-dates";

export default async function () {
    const date = (await getAvailableDates())[0]

    return (
        <SidebarInset>
            <header className="flex flex-col lg:flex-row lg:h-[70px] shrink-0 lg:items-end lg:justify-between gap-2 pb-0.5 bg-sidebar">
                <div className="flex flex-col w-full lg:flex-row p-4 lg:py-0 items-center lg:justify-start text-center gap-2">
                    <SidebarTrigger className="-ml-1 cursor-pointer" />
                    <Separator
                        orientation="vertical"
                        className="data-[orientation=vertical]:h-4 bg-gray-900/50"
                    />
                    <h2 className="px-2">Overview</h2>
                    <Separator
                        orientation="vertical"
                        className="data-[orientation=vertical]:h-4 bg-gray-900/50"
                    />
                    <SelectedDate date={date} />
                </div>
                <div className="lg:pr-2 xl:pr-8 flex justify-center">
                    <DatePicker />
                </div>
            </header>
        </SidebarInset>
    )
}