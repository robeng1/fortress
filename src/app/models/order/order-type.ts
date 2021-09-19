import { Template } from 'webpack';
import { MoneyType } from '../money';
import { OrderLineType } from './orderline-type';
import { UserAddressType } from './user-address-type';
export enum MethodType {
  FBS = 0,
  SR = 1,
  LR = 2,
  FBSLR = 3,
}
export enum OrderStatusType {
  ORDER_PENDING = 0,
  ORDER_RECEIVED = 1,
  ORDER_INSPECTION = 3,
  ORDER_ACCEPTED = 4,
  ORDER_PROCESSING = 5,
  ORDER_DISPATCHED = 6,
  ORDER_COMPLETED = 7,
  ORDER_ASTERISK = 8,
  ORDER_ATTENTION = 9,
  ORDER_DECLINED = 10,
  COURIER_ON_ROUTE_TO_PICK_UP = 11,
  COURIER_ON_ROUTE_TO_PICK_UP_FOR_SRC_CENTRE = 12,
  COURIER_ON_ROUTE_TO_SRC_CENTRE = 13,
  ORDER_RECEIVED_AT_SRC_CENTRE = 14,
  ORDER_DISPATCHED_FROM_SRC_CENTRE = 15,
  ORDER_RECEIVED_AT_DST_CENTRE = 16,
  ENROUTE = 17,
  READY = 18,
  AWAITING_PAYMENT = 19,
  AUTHORIZED = 20,
  PAYMENT_DECLINED = 21,
}

export enum PaymentEventType {
  DEBIT = 0,
  FAILURE = 1,
  CREDIT = 2,
  AUTHORISE = 3,
  RELEASE = 4,
  REFUND = 5,
}

export interface PaymentEvent {
  event_id?: string;
  source_id?: string;
  amount?: MoneyType | null;
  reference?: string;
  lines?: { [key: string]: number };
  type?: PaymentEventType | keyof typeof PaymentEventType;
  created_at?: string;
  shipping_event_id?: string;
  remaining?: MoneyType | null;
}

export enum ShippingEventType {
  DISPATCHED = 0,
  RETURNED = 1,
}

export interface ShippingEvent {
  event_id?: string;
  order_id?: string;
  lines?: { [key: string]: number };
  type?: ShippingEventType | keyof typeof ShippingEventType;
  notes?: string;
  created_at?: string;
}

export interface OrderDiscountType {
  category?: number;
  offer_id?: string;
  offer_name?: string;
  voucher_id?: string;
  voucher_code?: string;
  frequency?: number;
  amount?: MoneyType | null;
  message?: string;
}

export interface OrderStatusChangeType {
  old_status?: OrderStatusType | keyof typeof OrderStatusType;
  new_status?: OrderStatusType | keyof typeof OrderStatusType;
  created_at?: string;
  number?: string;
}

export interface ShopOrderType {
  guest_email?: string;
  order_id?: string;
  status?: OrderStatusType | keyof typeof OrderStatusType;
  created_at?: string;
  job_id?: string;
  total_incl_tax?: MoneyType | null;
  total_incl_tax_nanos?: number | string;
  total_excl_tax?: MoneyType | null;
  total_excl_tax_nanos?: number | string;
  shipping_incl_tax?: MoneyType | null;
  shipping_excl_tax?: MoneyType | null;
  shipping_incl_tax_nanos?: number | string;
  shipping_excl_tax_nanos?: number | string;
  user_id?: string;
  potential_earning?: MoneyType | null;
  potential_earning_nanos?: number | string;
  date_placed?: string;
  shop_id?: string;
  due_at?: string;
}

export interface ShopOrderListType {
  orders?: ShopOrderType[];
  next_page_token?: string;
}
export interface OrderType {
  number?: string;
  billing_address?: UserAddressType | null;
  account_id?: string;
  total_incl_tax?: MoneyType | null;
  total_excl_tax?: MoneyType | null;
  shipping_incl_tax?: MoneyType | null;
  shipping_excl_tax?: MoneyType | null;
  shipping_address?: UserAddressType | null;
  shipping_templates?: Template[];
  lines?: OrderLineType[];
  date_placed?: string;
  discounts?: OrderDiscountType[];
  payment_events?: PaymentEvent[];
  shipping_events?: ShippingEvent[];
  status_changes?: OrderStatusChangeType[];
  status?: OrderStatusType | keyof typeof OrderStatusType;
  guest_email?: string;
  group_id?: string;
  shipping_plan?: MethodType | keyof typeof MethodType;
  shop_id?: string;
  job_id?: string;
  basket_id?: string;
  created_at?: string;
}

export interface OrderListType {
  orders?: OrderType[];
  next_page_token?: string;
}