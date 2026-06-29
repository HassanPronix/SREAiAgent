"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

const dotVariants = {
    animate: (i: number) => ({
        y: [0, -5, 0],
        opacity: [0.4, 1, 0.4],
        transition: {
            repeat: Infinity,
            duration: 0.9,
            delay: i * 0.15,
            ease: "easeInOut",
        },
    }),
};

export function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-3"
        >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800">
                <Bot className="h-4 w-4 text-sky-400" />
            </div>

            <div className="rounded-2xl rounded-bl-md border border-slate-700 bg-slate-800 px-4 py-3">
                <div className="flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            className="h-2 w-2 rounded-full bg-sky-400"
                            animate={{
                                y: [0, -5, 0],
                                opacity: [0.4, 1, 0.4],
                            }}
                            transition={{
                                duration: 0.9,
                                repeat: Infinity,
                                repeatType: "loop",
                                delay: i * 0.15,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}