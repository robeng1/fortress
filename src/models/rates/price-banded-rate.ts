import { PriceBandType } from './price-band-type';

export interface PriceBandedRateType {
  shop_id?: string;
  rate_id?: string;
  code?: string;
  name?: string;
  description?: string;
  is_discounted?: boolean;
  bands?: PriceBandType[];
  transit_time?: number;
  cities?: string[];
}
