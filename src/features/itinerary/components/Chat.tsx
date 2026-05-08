"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { chatAction } from "../actions";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: "model",
    content: "Hi! I'm your travel assistant. Do you have any questions about your itinerary or need more suggestions?"
  }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    
    // Add user message to UI
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    // Call action
    const res = await chatAction(messages, userMessage);
    
    setLoading(false);
    if (res.success && res.reply) {
      setMessages([...newMessages, { role: "model", content: res.reply }]);
    } else {
      setMessages([...newMessages, { role: "model", content: "Sorry, I encountered an error. Please try again." }]);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[500px]">
      <div className="p-4 bg-indigo-50 border-b border-indigo-100 flex items-center gap-2">
        <Bot className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold text-indigo-900">Travel Assistant</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "model" && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-indigo-600" />
              </div>
            )}
            
            <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
              msg.role === "user" 
                ? "bg-indigo-600 text-white rounded-tr-sm" 
                : "bg-white text-gray-700 border border-gray-100 shadow-sm rounded-tl-sm"
            }`}>
              {msg.content}
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-emerald-600" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 justify-start">
             <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-white text-gray-700 border border-gray-100 shadow-sm rounded-tl-sm flex items-center">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
