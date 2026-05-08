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
    <div className="flex flex-col bg-card rounded-2xl shadow-sm border border-border overflow-hidden h-[400px]">
      <div className="p-4 bg-primary/10 border-b border-border flex items-center gap-2">
        <Bot className="w-5 h-5 text-primary" />
        <h3 className="font-semibold text-foreground">Travel Assistant</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "model" && (
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}
            
            <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
              msg.role === "user" 
                ? "bg-primary text-primary-foreground rounded-tr-sm" 
                : "bg-card text-foreground border border-border shadow-sm rounded-tl-sm"
            }`}>
              {msg.content}
            </div>

            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-emerald-500" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex gap-3 justify-start">
             <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="px-4 py-2.5 rounded-2xl bg-card text-foreground border border-border shadow-sm rounded-tl-sm flex items-center">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-card border-t border-border flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          className="flex-1 px-4 py-2 bg-muted border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-background transition-all text-sm text-foreground placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
