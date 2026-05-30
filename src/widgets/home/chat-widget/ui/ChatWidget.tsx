"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { chatApi } from "@/entities/chat";

type Message = {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
};

export function ChatWidget() {
  const t = useTranslations("chat");
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const sessionIdRef = useRef<string>(crypto.randomUUID());
  const stopStreamRef = useRef<(() => void) | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text || isStreaming) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setIsStreaming(true);
    setMessages((prev) => [...prev, { role: "assistant", content: "", streaming: true }]);

    const stop = chatApi.streamMessage(
      { message: text, session_id: sessionIdRef.current },
      (chunk) => {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === "assistant") {
            updated[updated.length - 1] = { ...last, content: last.content + chunk.message };
          }
          return updated;
        });
      },
      () => {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === "assistant") {
            updated[updated.length - 1] = { ...last, streaming: false };
          }
          return updated;
        });
        setIsStreaming(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      },
      () => {
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last?.role === "assistant") {
            updated[updated.length - 1] = {
              ...last,
              content: t("error"),
              streaming: false,
            };
          }
          return updated;
        });
        setIsStreaming(false);
      }
    );

    stopStreamRef.current = stop;
  }, [input, isStreaming]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClose = () => {
    stopStreamRef.current?.();
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] flex flex-col bg-[#0d0b09] border border-amber-900/30 shadow-2xl shadow-black/60">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-amber-900/30 bg-[#0a0908]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <div>
                <p className="text-white text-sm font-serif tracking-wide">{t("title")}</p>
                <p className="text-stone-500 text-[10px] tracking-[0.3em] uppercase">{t("subtitle")}</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-stone-500 hover:text-stone-300 transition-colors w-7 h-7 flex items-center justify-center"
              aria-label={t("close")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="overflow-y-auto p-4 space-y-4" style={{ height: "360px" }}>
            {messages.length === 0 && (
              <div className="text-center pt-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-px w-8 bg-amber-500/40" />
                  <span className="text-amber-500/60 text-[10px] tracking-[0.4em] uppercase">El Nigo</span>
                  <div className="h-px w-8 bg-amber-500/40" />
                </div>
                <p className="font-serif text-white text-lg mb-2">{t("welcome")}</p>
                <p className="text-stone-500 text-xs leading-relaxed max-w-[260px] mx-auto">
                  {t("welcomeText")}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 justify-center">
                  {[t("s1"), t("s2"), t("s3"), t("s4")].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setInput(s);
                        setTimeout(() => inputRef.current?.focus(), 0);
                      }}
                      className="text-[10px] tracking-wider text-amber-500/70 border border-amber-900/40 px-3 py-1 hover:border-amber-500/50 hover:text-amber-400 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[82%] px-3 py-2.5 text-xs leading-relaxed ${
                    msg.role === "user"
                      ? "bg-amber-500 text-black font-medium"
                      : "bg-[#161210] text-stone-300 border border-amber-900/20"
                  }`}
                >
                  {msg.content}
                  {msg.streaming && !msg.content && (
                    <span className="flex gap-1 py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  )}
                  {msg.streaming && msg.content && (
                    <span className="inline-block w-0.5 h-3 bg-amber-400 ml-0.5 animate-pulse align-middle" />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-amber-900/30 p-3 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("placeholder")}
              disabled={isStreaming}
              className="flex-1 bg-[#161210] border border-amber-900/30 text-stone-300 text-xs px-3 py-2.5 placeholder-stone-600 focus:outline-none focus:border-amber-500/40 disabled:opacity-50 transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isStreaming}
              className="px-4 py-2 bg-amber-500 text-black flex items-center justify-center hover:bg-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label={t("send")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center shadow-lg shadow-amber-900/30 transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label={t("open")}
      >
        {isOpen ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
