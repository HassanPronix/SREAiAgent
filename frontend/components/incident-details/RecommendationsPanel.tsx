import { Check, Sparkles, X, Terminal, GitBranch } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Incident } from "@/types/incident";

interface Props {
    incident: Incident;
}

export default function RecommendationsPanel({ incident }: Props) {
    const ai = incident.aiAnalysis;

    const recommendations = ai?.remediation || [];
    const commands = ai?.commands || [];
    const hasYaml = !!ai?.kubernetesYaml;

    const isK8sIncident = commands.length > 0 || hasYaml;

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    <CardTitle>AI Recommendations</CardTitle>
                </div>

                <CardDescription>
                    AI-generated remediation actions
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">

                {/* 🔥 NO RECOMMENDATIONS */}
                {recommendations.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-8 text-center">
                        <p className="text-muted-foreground">
                            No AI recommendations available yet.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* 🧠 REMEDIATION STEPS */}
                        <div className="space-y-3">
                            <h3 className="text-sm font-semibold text-muted-foreground">
                                Suggested Fixes
                            </h3>

                            {recommendations.map((rec, index) => (
                                <div key={index} className="rounded-lg border p-4">
                                    <p className="font-medium">{rec}</p>
                                </div>
                            ))}
                        </div>

                        {/* ⚙️ COMMANDS (ONLY IF EXISTS) */}
                        {commands.length > 0 && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <Terminal className="h-4 w-4" />
                                    <h3 className="text-sm font-semibold text-muted-foreground">
                                        Suggested Commands
                                    </h3>
                                </div>

                                <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
                                    {commands.map((cmd, i) => (
                                        <code key={i} className="block text-sm">
                                            {cmd}
                                        </code>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ☸️ YAML / GITOPS (ONLY IF EXISTS) */}
                        {hasYaml && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <GitBranch className="h-4 w-4" />
                                    <h3 className="text-sm font-semibold text-muted-foreground">
                                        GitOps Patch (ArgoCD)
                                    </h3>
                                </div>

                                <pre className="rounded-lg border bg-muted/30 p-4 text-xs overflow-auto">
                                    {ai?.kubernetesYaml}
                                </pre>
                            </div>
                        )}

                        {/* 📊 CONFIDENCE */}
                        <div>
                            <Badge variant="secondary">
                                Confidence: {ai?.confidence ?? 0}%
                            </Badge>

                            {/* 🧠 RISK TYPE INDICATOR */}
                            <Badge variant="outline" className="ml-2">
                                {isK8sIncident ? "Kubernetes Incident" : "Application/DB Incident"}
                            </Badge>
                        </div>

                        {/* 🚀 ACTION BUTTONS (ONLY FOR K8S INCIDENTS) */}
                        {isK8sIncident && (
                            <div className="mt-6 flex gap-3">
                                <Button>
                                    <Check className="mr-2 h-4 w-4" />
                                    Approve for Deployment
                                </Button>

                                <Button variant="destructive">
                                    <X className="mr-2 h-4 w-4" />
                                    Reject
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}