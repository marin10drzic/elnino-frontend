export type ReservationStatus = "pending" | "confirmed" | "cancelled" | "completed";

export type Reservation = {
  id: string;
  table_id: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  party_size: number;
  reserved_at: string;
  duration_mins: number;
  status: ReservationStatus;
  notes: string;
  created_at: string;
  updated_at: string;
};

export type ReservationInput = {
  guest_name: string;
  guest_email: string;
  guest_phone?: string;
  party_size: number;
  reserved_at: string;
  table_id?: string;
  duration_mins?: number;
  notes?: string;
};

export type ReservationFilters = {
  date?: string;
  status?: ReservationStatus;
  tableId?: string;
};

export type ReservationStatusUpdate = {
  status: ReservationStatus;
};

export type AvailableSlot = {
  time: string;
  available_tables: import("@/entities/table/model/types").Table[];
};

export type AvailabilityResponse = {
  date: string;
  available_slots: AvailableSlot[];
};
