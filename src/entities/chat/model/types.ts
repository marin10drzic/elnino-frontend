export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type ChatSession = {
  session_id: string;
  messages: ChatMessage[];
};

export type ChatRequest = {
  message: string;
  session_id: string;
};

export type ChatChunk = {
  session_id: string;
  message: string;
  done: boolean;
};
