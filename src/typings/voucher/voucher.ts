import { MoneyType } from "../money"

export type VoucherType = {
  name?: string
  code?: string
  discount_id?: string
  usage?: string
  start_datetime?: string
  end_datetime?: string
  voucher_set_id?: string
  voucher_id?: string
  shop_id?: string
  created_at?: string
  num_cart_additions?: number
  num_orders?: number
  total_discount?: MoneyType
  sid?: number
}
export interface VoucherViews {
  vouchers: VoucherType[]
  total: number
  cursor?: string
}
