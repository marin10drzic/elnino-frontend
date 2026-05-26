export type MenuCategory = {
  id: string;
  name: string;
  description: string;
  sort_order: number;
  created_at: string;
};

export type MenuItem = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  is_available: boolean;
  allergens: string[];
  tags: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type MenuItemFilters = {
  categoryId?: string;
  availableOnly?: boolean;
};

export type MenuCategoryInput = {
  name: string;
  description?: string;
  sort_order?: number;
};

export type MenuItemInput = {
  name: string;
  price: number;
  description?: string;
  category_id?: string;
  image_url?: string;
  is_available?: boolean;
  sort_order?: number;
  tags?: string[];
  allergens?: string[];
};
