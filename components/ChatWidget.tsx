"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_REPLIES = [
  "What do I need as a plumber?",
  "Do I need workers' comp solo?",
  "How fast can I get covered?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm here to help you figure out exactly what coverage your trade needs. What can I answer for you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showNotif, setShowNotif] = useState(true);
  const [usedReplies, setUsedReplies] = useState<Set<string>>(new Set());
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      // Fallback response if API is unavailable
      const fallback = getFallbackResponse(text);
      setMessages([
        ...newMessages,
        { role: "assistant", content: fallback },
      ]);
    }
    setIsTyping(false);
  };

  const handleQuickReply = (text: string) => {
    setUsedReplies((prev) => new Set(prev).add(text));
    sendMessage(text);
  };

  return (
    <div className="fixed bottom-7 right-7 z-[800]">
      {/* Panel */}
      {open && (
        <div className="absolute bottom-[72px] right-0 w-[340px] bg-charcoal border border-white/[0.08] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col">
          {/* Header */}
          <div className="bg-steel p-4 flex items-center gap-2.5 border-b border-white/[0.06]">
            <div className="w-9 h-9 bg-orange rounded-full flex items-center justify-center text-base">
              🤖
            </div>
            <div>
              <strong className="block text-sm font-semibold text-white">
                ContractorCovered AI
              </strong>
              <small className="text-[11px] text-green">
                ● Online · Replies instantly
              </small>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesRef}
            className="chat-messages flex-1 p-4 flex flex-col gap-2.5 max-h-[280px] overflow-y-auto"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  msg.role === "assistant"
                    ? "bg-steel text-fog rounded-[4px_12px_12px_12px] self-start"
                    : "bg-orange text-black font-medium rounded-[12px_4px_12px_12px] self-end"
                }`}
              >
                {msg.content}
              </div>
            ))}
            {isTyping && (
              <div className="bg-steel text-fog rounded-[4px_12px_12px_12px] self-start max-w-[85%] px-3.5 py-2.5 text-[13px]">
                Typing...
              </div>
            )}
          </div>

          {/* Quick replies */}
          <div className="flex flex-wrap gap-1.5 px-4 pb-3">
            {QUICK_REPLIES.filter((r) => !usedReplies.has(r)).map((r) => (
              <button
                key={r}
                onClick={() => handleQuickReply(r)}
                className="bg-steel border border-orange/25 rounded-2xl px-3 py-1.5 text-xs text-orange cursor-pointer transition-all hover:bg-orange/[0.12] hover:border-orange"
                style={{ fontFamily: "'Barlow', sans-serif" }}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 pt-3 border-t border-white/[0.06]">
            <input
              type="text"
              className="flex-1 bg-steel border border-white/[0.08] rounded-[20px] px-3.5 py-2 text-[13px] text-white outline-none placeholder:text-ash focus:border-orange"
              style={{ fontFamily: "'Barlow', sans-serif" }}
              placeholder="Ask anything about coverage..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button
              onClick={() => sendMessage(input)}
              className="w-[34px] h-[34px] bg-orange border-none rounded-full cursor-pointer flex items-center justify-center shrink-0 hover:bg-orange-hot transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" className="fill-black">
                <path d="M2 8l12-6-5 6 5 6z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => {
          setOpen(!open);
          setShowNotif(false);
        }}
        className="w-14 h-14 bg-orange rounded-full border-none cursor-pointer flex items-center justify-center shadow-[0_4px_20px_rgba(249,115,22,0.45)] transition-all hover:bg-orange-hot hover:scale-[1.08] relative"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" className="fill-black">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
        </svg>
        {showNotif && (
          <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green rounded-full border-2 border-black" />
        )}
      </button>
    </div>
  );
}

function getFallbackResponse(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes("plumber") || lower.includes("plumb")) {
    return "Plumbers typically need: General Liability (required for most jobs, covers water damage claims), Tools & Equipment (your pipe wrenches and diagnostic gear aren't cheap), and Commercial Auto if you're using a work van. Workers' Comp if you have any helpers. Starting around $89/month for GL alone. Want me to get you a real quote?";
  }
  if (lower.includes("worker") || lower.includes("comp") || lower.includes("solo") || lower.includes("alone")) {
    return "If you're truly solo with zero employees or subcontractors, workers' comp isn't legally required in most states. But the moment you hire a helper — even a family member, even occasionally — most states require it. It also protects YOU if you're injured and can't work. About $60/month is typical for a solo trade. Want the specific rules for your state?";
  }
  if (lower.includes("fast") || lower.includes("quick") || lower.includes("long") || lower.includes("time") || lower.includes("covered")) {
    return "Fast. You fill out 8 questions (takes ~3 minutes), get instant quotes from multiple carriers, pick one, pay, and your Certificate of Insurance is in your email immediately — usually before you can text your client to confirm. Most people are fully insured within 10 minutes of landing on our site.";
  }
  return "Great question. The short answer depends on your specific trade and situation. The fastest way to get a clear answer is to start a quote — it only takes 3 minutes and shows you exactly what's available for your trade and state. Want me to walk you through it?";
}
