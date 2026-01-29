import ChatWindow from "./components/ChatWindow"

export default function App() {
  return (
    <div className="h-screen w-full bg-slate-200 relative grid place-items-center p-4 overflow-hidden">
      {/* Abstract Background Shapes - Darker for visibility */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-300/40 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-300/40 rounded-full blur-[100px] animate-pulse [animation-delay:2s]"></div>
      <div className="relative z-10 w-full max-w-5xl flex justify-center">
        <ChatWindow />
      </div>
    </div>
  )
}
