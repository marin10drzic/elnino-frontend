import { useQuery } from "@tanstack/react-query";
import { menuApi } from "../api/menuApi";
import { queryKeys } from "@/entities/shared/queryKeys";
import type { MenuItemFilters } from "../model/types";

export function useMenuItems(filters?: MenuItemFilters) {
  return useQuery({
    queryKey: queryKeys.menu.items(filters),
    queryFn: () => menuApi.getItems(filters),
  });
}
