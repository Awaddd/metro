import type { Metadata } from "next";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar"
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Metro | Stop & Search Policy Data",
    description: "This application features up to date on police stop and search policies",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased bg-background text-foreground">
                <SidebarProvider>
                    <AppSidebar />
                    <div className="w-full">
                        <Header />
                        <div className="h-[calc(100vh-70px)] p-2">
                            <main className="h-full rounded-xl bg-background border">{children}</main>

                        </div>
                    </div>
                </SidebarProvider>
            </body>
        </html>
    );
}

function Header() {
    return (
        <SidebarInset>
            <header className={`flex h-[70px] shrink-0 items-end gap-2 bg-sidebar`}>
                <div className="flex items-center gap-2 px-4 pb-0.5">
                    <SidebarTrigger className="-ml-1 cursor-pointer" />
                    <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                    />
                    <h2>Overview</h2>
                </div>
            </header>
        </SidebarInset>
    )
}