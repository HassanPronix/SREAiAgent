import { Bell } from "lucide-react";

export default function Header() {
    return (
        <header className="border-b border-slate-800 bg-slate-900 px-6 py-4">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Dashboard
                    </h2>

                    <p className="text-slate-400">
                        AI-powered incident management
                    </p>
                </div>

                <Bell className="text-slate-300" />
            </div>
        </header>
    );
}