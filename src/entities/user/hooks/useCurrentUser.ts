import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/userApi";
import { queryKeys } from "@/entities/shared/queryKeys";

export function useCurrentUser(token: string) {
  return useQuery({
    queryKey: queryKeys.users.me,
    queryFn: () => userApi.getMe(token),
    enabled: !!token,
  });
}
