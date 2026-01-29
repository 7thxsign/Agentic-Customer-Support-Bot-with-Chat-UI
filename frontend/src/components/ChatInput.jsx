import { useState } from "react"
import { Send, Loader2 } from "lucide-react"

export default function ChatInput({ onSend, disabled }) {
    const [text, setText] = useState("")

    function submit() {
        if (!text.trim() || disabled) return
        onSend(text)
        setText("")
    }

    return (
        <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative flex items-center gap-2 max-w-4xl mx-auto">
                <input
                    className="flex-1 bg-slate-50 border-none outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-blue-500 rounded-full px-6 py-3.5 text-slate-700 placeholder:text-slate-400 text-[0.95rem] transition-all shadow-sm"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && submit()}
                    placeholder="Type a message..."
                    disabled={disabled}
                />
                <button
                    onClick={submit}
                    disabled={!text.trim() || disabled}
                    className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-full transition-colors shadow-sm disabled:shadow-none"
                >
                    {disabled ? (
                        <Loader2 size={20} className="animate-spin" />
                    ) : (
                        <Send size={20} className="ml-0.5" />
                    )}
                </button>
            </div>
        </div>
    )
}
