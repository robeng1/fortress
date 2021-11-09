export interface VoucherSetType {
  set_id: string;
  name?: string;
  count?: number;
  code_length?: number;
  description?: string;
  created_at?: string;
  start_datetime?: string;
  end_datetime?: string;
  discount_id?: string;
  shop_id?: string;
  usage?: string;
  shard_key?: number;
  shard_pos?: number;
}
export interface VoucherSetViewType {
  shop_id: string;
  discount_id: string;
  name?: string;
  description?: string;
  usage?: string;
  voucher_set_id: string;
  count?: number;
  code_length?: number;
  active?: boolean;
  shard_key?: number;
  start_datetime?: number;
  end_datetime?: number;
  created_at?: number;
  updated_at?: number;
  tags?: string[];
  total_discount_int?: number;
  currency?: string;
  num_orders?: number;
  num_basket_additions?: number;
}
