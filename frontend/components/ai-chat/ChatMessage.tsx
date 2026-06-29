"use client";

import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

import { ChatMessageType } from "../../types/types";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface ChatMessageProps {
    message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
    const isAssistant = message.role === "assistant";

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
                "flex w-full gap-3",
                isAssistant ? "justify-start" : "justify-end"
            )}
        >
            {/* AI Avatar */}

            {isAssistant && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
                    <Bot className="h-5 w-5 text-sky-400" />
                </div>
            )}

            {/* Bubble */}

            <div
                className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
                    isAssistant
                        ? "border border-slate-800 bg-slate-800 text-slate-100"
                        : "bg-sky-600 text-white"
                )}
            >
                {isAssistant ? (
                    <MarkdownRenderer content={message.content} />
                ) : (
                    <p className="whitespace-pre-wrap break-words text-sm leading-7">
                        {message.content}
                    </p>
                )}
            </div>

            {/* User Avatar */}

            {!isAssistant && (
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-sky-600">
                    <User className="h-5 w-5 text-white" />
                </div>
            )}
        </motion.div>
    );
}