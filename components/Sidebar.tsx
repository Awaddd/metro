import { BarChart3, Fingerprint, LayoutDashboard, Map, Settings, Table } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"

const generalItems = [
    {
        title: "Overview",
        url: "#",
        icon: LayoutDashboard,
    },
    {
        title: "Trends",
        url: "#",
        icon: BarChart3,
    },
    {
        title: "Map",
        url: "#",
        icon: Map,
    },
    {
        title: "Table",
        url: "#",
        icon: Table,
    },
]

const supportItems = [
    {
        title: "Settings",
        url: "#",
        icon: Settings,
    },
]

export default function () {
    return (
        <Sidebar variant="sidebar">
            <Header />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {generalItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Support</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {supportItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

function Header() {
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