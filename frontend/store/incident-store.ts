import { create } from "zustand";
import { Incident } from "@/types/incident";

interface IncidentStore {
    incidents: Incident[];

    setIncidents: (incidents: Incident[]) => void;

    addIncident: (incident: Incident) => void;

    updateIncident: (incident: Incident) => void;

    getIncident: (id: string) => Incident | undefined;

    updateIncidentStatus: (incidentId: string, status: Incident["status"]) => void;
}

export const useIncidentStore =
    create<IncidentStore>((set, get) => ({
        incidents: [],

        setIncidents: (incidents) =>
            set({
                incidents: [...incidents].sort(
                    (a, b) =>
                        new Date(b.occurredAt).getTime() -
                        new Date(a.occurredAt).getTime()
                ),
            }),

        addIncident: (incident) =>
            set((state) => ({
                incidents: [incident, ...state.incidents],
            })),

        updateIncident: (incident) =>
            set((state) => ({
                incidents: state.incidents.map((i) =>
                    i.incidentId === incident.incidentId
                        ? incident
                        : i
                ),
            })),

        getIncident: (id) =>
            get().incidents.find(
                (i) => i.incidentId === id
            ),

        updateIncidentStatus: (incidentId, status) =>
            set((state) => ({
                incidents: state.incidents.map((i) =>
                    i.incidentId === incidentId
                        ? { ...i, status }
                        : i
                ),
            })),
    }));