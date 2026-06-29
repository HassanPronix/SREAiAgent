"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function SREResolutionForm() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        // API call later

        setTimeout(() => {
            setLoading(false);
            alert("Incident resolved successfully");
        }, 1000);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>SRE Resolution Feedback</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Resolution Summary
                    </label>

                    <Textarea
                        placeholder="Describe how the incident was resolved"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Actual Root Cause
                    </label>

                    <Textarea
                        placeholder="What was the actual root cause?"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Actions Performed
                    </label>

                    <Textarea
                        placeholder={`1. Scaled replicas\n2. Restarted pods\n3. Rolled back deployment`}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Commands Executed
                    </label>

                    <Textarea
                        placeholder={`kubectl rollout undo deployment checkout-service`}
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Preventive Measures
                    </label>

                    <Textarea
                        placeholder="How can this incident be prevented?"
                    />
                </div>

                <div className="r">
                    <label className="mb-2 block text-sm font-medium">
                        Was AI Recommendation Useful?
                    </label>

                    <Select>
                        <SelectTrigger>
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="YES">Yes</SelectItem>
                            <SelectItem value="PARTIAL">Partially</SelectItem>
                            <SelectItem value="NO">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <Button
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={loading}
                >
                    {loading
                        ? "Resolving Incident..."
                        : "Resolve & Close Incident"}
                </Button>
            </CardContent>
        </Card>
    );
}