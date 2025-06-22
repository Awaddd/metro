import type { Metadata } from "next";
import "./globals.css";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/Sidebar/Sidebar";

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
            <body className="antialiased bg-background text-foreground overflow-hidden">
                <SidebarProvider>
                    <Sidebar />
                    <div className="w-full">
                        <Header />
                        <div className="h-[calc(100vh-70px)] p-2">
                            <main className="h-full rounded-xl bg-background border overflow-auto">{children}</main>
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
            <header className="flex h-[70px] shrink-0 items-end justify-between gap-2 pb-0.5 bg-sidebar">
                <div className="flex items-center gap-2 px-4">
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
                        <span>Showing results for <span className="underline">Aug 2024</span></span>
                        <span className="py-1 px-2.5 ml-3 bg-primary/20 text-primary rounded-lg text-sm font-black">Latest</span>
                    </div>
                </div>
                <div className="pr-8">
                    {/* month picker will go here */}
                </div>
            </header>
        </SidebarInset>
    )
}