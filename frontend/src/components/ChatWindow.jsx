import { useState, useRef, useEffect } from "react"
import { sendMessage } from "../api"
import MessageBubble from "./MessageBubble"
import ChatInput from "./ChatInput"
import { Bot, MoreVertical } from "lucide-react"

export default function ChatWindow() {
    const [status, setStatus] = useState("online")
    const [messages, setMessages] = useState([])
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)
    const customerId = "customer_001"

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isTyping])

    async function handleSend(text) {
        const userMsg = { role: "user", text }
        setMessages(prev => [...prev, userMsg])
        setIsTyping(true)

        try {
            const response = await fetch("http://localhost:8000/chat_stream", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer_id: customerId,
                    message: text,
                }),
            })

            if (!response.body) return

            const reader = response.body.getReader()
            const decoder = new TextDecoder()

            // Add initial empty bot message
            setMessages(prev => [...prev, { role: "bot", text: "" }])
            setIsTyping(false)

            let fullText = ""

            while (true) {
                const { done, value } = await reader.read()
                if (done) break

                const chunk = decoder.decode(value, { stream: true })

                // Process chunk character by character for smooth animation
                for (const char of chunk) {
                    fullText += char
                    await new Promise(resolve => setTimeout(resolve, 2)) // Faster animation (2ms)

                    setMessages(prev => {
                        const newMessages = [...prev]
                        const lastMsg = newMessages[newMessages.length - 1]
                        if (lastMsg.role === "bot") {
                            lastMsg.text = fullText
                        }
                        return newMessages
                    })
                }
            }
        } catch (error) {
            console.error("Streaming error:", error)
            setIsTyping(false)
        }
    }

    return (
        <div className="w-full h-[80vh] bg-white rounded-[2rem] shadow-2xl shadow-slate-300/50 border border-slate-100/80 flex flex-col overflow-hidden backdrop-blur-3xl">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md px-6 py-4 border-b border-slate-100 flex justify-between items-center z-10 sticky top-0">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                            <Bot size={24} />
                        </div>
                        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-800 text-lg">Support Assistant</h1>
                        <p className="text-xs font-medium text-emerald-600 uppercase tracking-wide">
                            {status}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400">
                    <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 scroll-smooth flex flex-col">
                {messages.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 opacity-60">
                        <Bot size={48} className="mb-4 text-slate-300" />
                        <p className="text-sm">Start a conversation with the support bot.</p>
                    </div>
                )}

                {messages.map((m, i) => (
                    <MessageBubble key={i} role={m.role} text={m.text} />
                ))}

                {isTyping && (
                    <div className="flex justify-start w-full mb-4">
                        <div className="flex max-w-[80%] flex-row gap-3 items-start">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm text-white">
                                <Bot size={16} />
                            </div>
                            <div className="bg-white text-slate-800 border border-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                                <span className="w-2 h-2 bg-slate-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-2 h-2 bg-slate-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-2 h-2 bg-slate-600 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <ChatInput onSend={handleSend} disabled={isTyping} />
        </div>
    )
}
