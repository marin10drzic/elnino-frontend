export type UserRole = "guest" | "admin" | "superadmin";

export type UserProfile = {
  id: string;
  full_name: string;
  phone: string;
  avatar_url: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export type UserProfileInput = {
  full_name?: string;
  phone?: string;
  avatar_url?: string;
};

export type UserRoleUpdate = {
  role: UserRole;
};
