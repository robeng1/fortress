import { MoneyType } from '../money';
import { Photo } from '../photo';
import { BenefitType } from './benefit-type';
import { ConditionType } from './condition-type';

export interface ConditionalOfferType {
  shop_id?: string;
  offer_id?: string;
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
}

export interface OfferListType {
  offers?: ConditionalOfferType[];
  next_page_token?: string;
}
