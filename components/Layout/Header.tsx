"use client"

import DatePicker from "@/components/DatePicker/DatePicker";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { useCtx } from "@/state";
import { format } from 'date-fns';

export default function () {
    const date = useCtx(state => format(state.date, 'MMM yyyy'))

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
                    <div className="px-2">
                        <span>Showing results for <span className="underline">{date}</span></span>
                        <span className="py-1 px-2.5 ml-3 bg-primary/20 text-primary rounded-lg text-sm font-black">Latest</span>
                    </div>
                </div>
                <div className="lg:pr-2 xl:pr-8 flex justify-center">
                    <DatePicker />
                </div>
            </header>
        </SidebarInset>
    )
}