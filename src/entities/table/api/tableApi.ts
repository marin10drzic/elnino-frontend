import { apiClient } from "@/shared/lib/apiClient";
import type { Table, TableInput } from "../model/types";

export const tableApi = {
  getAll: () =>
    apiClient.get<Table[]>("/tables"),

  create: (data: TableInput, token: string) =>
    apiClient.post<Table>("/tables", data, token),

  update: (id: string, data: TableInput, token: string) =>
    apiClient.put<Table>(`/tables/${id}`, data, token),

  delete: (id: string, token: string) =>
    apiClient.delete(`/tables/${id}`, token),
};
