import { BarChart3, LayoutDashboard, LucideIcon, Map, Moon, Table } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import Header from "./Header"
import Menu, { IconName, supportedIcons } from "./Menu"

export type ApplicationSidebar = {
    label: string
    items: {
        title: string
        icon: IconName
        url?: string
    }[]
}

const groups: ApplicationSidebar[] = [
    {
        label: "Application",
        items: [
            { title: "Overview", url: "/", icon: supportedIcons.LayoutDashboard.name as IconName },
            { title: "Trends", url: "#", icon: supportedIcons.BarChart3.name as IconName },
            { title: "Map", url: "#", icon: supportedIcons.Map.name as IconName },
            { title: "Table", url: "#", icon: supportedIcons.Table.name as IconName },
        ]
    },
    {
        label: "Settings",
        items: [
            { title: "Dark mode", icon: supportedIcons.Moon.name as IconName },
        ]
    }
]

export default function () {
    return (
        <Sidebar variant="inset">
            <Header />
            <SidebarContent>
                {groups.map((group, index) => (
                    <SidebarGroup key={index}>
                        <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                        <Menu group={group} />
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    )
}
