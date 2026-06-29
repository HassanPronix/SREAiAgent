"use client";

import { KeyboardEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, SendHorizonal } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ChatInputProps {
    loading: boolean;
    onSend: (message: string) => void;
}

export function ChatInput({
    loading,
    onSend,
}: ChatInputProps) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        const value = message.trim();

        if (!value || loading) return;

        onSend(value);
        setMessage("");
    };

    const handleKeyDown = (
        e: KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex items-end gap-3">
            <textarea
                value={message}
                rows={1}
                disabled={loading}
                placeholder="Ask about incidents..."
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                className="max-h-40 min-h-11 flex-1 resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-500 focus:outline-none"
            />

            <Button
                size="icon"
                onClick={handleSend}
                disabled={!message.trim() || loading}
                className="h-11 w-11 rounded-xl bg-sky-500 text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <Loader2 className="h-5 w-5 animate-spin" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="send"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <SendHorizonal className="h-5 w-5" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Button>
        </div>
    );
}