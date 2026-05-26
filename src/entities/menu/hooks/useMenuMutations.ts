import { useMutation, useQueryClient } from "@tanstack/react-query";
import { menuApi } from "../api/menuApi";
import { queryKeys } from "@/entities/shared/queryKeys";
import type { MenuCategoryInput, MenuItemInput } from "../model/types";

export function useCreateMenuCategory(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: MenuCategoryInput) => menuApi.createCategory(data, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.menu.categories }),
  });
}

export function useUpdateMenuCategory(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MenuCategoryInput }) =>
      menuApi.updateCategory(id, data, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.menu.categories }),
  });
}

export function useDeleteMenuCategory(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => menuApi.deleteCategory(id, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.menu.categories }),
  });
}

export function useCreateMenuItem(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: MenuItemInput) => menuApi.createItem(data, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.menu.items() }),
  });
}

export function useUpdateMenuItem(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: MenuItemInput }) =>
      menuApi.updateItem(id, data, token),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: queryKeys.menu.items() });
      qc.invalidateQueries({ queryKey: queryKeys.menu.item(id) });
    },
  });
}

export function useDeleteMenuItem(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => menuApi.deleteItem(id, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.menu.items() }),
  });
}
