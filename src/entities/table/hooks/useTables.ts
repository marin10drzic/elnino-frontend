import { useQuery } from "@tanstack/react-query";
import { tableApi } from "../api/tableApi";
import { queryKeys } from "@/entities/shared/queryKeys";

export function useTables() {
  return useQuery({
    queryKey: queryKeys.tables.all,
    queryFn: () => tableApi.getAll(),
  });
}
