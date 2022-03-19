import { LatLng } from '../coordinate';
import { MoneyType } from '../money';

export interface StockType {
  shop_id?: string;
  stock_id?: string;
  product_id?: string;
  net_stock_level?: number;
  price_excl_tax?: MoneyType | null;
  price_incl_tax?: MoneyType | null;
}

export interface OrderProductType {
  shop_id?: string;
  product_id?: string;
  image?: string;
  title?: string;
  requires_shipping?: boolean;
  is_discountable?: boolean;
  track_stock?: boolean;
  upc?: string;
  centre_id?: string;
  variant_id?: string;
}

export enum LineStatusType {
  LINE_PENDING = 0,
  LINE_RECEIVED = 1,
  LINE_INSPECTION = 3,
  LINE_ACCEPTED = 4,
  LINE_PROCESSING = 5,
  LINE_DISPATCHED = 6,
  LINE_COMPLETED = 7,
  LINE_ASTERISK = 8,
  LINE_ATTENTION = 9,
  LINE_DECLINED = 10,
  LINE_ENROUTE = 11,
}
export interface LineOptionType {
  option?: string;
  value?: string;
  type?: string;
}

export interface LinePriceType {
  quantity?: number;
  price_incl_tax?: MoneyType | null;
  price_excl_tax?: MoneyType | null;
  shipping_incl_tax?: MoneyType | null;
  shipping_excl_tax?: MoneyType | null;
}

export interface LineStatusChangeType {
  old_status?: LineStatusType | keyof typeof LineStatusType;
  new_status?: LineStatusType | keyof typeof LineStatusType;
  created_at?: string;
  number?: string;
  line_id?: string;
}

export enum TemplateType {
  STP = 0,
  STC = 2,
  PTC = 3,
  PTP = 4,
}
export enum ParcelSizeType {
  BIG = 0,
  MEDIUM = 1,
  SMALL = 2,
}

export interface TemplateTyppe {
  shop_id?: string;
  rate_id?: string;
  name?: string;
  code?: string;
  transit_time?: number;
  description?: string;
  model?: string;
  charge_excl_tax?: MoneyType | null;
  charge_incl_tax?: MoneyType | null;
  agg_point_name?: string;
  agg_point_location_name?: string;
  agg_point_location?: LatLng | null;
  ldf_name?: string;
  ldf_id?: string;
  type?: TemplateType | keyof typeof TemplateType;
  weight?: number | string;
  size?: ParcelSizeType | keyof typeof ParcelSizeType;
}
export interface OrderLineType {
  line_id?: string;
  order_id?: string;
  centre_id?: string;
  centre_name?: string;
  centre_sku?: string;
  centre_line_reference?: string;
  stock?: StockType | null;
  product?: OrderProductType;
  quantity?: number;
  line_price_excl_tax: MoneyType;
  line_price_incl_tax: MoneyType;
  unit_price_excl_tax: MoneyType;
  unit_price_incl_tax: MoneyType;
  centre_status?: LineStatusType | keyof typeof LineStatusType;
  options?: LineOptionType[];
  prices?: LinePriceType[];
  line_price_before_discounts_incl_tax?: MoneyType | null;
  line_price_before_discounts_excl_tax?: MoneyType | null;
  status?: LineStatusType | keyof typeof LineStatusType;
  status_changes?: LineStatusChangeType[];
  shipping_template?: TemplateTyppe | null;
}
