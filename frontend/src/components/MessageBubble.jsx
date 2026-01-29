import ReactMarkdown from 'react-markdown'
import { User, Bot } from 'lucide-react'

export default function MessageBubble({ role, text }) {
    const isUser = role === "user"

    return (
        <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"} mb-4`}>
            <div className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"} gap-3 items-start`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm
                    ${isUser ? "bg-blue-600 text-white" : "bg-emerald-600 text-white"}`}>
                    {isUser ? <User size={16} /> : <Bot size={16} />}
                </div>

                {/* Message Bubble */}
                <div
                    className={`px-5 py-3 rounded-2xl text-[0.95rem] leading-relaxed shadow-sm
                    ${isUser
                            ? "bg-blue-600 text-white rounded-tr-sm"
                            : "bg-white text-slate-800 border border-slate-100 rounded-tl-sm"
                        }`}
                >
                    <div className={`prose prose-sm max-w-none ${isUser ? "prose-invert" : "text-slate-700"}`}>
                        <ReactMarkdown
                            components={{
                                strong: ({ node, ...props }) => (
                                    <span className={`font-bold ${isUser ? "text-white" : "text-slate-900"}`} {...props} />
                                )
                            }}
                        >
                            {text}
                        </ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}
