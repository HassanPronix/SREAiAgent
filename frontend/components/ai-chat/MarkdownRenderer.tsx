"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MarkdownRendererProps {
    content: string;
}

export function MarkdownRenderer({
    content,
}: MarkdownRendererProps) {
    return (
        <article
            className="
        prose
        prose-invert
        prose-slate
        max-w-none

        prose-headings:mb-3
        prose-headings:mt-6
        prose-headings:text-white

        prose-p:text-slate-200
        prose-p:leading-7

        prose-strong:text-white

        prose-li:text-slate-200

        prose-code:text-sky-300
        prose-code:before:hidden
        prose-code:after:hidden

        prose-pre:bg-slate-950
        prose-pre:border
        prose-pre:border-slate-700
        prose-pre:rounded-xl
        prose-pre:p-4

        prose-blockquote:border-sky-500
        prose-blockquote:text-slate-300

        prose-a:text-sky-400
        prose-a:no-underline
        hover:prose-a:underline

        prose-table:border-collapse
        prose-th:border
        prose-th:border-slate-700
        prose-th:bg-slate-800
        prose-th:p-2

        prose-td:border
        prose-td:border-slate-700
        prose-td:p-2
      "
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
            >
                {content}
            </ReactMarkdown>
        </article>
    );
}