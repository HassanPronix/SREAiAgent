"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BotMessageSquare, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChatWindow } from "./ChatWindow";
import { ChatMessageType } from "../../types/types";

export function FloatingChatButton() {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [messages, setMessages] = useState<ChatMessageType[]>([
        {
            id: crypto.randomUUID(),
            role: "assistant",
            content:
                "👋 Hi! I'm your AI Incident Assistant.\n\nAsk me anything about this incident, logs, RCA, timeline, or recommendations.",
        },
    ]);

    const sendMessage = async (message: string) => {
        if (!message.trim() || loading) return;

        const userMessage: ChatMessageType = {
            id: crypto.randomUUID(),
            role: "user",
            content: message,
        };

        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: updatedMessages,
                }),
            });

            const data = await response.json();

            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content:
                        data.message ??
                        "Sorry, I couldn't generate a response.",
                },
            ]);
        } catch (error) {
            console.error(error);

            setMessages((prev) => [
                ...prev,
                {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content:
                        "❌ Something went wrong while contacting the AI.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <ChatWindow
                        messages={messages}
                        loading={loading}
                        onSend={sendMessage}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <motion.div
                className="fixed bottom-6 right-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    size="icon"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="h-14 w-14 rounded-full border border-slate-800 bg-slate-900 shadow-2xl hover:bg-slate-800"
                >
                    {isOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <BotMessageSquare className="h-6 w-6" />
                    )}
                </Button>
            </motion.div>
        </>
    );
}