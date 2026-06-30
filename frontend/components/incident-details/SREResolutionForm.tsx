"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import incidentService from "@/services/incident.service";

interface Props {
    incidentId: string;
}

/*
Payload to be sent
{
  resolvedBy: "John Doe",
  resolutionSummary: "...",
  actualRootCause: "...",
  actionsPerformed: ["Verified logs", "Restarted deployment"],
  commandsExecuted: ["kubectl get pods"],
  preventiveMeasures: "...",
  additionalNotes: "...",
  aiRecommendationUseful: "YES"
} 
  */

export default function SREResolutionForm({
    incidentId,
}: Props) {
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        resolvedBy: "",

        resolutionSummary: "",

        actualRootCause: "",

        actionsPerformed: "",

        commandsExecuted: "",

        preventiveMeasures: "",

        additionalNotes: "",

        aiRecommendationUseful: "PARTIAL",
    });

    const handleChange = (
        field: string,
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const payload = {
                resolvedBy: formData.resolvedBy,

                resolutionSummary: formData.resolutionSummary,

                actualRootCause: formData.actualRootCause,

                actionsPerformed: formData.actionsPerformed
                    .split("\n")
                    .filter(Boolean),

                commandsExecuted: formData.commandsExecuted
                    .split("\n")
                    .filter(Boolean),

                preventiveMeasures: formData.preventiveMeasures,

                additionalNotes: formData.additionalNotes,

                aiRecommendationUseful: formData.aiRecommendationUseful,
            };

            console.log("Incident:", incidentId);

            console.log(payload);

            /**
             * make an API call
             *
            */
            await incidentService.resolveIncident(incidentId, payload)
            
            setTimeout(() => {
                setLoading(false);

                alert("Incident resolved successfully");
            }, 1000);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    SRE Resolution Feedback
                </CardTitle>

                <CardDescription>
                    Capture remediation details to
                    improve future AI recommendations.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Resolved By
                    </label>

                    <Textarea
                        rows={1}
                        placeholder="John Doe"
                        value={formData.resolvedBy}
                        onChange={(e) =>
                            handleChange(
                                "resolvedBy",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Resolution Summary
                    </label>

                    <Textarea
                        placeholder="Describe how the incident was resolved"
                        value={
                            formData.resolutionSummary
                        }
                        onChange={(e) =>
                            handleChange(
                                "resolutionSummary",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Actual Root Cause
                    </label>

                    <Textarea
                        placeholder="What was the actual root cause?"
                        value={
                            formData.actualRootCause
                        }
                        onChange={(e) =>
                            handleChange(
                                "actualRootCause",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Actions Performed
                    </label>

                    <Textarea
                        placeholder={`Verified logs\nScaled deployment\nRestarted pods`}
                        value={
                            formData.actionsPerformed
                        }
                        onChange={(e) =>
                            handleChange(
                                "actionsPerformed",
                                e.target.value
                            )
                        }
                    />

                    <p className="mt-1 text-xs text-muted-foreground">
                        One action per line
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Commands Executed
                    </label>

                    <Textarea
                        placeholder={`kubectl get pods\nkubectl rollout restart deployment app`}
                        value={
                            formData.commandsExecuted
                        }
                        onChange={(e) =>
                            handleChange(
                                "commandsExecuted",
                                e.target.value
                            )
                        }
                    />

                    <p className="mt-1 text-xs text-muted-foreground">
                        One command per line
                    </p>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Preventive Measures
                    </label>

                    <Textarea
                        placeholder="How can this incident be prevented in future?"
                        value={
                            formData.preventiveMeasures
                        }
                        onChange={(e) =>
                            handleChange(
                                "preventiveMeasures",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Additional Notes
                    </label>

                    <Textarea
                        placeholder="Any additional observations"
                        value={
                            formData.additionalNotes
                        }
                        onChange={(e) =>
                            handleChange(
                                "additionalNotes",
                                e.target.value
                            )
                        }
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Was AI Recommendation Useful?
                    </label>

                    <Select
                        defaultValue="PARTIAL"
                        onValueChange={(value) => handleChange("aiRecommendationUseful", value ?? "PARTIAL")}                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="YES">
                                Yes
                            </SelectItem>

                            <SelectItem value="PARTIAL">
                                Partially
                            </SelectItem>

                            <SelectItem value="NO">
                                No
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={loading}
                >
                    {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}

                    {loading
                        ? "Resolving Incident..."
                        : "Resolve & Close Incident"}
                </Button>
            </CardContent>
        </Card>
    );
}