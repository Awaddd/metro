"use client"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { ApplicationSidebar } from "./Sidebar"
import { BarChart3, LayoutDashboard, Map, Moon, Table } from "lucide-react"

export const supportedIcons = {
    LayoutDashboard,
    BarChart3,
    Map,
    Table,
    Moon
}

export type IconName = keyof typeof supportedIcons

type Props = {
    group: ApplicationSidebar
}

export default function ({ group }: Props) {
    return (
        <SidebarMenu>
            {group.items.map((item, itemIndex) => {
                const Icon = supportedIcons[item.icon]

                return (
                    <SidebarMenuItem key={itemIndex}>
                        <SidebarMenuButton asChild>
                            {item?.url ? (
                                <a href={item.url}>
                                    <Icon />
                                    <span>{item.title}</span>
                                </a>
                            ) : (
                                <button className="cursor-pointer">
                                    <Icon />
                                    <span>{item.title}</span>
                                </button>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
            })}
        </SidebarMenu>
    )
}
