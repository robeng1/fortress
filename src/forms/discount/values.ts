import { COUNT, NONE, PERCENTAGE, SITE } from "./consts"

// TODO:(fix range keys)
export interface Values {
  discount_id: string | undefined
  title: string
  description: string
  page_title: string
  page_description: string
  // default 'site'
  type: string
  // default false
  all_products: boolean
  // default false
  specific_products: boolean
  included_products: string[]
  excluded_products: string[]
  included_collections: string[]
  incentive_type: string
  max_affected_items: number | null
  condition_value_money: string
  condition_value_int: number
  buy_x_get_y_condition_value: string | number
  buy_x_get_y_condition_range_type: string
  buy_x_get_y_condition_range_keys: string[]
  // default 'count'
  buy_x_get_y_condition_type: string
  buy_x_get_y_ben_range_type: string
  buy_x_get_y_ben_range_keys: string[]
  // default 1
  buy_x_get_y_ben_max_affected_items: number
  // default 'percentage'
  buy_x_get_y_discounted_value_type: string
  buy_x_get_y_discounted_value: string
  condition_type: string
  value: string | number
  // default 'all_products'
  applies_to: string
  exclusive: true
  customer_eligibility: string
  // default false
  has_max_global_applications: boolean
  // default false
  has_max_user_applications: boolean
  // default false
  has_max_discount: boolean
  max_basket_applications: number
  max_discount: string
  max_user_applications?: number
  max_global_applications?: number
  start_date: string
  start_time: string
  end_date: string
  end_time: string
  cover_photo: string
  // default 'single'
  code_type: string
  code: string
  code_usage: string
  code_length: number
  // default 2
  number_of_codes: number
}

export const initialValues: Values = {
  discount_id: undefined,
  title: "",
  description: "",
  page_title: "",
  page_description: "",
  type: SITE,
  all_products: false,
  specific_products: false,
  included_products: [],
  excluded_products: [],
  included_collections: [],
  incentive_type: PERCENTAGE,
  max_affected_items: null,
  buy_x_get_y_condition_value: "",
  buy_x_get_y_condition_range_type: "specific_products",
  buy_x_get_y_condition_range_keys: [],
  buy_x_get_y_condition_type: COUNT,
  buy_x_get_y_ben_range_type: "specific_products",
  buy_x_get_y_ben_range_keys: [],
  buy_x_get_y_ben_max_affected_items: 1,
  buy_x_get_y_discounted_value_type: PERCENTAGE,
  buy_x_get_y_discounted_value: "",
  condition_value_money: "",
  condition_value_int: 1,
  condition_type: NONE,
  value: "",
  applies_to: "all_products",
  exclusive: true,
  customer_eligibility: "everyone",
  has_max_global_applications: false,
  has_max_user_applications: false,
  has_max_discount: false,
  max_basket_applications: 1,
  max_discount: "",
  max_user_applications: undefined,
  max_global_applications: undefined,
  start_date: "",
  start_time: "",
  end_date: "",
  end_time: "",
  cover_photo: "",
  code_type: "single",
  code: "",
  code_usage: "",
  code_length: 6,
  number_of_codes: 2,
}
