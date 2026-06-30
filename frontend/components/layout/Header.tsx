import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { useIncidentStore } from "@/store/incident-store";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const incidents = useIncidentStore((state) => state.incidents);

    const activeIncidents = useMemo(() => {
        return incidents.filter((i) => i.status !== "CLOSED");
    }, [incidents]);

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

                {/* SHADCN SHEET */}
                <Sheet open={open} onOpenChange={setOpen}>

                    <SheetTrigger>
                        <div className="relative cursor-pointer">
                            <Bell className="text-slate-300 w-6 h-6" />

                            {activeIncidents.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                                    {activeIncidents.length}
                                </span>
                            )}
                        </div>
                    </SheetTrigger>

                    <SheetContent
                        side="right"
                        className="w-96 bg-slate-900 text-white border-slate-800 p-3"
                    >
                        <SheetHeader>
                            <SheetTitle className="text-white">
                                Incident Notifications
                            </SheetTitle>
                        </SheetHeader>

                        <div className="mt-6 space-y-3 overflow-y-auto max-h-[90vh] pr-2 no-scrollbar">
                            {activeIncidents.length === 0 ? (
                                <p className="text-slate-400">
                                    No active incidents
                                </p>
                            ) : (
                                activeIncidents.map((incident) => (
                                    <div
                                        key={incident.incidentId}
                                        onClick={() => {
                                            setOpen(false);
                                            router.push(
                                                `/incidents/${incident.incidentId}`
                                            );
                                        }}
                                        className="cursor-pointer border border-slate-700 rounded-lg p-3 hover:bg-slate-800 transition"
                                    >
                                        <div className="flex justify-between">
                                            <p className="font-medium">
                                                {incident.title}
                                            </p>
                                            <span className="text-xs text-red-400">
                                                {incident.severity}
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-400 mt-1">
                                            {incident.status}
                                        </p>
                                    </div>
                                ))
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}