import { MoneyType } from '../money';

export interface WeightBasedRateType {
  shop_id?: string;
  rate_id?: string;
  code?: string;
  name?: string;
  description?: string;
  is_discounted?: boolean;
  price_per_order?: MoneyType | null;
  price_per_weight?: MoneyType | null;
  default_weight?: number | string;
  transit_time?: number;
  cities?: string[];
}

export interface WeightBasedRateListType {
  rates: WeightBasedRateType[];
}
