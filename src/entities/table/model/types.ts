export type TableLocation = "unutra" | "terasa" | "vip";

export type Table = {
  id: string;
  table_number: number;
  capacity: number;
  location: TableLocation;
  is_active: boolean;
  created_at: string;
};

export type TableInput = {
  table_number: number;
  capacity: number;
  location?: TableLocation;
  is_active?: boolean;
};
