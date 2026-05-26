import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/userApi";
import { queryKeys } from "@/entities/shared/queryKeys";
import type { UserProfileInput, UserRoleUpdate } from "../model/types";

export function useUpdateProfile(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UserProfileInput) => userApi.updateMe(data, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.users.me }),
  });
}

export function useUpdateUserRole(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserRoleUpdate }) =>
      userApi.updateRole(id, data, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.users.all() }),
  });
}
