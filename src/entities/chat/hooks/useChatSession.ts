import { useQuery } from "@tanstack/react-query";
import { chatApi } from "../api/chatApi";
import { queryKeys } from "@/entities/shared/queryKeys";

export function useChatSession(sessionId: string) {
  return useQuery({
    queryKey: queryKeys.chat.session(sessionId),
    queryFn: () => chatApi.getSession(sessionId),
    enabled: !!sessionId,
  });
}
