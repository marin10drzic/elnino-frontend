import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/userApi";
import { queryKeys } from "@/entities/shared/queryKeys";
import type { UserRole } from "../model/types";

export function useUsers(role?: UserRole, token?: string) {
  return useQuery({
    queryKey: queryKeys.users.all(role),
    queryFn: () => userApi.getAll(role, token),
    enabled: !!token,
  });
}
