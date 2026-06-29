"use client";

import Sidebar from "./Sidebar";
import Header from "./Header";
import { FloatingChatButton } from "../ai-chat/FloatingChatButton";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background flex">
            <Sidebar />

            <div className="w-full">
                <Header />

                <main className="p-6">
                    {children}
                </main>
            </div>

            <FloatingChatButton />
        </div>
    );
}