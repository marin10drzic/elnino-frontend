import { useMutation, useQueryClient } from "@tanstack/react-query";
import { chatApi } from "../api/chatApi";
import { queryKeys } from "@/entities/shared/queryKeys";

export function useDeleteChatSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => chatApi.deleteSession(sessionId),
    onSuccess: (_data, sessionId) =>
      qc.removeQueries({ queryKey: queryKeys.chat.session(sessionId) }),
  });
}
