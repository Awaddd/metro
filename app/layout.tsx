import type { Metadata } from "next";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/Sidebar"
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Metro | Stop & Search Policy Data",
    description: "This application features up to date on police stop and search policies",
};

const headerHeight = "80px"
export const insetHeight = `h-[calc(100vh-${headerHeight})]`

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
                    <main className="w-full h-full">
                        <Header />
                        {children}
                    </main>
                </SidebarProvider>
            </body>
        </html>
    );
}

function Header() {
    return (
        <SidebarInset>
            <header className={`flex h-[${headerHeight}] shrink-0 items-center gap-2`}>
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
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