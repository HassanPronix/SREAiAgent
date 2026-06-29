"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ChatMessageType } from "../../types/types";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";

interface ChatWindowProps {
    messages: ChatMessageType[];
    loading: boolean;
    onSend: (message: string) => void;
    onClose: () => void;
}

const suggestions = [
    "Summarize this incident",
    "Explain the root cause",
    "Generate an RCA",
    "Recommend a fix",
    "Analyze recent logs",
    "Show the timeline",
];

export function ChatWindow({
    messages,
    loading,
    onSend,
    onClose,
}: ChatWindowProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const showSuggestions = useMemo(() => messages.length <= 1, [messages]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 flex h-[605px] w-[420px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl"
        >
            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-800">
                        <Bot className="h-5 w-5 text-sky-400" />
                    </div>

                    <div>
                        <h2 className="font-semibold text-white">
                            AI Incident Assistant
                        </h2>

                        <p className="flex items-center gap-1 text-xs text-slate-400">
                            <Sparkles className="h-3 w-3" />
                            Powered by AI
                        </p>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                    <X className="h-5 w-5" />
                </Button>
            </div>

            {/* Messages */}

            <ScrollArea className="flex-1 px-4 py-5">
                <div className="space-y-4">
                    {messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                    ))}

                    {loading && <TypingIndicator />}

                    {showSuggestions && (
                        <div className="pt-4">
                            <p className="mb-3 text-xs uppercase tracking-wide text-slate-500">
                                Try asking
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {suggestions.map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        onClick={() => onSend(suggestion)}
                                        className="rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-300 transition hover:border-sky-500 hover:bg-slate-700 hover:text-white"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>
            </ScrollArea>

            {/* Input */}

            <div className="border-t border-slate-800 bg-slate-900 p-4">
                <ChatInput
                    loading={loading}
                    onSend={onSend}
                />
            </div>
        </motion.div>
    );
}