import { MoneyType } from '../money';

export interface VoucherType {
  name?: string;
  code?: string;
  discount_id?: string;
  usage?: string;
  start_datetime?: string;
  end_datetime?: string;
  voucher_set_id?: string;
  voucher_id: string;
  shop_id?: string;
  created_at?: string;
  num_cart_additions?: number;
  num_orders?: number;
  total_discount?: MoneyType;
  shard_key?: number;
  shard_pos?: number;
}
export interface VoucherViewType {
  num_applications?: number;
  num_orders?: number;
  num_basket_additions?: number;
  shop_id: string;
  discount_id: string;
  name?: string;
  code?: string;
  voucher_id: string;
  voucher_set_id?: string;
  active?: boolean;
  currency?: string;
  shard_key?: number;
  start_datetime?: number;
  end_datetime?: number;
  created_at?: number;
  updated_at?: number;
  total_discount_int?: number;
  tags?: string[];
}
