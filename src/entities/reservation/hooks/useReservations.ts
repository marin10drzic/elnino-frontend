import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../api/reservationApi";
import { queryKeys } from "@/entities/shared/queryKeys";
import type { ReservationFilters } from "../model/types";

export function useReservations(filters: ReservationFilters = {}, token: string) {
  return useQuery({
    queryKey: queryKeys.reservations.all(filters),
    queryFn: () => reservationApi.getAll(filters, token),
    enabled: !!token,
  });
}

export function useMyReservations(token: string) {
  return useQuery({
    queryKey: queryKeys.reservations.my,
    queryFn: () => reservationApi.getMy(token),
    enabled: !!token,
  });
}

export function useReservation(id: string, token: string) {
  return useQuery({
    queryKey: queryKeys.reservations.detail(id),
    queryFn: () => reservationApi.getById(id, token),
    enabled: !!id && !!token,
  });
}
