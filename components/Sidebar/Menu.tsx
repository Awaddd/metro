"use client"

import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar"
import { ApplicationSidebar } from "./Sidebar"
import { BarChart3, LayoutDashboard, Map, Moon, Table } from "lucide-react"
import { usePathname } from 'next/navigation'

export const supportedIcons = {
    "LayoutDashboard": LayoutDashboard,
    "BarChart3": BarChart3,
    "Map": Map,
    "Table": Table,
    "Moon": Moon
}

export type IconName = keyof typeof supportedIcons

type Props = {
    group: ApplicationSidebar
}

export default function ({ group }: Props) {
    const pathname = usePathname()

    return (
        <SidebarMenu>
            {group.items.map((item, itemIndex) => {
                const Icon = supportedIcons[item.icon]

                return (
                    <SidebarMenuItem key={itemIndex}>
                        <SidebarMenuButton asChild isActive={pathname === item.url}>
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
