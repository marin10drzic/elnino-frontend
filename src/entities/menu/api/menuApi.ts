import { apiClient } from "@/shared/lib/apiClient";
import type {
  MenuCategory,
  MenuCategoryInput,
  MenuItem,
  MenuItemFilters,
  MenuItemInput,
} from "../model/types";

export const menuApi = {
  getCategories: () =>
    apiClient.get<MenuCategory[]>("/menu/categories"),

  createCategory: (data: MenuCategoryInput, token: string) =>
    apiClient.post<MenuCategory>("/menu/categories", data, token),

  updateCategory: (id: string, data: MenuCategoryInput, token: string) =>
    apiClient.put<MenuCategory>(`/menu/categories/${id}`, data, token),

  deleteCategory: (id: string, token: string) =>
    apiClient.delete(`/menu/categories/${id}`, token),

  getItems: (filters?: MenuItemFilters) => {
    const params = new URLSearchParams();
    if (filters?.categoryId) params.set("category_id", filters.categoryId);
    if (filters?.availableOnly !== undefined)
      params.set("available_only", String(filters.availableOnly));
    const qs = params.toString();
    return apiClient.get<MenuItem[]>(`/menu/items${qs ? `?${qs}` : ""}`);
  },

  getItem: (id: string) =>
    apiClient.get<MenuItem>(`/menu/items/${id}`),

  createItem: (data: MenuItemInput, token: string) =>
    apiClient.post<MenuItem>("/menu/items", data, token),

  updateItem: (id: string, data: MenuItemInput, token: string) =>
    apiClient.put<MenuItem>(`/menu/items/${id}`, data, token),

  deleteItem: (id: string, token: string) =>
    apiClient.delete(`/menu/items/${id}`, token),
};
