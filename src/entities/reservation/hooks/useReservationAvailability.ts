import { useQuery } from "@tanstack/react-query";
import { reservationApi } from "../api/reservationApi";
import { queryKeys } from "@/entities/shared/queryKeys";

export function useReservationAvailability(date: string, partySize: number) {
  return useQuery({
    queryKey: queryKeys.reservations.availability(date, partySize),
    queryFn: () => reservationApi.getAvailability(date, partySize),
    enabled: !!date && partySize > 0,
  });
}
