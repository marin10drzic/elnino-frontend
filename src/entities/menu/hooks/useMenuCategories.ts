import { useQuery } from "@tanstack/react-query";
import { menuApi } from "../api/menuApi";
import { queryKeys } from "@/entities/shared/queryKeys";

export function useMenuCategories() {
  return useQuery({
    queryKey: queryKeys.menu.categories,
    queryFn: () => menuApi.getCategories(),
  });
}
