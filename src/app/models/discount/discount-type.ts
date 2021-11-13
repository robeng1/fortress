import { MoneyType } from '../money';
import { Photo } from '../photo';
import { VoucherType } from '../voucher/voucher';
import { VoucherSetType } from '../voucher/voucherset';
import { BenefitType } from './benefit-type';
import { ConditionType } from './condition-type';

export interface DiscountType {
  shop_id: string;
  discount_id: string;
  name?: string;
  short_name?: string;
  slug?: string;
  description?: string;
  group?: string;
  offer_type?: string;
  exclusive?: boolean;
  status?: string;
  condition?: ConditionType | null;
  benefit?: BenefitType | null;
  priority?: number;
  start?: string;
  end?: string;
  max_global_applications?: number;
  max_user_applications?: number;
  max_basket_applications?: number;
  max_discount?: MoneyType | null;
  total_discount?: MoneyType | null;
  num_applications?: number;
  num_orders?: number;
  redirect_url?: string;
  created_at?: string;
  cover_photo?: Photo | null;
  categories?: string[];
  keywords?: string[];
  page_title?: string;
  page_description?: string;
  vouchers?: VoucherType[];
  voucher_sets?: VoucherSetType[];
}

export interface DiscountListType {
  discounts?: DiscountType[];
  next_page_token?: string;
}

export interface DiscountViewType {
  shop_id: string;
  discount_id: string;
  name: string;
  title: string;
  slug: string;
  cover_photo?: string;
  type: string;
  status?: string;
  keywords?: string[];
  categories?: string[];
  active?: boolean;
  description?: string;
  start_date_time?: number;
  end_date_time?: number;
  created_at?: number;
  updated_at?: number;
  num_applications?: number;
  num_orders?: number;
  total_discount_int?: number;
  currency?: string;
  deleted?: boolean;
}
