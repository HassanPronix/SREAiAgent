"use client";

import Link from "next/link";
import {
    LayoutDashboard,
    AlertTriangle,
    Bot,
    Lightbulb,
    Server,
    Settings,
} from "lucide-react";

const links = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Incidents",
        href: "/incidents",
        icon: AlertTriangle,
    },
    {
        name: "AI Chat",
        href: "/chats",
        icon: Bot,
    },
    // {
    //     name: "Recommendations",
    //     href: "/recommendations",
    //     icon: Lightbulb,
    // },
    {
        name: "Clusters",
        href: "/clusters",
        icon: Server,
    },
    {
        name: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export default function Sidebar() {
    return (
        <aside className="w-64 border-r border-slate-800 bg-slate-900 p-4">
            <h1 className="text-xl font-bold text-white mb-8">
                DevOps AI Agent
            </h1>

            <nav className="space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="flex items-center gap-3 rounded-lg p-3 text-slate-300 hover:bg-slate-800"
                    >
                        <link.icon size={18} />
                        {link.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
}