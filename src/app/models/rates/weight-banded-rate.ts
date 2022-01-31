import { WeightBandType } from './weight-band';

export interface WeightBandedRateType {
  shop_id?: string;
  rate_id?: string;
  code?: string;
  name?: string;
  description?: string;
  is_discounted?: boolean;
  bands?: WeightBandType[];
  default_weight?: number | string;
  transit_time?: number;
  cities?: string[];
}
