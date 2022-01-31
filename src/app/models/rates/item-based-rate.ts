import { MoneyType } from '../money';

export interface ItemBasedRateType {
  shop_id?: string;
  rate_id?: string;
  code?: string;
  name?: string;
  description?: string;
  is_discounted?: boolean;
  price_per_order?: MoneyType | null;
  price_per_item?: MoneyType | null;
  free_shipping_threshold?: MoneyType | null;
  transit_time?: number;
  cities?: string[];
}
