
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import Header from "./Header"
import Menu, { IconName } from "./Menu"

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
            { title: "Overview", url: "/", icon: "LayoutDashboard" },
            { title: "Trends", url: "#", icon: "BarChart3" },
            { title: "Map", url: "#", icon: "Map" },
            { title: "Table", url: "#", icon: "Table" },
        ]
    },
    {
        label: "Settings",
        items: [
            { title: "Dark mode", icon: "Moon" },
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
