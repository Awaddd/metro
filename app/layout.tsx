import Header from "@/components/Layout/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";
import "./globals.css";

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
