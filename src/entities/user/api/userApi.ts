import { apiClient } from "@/shared/lib/apiClient";
import type { UserProfile, UserProfileInput, UserRole, UserRoleUpdate } from "../model/types";

export const userApi = {
  getMe: (token: string) =>
    apiClient.get<UserProfile>("/users/me", token),

  updateMe: (data: UserProfileInput, token: string) =>
    apiClient.put<UserProfile>("/users/me", data, token),

  getAll: (role?: UserRole, token?: string) => {
    const qs = role ? `?role=${role}` : "";
    return apiClient.get<UserProfile[]>(`/users${qs}`, token);
  },

  updateRole: (id: string, data: UserRoleUpdate, token: string) =>
    apiClient.patch<UserProfile>(`/users/${id}/role`, data, token),
};
