import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tableApi } from "../api/tableApi";
import { queryKeys } from "@/entities/shared/queryKeys";
import type { TableInput } from "../model/types";

export function useCreateTable(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: TableInput) => tableApi.create(data, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tables.all }),
  });
}

export function useUpdateTable(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TableInput }) =>
      tableApi.update(id, data, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tables.all }),
  });
}

export function useDeleteTable(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => tableApi.delete(id, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.tables.all }),
  });
}
