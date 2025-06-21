import { BarChart3, Fingerprint, LayoutDashboard, LucideIcon, Map, Moon, Settings, Table } from "lucide-react"

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
import { Button } from "./ui/button"

type ApplicationSidebar = {
    label: string
    items: {
        title: string
        icon: LucideIcon
        url?: string
    }[]
}

const groups: ApplicationSidebar[] = [
    {
        label: "Application",
        items: [{
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
    },
    {
        label: "Settings",
        items: [
            {
                title: "Dark mode",
                icon: Moon,
            },
        ]
    }
]

export default function () {
    return (
        <Sidebar variant="sidebar">
            <Header />
            <SidebarContent>
                {groups.map((group, index) => (
                    <SidebarGroup key={index}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map((item, itemIndex) => (
                                <SidebarMenuItem key={itemIndex}>
                                    <SidebarMenuButton asChild>
                                        {item?.url ? (
                                            <a href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </a>
                                        ) : (
                                            <button className="cursor-pointer">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </button>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
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