import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reservationApi } from "../api/reservationApi";
import { queryKeys } from "@/entities/shared/queryKeys";
import type { ReservationInput, ReservationStatusUpdate } from "../model/types";

export function useCreateReservation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ReservationInput) => reservationApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.reservations.all() }),
  });
}

export function useUpdateReservationStatus(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ReservationStatusUpdate }) =>
      reservationApi.updateStatus(id, data, token),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: queryKeys.reservations.all() });
      qc.invalidateQueries({ queryKey: queryKeys.reservations.detail(id) });
    },
  });
}

export function useDeleteReservation(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => reservationApi.delete(id, token),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.reservations.all() }),
  });
}
