import { LatLng } from '../latLng';
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

export interface InventoryType {
  variant_id?: string;
  product_id?: string;
  centre_id?: string;
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
  shard?: number;
}

export interface InventoryListType {
  stock_records?: InventoryType[];
  next_page_token?: string;
}
