import { useQuery } from "@tanstack/react-query";
import { menuApi } from "../api/menuApi";
import { queryKeys } from "@/entities/shared/queryKeys";

export function useMenuItem(id: string) {
  return useQuery({
    queryKey: queryKeys.menu.item(id),
    queryFn: () => menuApi.getItem(id),
    enabled: !!id,
  });
}
