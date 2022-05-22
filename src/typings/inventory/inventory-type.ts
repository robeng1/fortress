import { LatLng } from '../coordinate';
import { MoneyType } from '../money';
import { AddressType } from '../settings/shop-type';

export interface LocationType {
  centre_id?: string;
  code?: string;
  name?: string;
  longitude?: number | string;
  latitude?: number | string;
  address?: AddressType | null;
  created_at?: string;
  description?: string;
  average_dispatch_time?: string;
  is_pick_up_centre?: boolean;
  is_active?: boolean;
  shop_id?: string;
}

export interface LocationListType {
  stores?: LocationType[];
  next_page_token?: string;
}

export interface InventoryType {
  variant_id: string;
  product_id: string;
  centre_id: string;
  centre_sku?: string;
  num_in_stock?: number;
  num_allocated?: number;
  low_stock_threshold?: number;
  created_at?: string;
  updated_at?: string;
  is_active?: boolean;
  shop_id?: string;
  price_excl_tax?: MoneyType | null;
  hex_index?: number | string;
  location?: LatLng | null;
  compare_at_price?: MoneyType | null;
  cost_per_item?: MoneyType | null;
  taxable?: boolean;
  track_quantity?: boolean;
  unlimited?: boolean;
  sid?: number;
  stock_id?: number;
}

export interface InventoryListType {
  stock_records?: InventoryType[];
  next_page_token?: string;
}

export interface InventoryViewListType {
  records?: InventoryViewType[];
  total: number;
}

export interface InventoryViewType {
  num_allocated: number;
  num_in_stock: number;
  price_excl_tax: number;
  compare_at_price: number;
  cost_per_item: number;
  title: string;
  description: string;
  sku: string;
  image_url: string;
  shop_id: string;
  product_id: string;
  variant_id: string;
  centre_id: string;
  created_at?: number;
  updated_at?: number;
  centre_sku: string;
  item_condition: string;
  currency: string;
  deleted: boolean;
  attributes: string;
  track_quantity: boolean;
  stock_id: string;
}
