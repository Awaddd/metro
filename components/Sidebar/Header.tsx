import {
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { Fingerprint } from "lucide-react"

export default function () {
    return (
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <div className="flex gap-2 items-center px-2 mt-2">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-10 items-center justify-center rounded-lg">
                            <Fingerprint className="size-6" />
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-black">Metro</span>
                            <span className="text-xs">Stop & Search Data</span>
                        </div>
                    </div>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}