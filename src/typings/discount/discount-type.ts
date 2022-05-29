import { MoneyType } from "../money"
import { VoucherType } from "../voucher/voucher"
import { VoucherSetType } from "../voucher/voucherset"
import { BenefitType } from "./benefit-type"
import { ConditionType } from "./condition-type"

export interface DiscountType {
  shop_id: string
  discount_id: string
  name: string
  short_name: string
  slug: string
  description: string
  group_id: string
  offer_type: string
  exclusive: boolean
  status: string
  condition: ConditionType | null
  benefit: BenefitType | null
  priority: number
  start: string
  end: string
  max_global_applications: number | null
  max_user_applications: number | null
  max_basket_applications: number
  max_discount: MoneyType | null
  total_discount: MoneyType | null
  num_applications: number
  num_orders: number
  redirect_url: string
  created_at?: string
  image: string
  categories: string[]
  keywords: string[]
  page_title: string
  page_description: string
  voucher: VoucherType | null
  deleted_at?: string
  metadata: string
  club_id: string
}

export interface DiscountListType {
  discounts?: DiscountViewType[]
  total: number
}

export interface DiscountViewType {
  shop_id: string
  discount_id: string
  name: string
  title: string
  slug: string
  image_url?: string
  type: string
  status?: string
  keywords?: string[]
  categories?: string[]
  active?: boolean
  description?: string
  start_date_time?: number
  end_date_time?: number
  created_at?: number
  updated_at?: number
  num_applications?: number
  num_orders?: number
  total_discount_int?: number
  currency?: string
  deleted?: boolean
}
