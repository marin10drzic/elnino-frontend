import { apiClient } from "@/shared/lib/apiClient";
import type {
  AvailabilityResponse,
  Reservation,
  ReservationFilters,
  ReservationInput,
  ReservationStatusUpdate,
} from "../model/types";

export const reservationApi = {
  getAvailability: (date: string, partySize: number) => {
    const params = new URLSearchParams({ date, party_size: String(partySize) });
    return apiClient.get<AvailabilityResponse>(`/reservations/availability?${params}`);
  },

  create: (data: ReservationInput) =>
    apiClient.post<Reservation>("/reservations", data),

  getMy: (token: string) =>
    apiClient.get<Reservation[]>("/reservations/my", token),

  getAll: (filters: ReservationFilters = {}, token: string) => {
    const params = new URLSearchParams();
    if (filters.date) params.set("date", filters.date);
    if (filters.status) params.set("status", filters.status);
    if (filters.tableId) params.set("table_id", filters.tableId);
    const qs = params.toString();
    return apiClient.get<Reservation[]>(`/reservations${qs ? `?${qs}` : ""}`, token);
  },

  getById: (id: string, token: string) =>
    apiClient.get<Reservation>(`/reservations/${id}`, token),

  updateStatus: (id: string, data: ReservationStatusUpdate, token: string) =>
    apiClient.patch<Reservation>(`/reservations/${id}`, data, token),

  delete: (id: string, token: string) =>
    apiClient.delete(`/reservations/${id}`, token),
};
