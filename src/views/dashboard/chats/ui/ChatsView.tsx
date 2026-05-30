"use client";

import { useState } from "react";
import { MessageSquare, User, Bot, Trash2, ChevronLeft } from "lucide-react";
import { useChatSessions, useDeleteChatSession } from "@/entities/chat";
import type { ChatSession } from "@/entities/chat";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import { Skeleton } from "@/shared/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/shared/ui/dialog";

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function SessionList({
  sessions,
  selected,
  onSelect,
  onDelete,
  isLoading,
}: {
  sessions?: ChatSession[];
  selected: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-col border border-stone-800 bg-[#0a0908] overflow-hidden">
      <div className="px-4 py-3 border-b border-stone-800">
        <p className="text-xs text-stone-500 tracking-[0.2em] uppercase">Sessions</p>
      </div>
      <div className="overflow-y-auto flex-1">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="px-4 py-3 border-b border-stone-800/60 flex flex-col gap-2">
              <Skeleton className="h-3 w-40 bg-stone-800" />
              <Skeleton className="h-3 w-24 bg-stone-800" />
            </div>
          ))}

        {!isLoading && sessions?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <MessageSquare className="w-7 h-7 text-stone-700 mb-3" />
            <p className="text-stone-500 text-sm">No sessions yet</p>
          </div>
        )}

        {sessions?.map((session) => {
          const messages = session.messages ?? [];
          const lastMsg = messages[messages.length - 1];
          const userMsgs = messages.filter((m) => m.role === "user").length;
          const isActive = selected === session.session_id;

          return (
            <button
              key={session.session_id}
              onClick={() => onSelect(session.session_id)}
              className={`w-full text-left px-4 py-3 border-b border-stone-800/60 transition-colors group ${
                isActive ? "bg-amber-500/8 border-l-2 border-l-amber-500" : "hover:bg-stone-900/60"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-stone-400 truncate">{session.session_id}</p>
                  {lastMsg && (
                    <p className="text-xs text-stone-600 truncate mt-1">{lastMsg.content}</p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-[10px] text-stone-600">{timeAgo(session.updated_at)}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(session.session_id); }}
                    className="opacity-0 group-hover:opacity-100 text-stone-700 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <Badge className="bg-stone-800 text-stone-400 border-stone-700 text-[10px] h-4 px-1.5">
                  {messages.length} msgs
                </Badge>
                <Badge className="bg-stone-800 text-stone-400 border-stone-700 text-[10px] h-4 px-1.5">
                  {userMsgs} from user
                </Badge>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ConversationPanel({ session }: { session: ChatSession | undefined }) {
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-full border border-stone-800 bg-[#0a0908] text-center p-8">
        <MessageSquare className="w-10 h-10 text-stone-800 mb-3" />
        <p className="text-stone-500 text-sm">Select a session to view the conversation</p>
      </div>
    );
  }

  const messages = session.messages ?? [];

  return (
    <div className="flex flex-col border border-stone-800 bg-[#0a0908] overflow-hidden">
      <div className="px-4 py-3 border-b border-stone-800 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs text-stone-300">{session.session_id}</p>
          <p className="text-[10px] text-stone-600 mt-0.5">
            {messages.length} messages · last active {timeAgo(session.updated_at)}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-stone-600 text-sm text-center py-8">No messages in this session</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 items-start ${msg.role === "assistant" ? "flex-row-reverse" : ""}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === "user" ? "bg-amber-500/20" : "bg-stone-800"
            }`}>
              {msg.role === "user"
                ? <User className="w-3.5 h-3.5 text-amber-400" />
                : <Bot className="w-3.5 h-3.5 text-stone-400" />}
            </div>
            <div className={`max-w-[75%] px-4 py-2.5 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-amber-500/10 text-amber-100 border border-amber-500/15"
                : "bg-stone-900 text-stone-300 border border-stone-800"
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChatsView() {
  const { data: sessions, isLoading, isError } = useChatSessions();
  const { mutate: deleteSession, isPending: isDeleting } = useDeleteChatSession();

  const [selected, setSelected] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const selectedSession = sessions?.find((s) => s.session_id === selected);

  const confirmDelete = () => {
    if (!deleteTarget) return;
    deleteSession(deleteTarget, {
      onSuccess: () => {
        if (selected === deleteTarget) setSelected(null);
        setDeleteTarget(null);
      },
    });
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <h1 className="text-2xl font-serif text-white">Chat Sessions</h1>
        <p className="text-stone-500 text-sm mt-1">All AI assistant conversations</p>
      </div>

      {isError && (
        <div className="border border-red-900/40 bg-red-950/20 px-4 py-3 text-red-400 text-sm">
          Failed to load chat sessions.
        </div>
      )}

      <div className="grid grid-cols-[320px_1fr] gap-4" style={{ height: "calc(100vh - 220px)" }}>
        <SessionList
          sessions={sessions}
          selected={selected}
          onSelect={setSelected}
          onDelete={setDeleteTarget}
          isLoading={isLoading}
        />
        <ConversationPanel session={selectedSession} />
      </div>

      <Dialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <DialogContent className="bg-[#0f0e0d] border border-stone-800 text-stone-200 sm:max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Session</DialogTitle>
          </DialogHeader>
          <p className="text-stone-400 text-sm">
            Are you sure you want to delete this chat session? This cannot be undone.
          </p>
          <DialogFooter className="gap-2 mt-2">
            <Button variant="outline" className="border-stone-700 text-stone-300" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500 text-white"
              disabled={isDeleting}
              onClick={confirmDelete}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
