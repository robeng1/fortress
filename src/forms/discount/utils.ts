import moment from "moment"
import { DiscountType } from "typings/discount/discount-type"
import { ConditionType } from "typings/discount/condition-type"
import { BenefitType } from "typings/discount/benefit-type"
import { RangeType } from "typings/discount/range-type"
import { VoucherType } from "typings/voucher/voucher"
import { VoucherSetType } from "typings/voucher/voucherset"
import { mtos, stom as stom } from "utils/money"
import { initialValues, Values } from "./values"
import { ShopType } from "typings/settings/shop-type"
import {
  ABSOLUTE,
  PERCENTAGE,
  BUY_X_GET_Y,
  COUNT,
  COVERAGE,
  VALUE,
  VOUCHER,
  MULTIBUY,
  FIXED_PRICE,
  FREE,
  SPECIFIC_COLLECTIONS,
  SPECIFIC_PRODUCTS,
  ALL_PRODUCTS,
} from "./consts"

export const valuesToDiscount = (d: Values, shop?: ShopType): DiscountType => {
  const disc: DiscountType = {
    shop_id: shop?.shop_id || "",
    name: d.title,
    description: d.description,
    offer_type: d.type,
    short_name: "",
    max_basket_applications: d.max_basket_applications,
    max_global_applications: d.max_global_applications ?? null,
    max_user_applications: d.max_user_applications ?? null,
    page_title: d.page_title,
    page_description: d.page_description,
    start: moment(d.start_date + " " + d.start_time).toISOString(),
    end: moment(d.end_date + " " + d.end_time).toISOString(),
    discount_id: "",
    slug: "",
    group_id: "",
    exclusive: false,
    status: "Open",
    condition: null,
    benefit: null,
    priority: 0,
    max_discount: null,
    total_discount: null,
    num_applications: 0,
    num_orders: 0,
    redirect_url: "",
    image: "",
    categories: [],
    keywords: [],
    voucher: null,
    metadata: "",
    club_id: "",
  }
  if (d.discount_id) disc.discount_id = d.discount_id
  disc.max_discount = stom(d.max_discount, shop?.currency?.iso_code)
  switch (d.incentive_type) {
    case ABSOLUTE: {
      const condition: ConditionType = {
        condition_type: d.condition_type,
      }
      if (d.condition_type === COVERAGE || d.condition_type === COUNT) {
        condition.value = d.condition_value
      } else if (d.condition_type === VALUE) {
        condition.amount = stom(d.condition_amount, shop?.currency?.iso_code)
      } else {
        condition.value = 0
        condition.amount = stom(0.0, shop?.currency?.iso_code)
      }
      disc.condition = condition

      // benefit construction
      const benefit: BenefitType = {
        benefit_type: d.incentive_type,
        amount: stom(d.value, shop?.currency?.iso_code),
      }
      const benefitRange: RangeType = {
        includes_all_products: d.applies_to === ALL_PRODUCTS,
      }
      if (d.applies_to === SPECIFIC_PRODUCTS) {
        benefitRange.included_products = d.included_products
      }
      if (d.applies_to === SPECIFIC_COLLECTIONS) {
        benefitRange.included_collections = d.included_collections
      }
      benefit.collection = benefitRange
      disc.benefit = benefit
      break
    }
    case PERCENTAGE: {
      const condition: ConditionType = {
        condition_type: d.condition_type,
      }
      if (d.condition_type === COVERAGE || d.condition_type === COUNT) {
        condition.value = d.condition_value
      } else if (d.condition_type === VALUE) {
        condition.amount = stom(d.condition_amount, shop?.currency?.iso_code)
      } else {
        condition.value = 0
        condition.amount = stom(0.0, shop?.currency?.iso_code)
      }
      disc.condition = condition

      // benefit construction
      const benefit: BenefitType = {
        benefit_type: d.incentive_type,
        value: Number.parseInt(d.value as string),
      }
      const benefitRange: RangeType = {
        includes_all_products: d.applies_to === ALL_PRODUCTS,
      }
      if (d.applies_to === SPECIFIC_PRODUCTS) {
        benefitRange.included_products = d.included_products
      }
      if (d.applies_to === SPECIFIC_COLLECTIONS) {
        benefitRange.included_collections = d.included_collections
      }
      benefit.collection = benefitRange
      disc.benefit = benefit
      break
    }
    case MULTIBUY:
      const condition: ConditionType = {
        condition_type: d.condition_type,
      }
      if (d.condition_type === COVERAGE || d.condition_type === COUNT) {
        condition.value = d.condition_value
      } else if (d.condition_type === VALUE) {
        condition.amount = stom(d.condition_amount, shop?.currency?.iso_code)
      } else {
        condition.value = 0
        condition.amount = stom(0.0, shop?.currency?.iso_code)
      }
      disc.condition = condition

      // Multibuy does not require a value and max_affected_items
      const benefit: BenefitType = {
        benefit_type: d.incentive_type,
      }
      const benRange: RangeType = {
        includes_all_products: d.applies_to === ALL_PRODUCTS,
      }
      if (d.applies_to === SPECIFIC_PRODUCTS) {
        benRange.included_products = d.included_products
      }
      if (d.applies_to === SPECIFIC_COLLECTIONS) {
        benRange.included_collections = d.included_collections
      }
      benefit.collection = benRange
      disc.benefit = benefit
      break
    case FIXED_PRICE: {
      const condition: ConditionType = {
        condition_type: d.condition_type,
      }
      if (d.condition_type === COVERAGE || d.condition_type === COUNT) {
        condition.value = d.condition_value
      } else if (d.condition_type === VALUE) {
        condition.amount = stom(d.condition_amount, shop?.currency?.iso_code)
      } else {
        condition.value = 0
        condition.amount = stom(0.0, shop?.currency?.iso_code)
      }
      disc.condition = condition

      // benefit construction
      const benefit: BenefitType = {
        benefit_type: d.incentive_type,
        amount: stom(d.value, shop?.currency?.iso_code),
      }
      const benRange: RangeType = {
        includes_all_products: d.applies_to === ALL_PRODUCTS,
      }
      if (d.applies_to === SPECIFIC_PRODUCTS) {
        benRange.included_products = d.included_products
      }
      if (d.applies_to === SPECIFIC_COLLECTIONS) {
        benRange.included_collections = d.included_collections
      }
      benefit.collection = benRange
      disc.benefit = benefit
      break
    }
    case BUY_X_GET_Y: {
      const condition: ConditionType = {
        condition_type: d.buy_x_get_y_condition_type,
      }
      if (
        d.buy_x_get_y_condition_type === COVERAGE ||
        d.buy_x_get_y_condition_type === COUNT
      ) {
        condition.value =
          typeof d.buy_x_get_y_condition_value == "string"
            ? Number.parseInt(d.buy_x_get_y_condition_value)
            : d.buy_x_get_y_condition_value
      } else if (d.buy_x_get_y_condition_type === VALUE) {
        condition.amount = stom(
          d.buy_x_get_y_condition_value,
          shop?.currency?.iso_code
        )
      } else {
        condition.value = 0
        condition.amount = stom(0.0, shop?.currency?.iso_code)
      }
      const conditionRange: RangeType = {
        includes_all_products: false,
      }
      if (d.buy_x_get_y_condition_range_type === SPECIFIC_PRODUCTS) {
        conditionRange.included_products = d.buy_x_get_y_condition_range_keys
      }
      if (d.buy_x_get_y_condition_range_type === SPECIFIC_COLLECTIONS) {
        conditionRange.included_collections = d.buy_x_get_y_condition_range_keys
      }
      // assign range to condition
      condition.collection = conditionRange
      // assign condition to discount
      disc.condition = condition

      // benefit construction
      const benefit: BenefitType = {
        benefit_type: d.buy_x_get_y_discounted_value_type,
      }
      if (d.buy_x_get_y_discounted_value_type === ABSOLUTE) {
        benefit.amount = stom(
          d.buy_x_get_y_discounted_value,
          shop?.currency?.iso_code
        )
      } else if (d.buy_x_get_y_discounted_value_type === PERCENTAGE) {
        benefit.value = Number.parseInt(d.buy_x_get_y_discounted_value)
      } else if (d.buy_x_get_y_discounted_value_type === FREE) {
        benefit.benefit_type = PERCENTAGE
        benefit.value = 100
      }

      benefit.max_affected_items = d.buy_x_get_y_ben_max_affected_items

      // range
      const benefitRange: RangeType = {
        includes_all_products: d.buy_x_get_y_ben_range_type === ALL_PRODUCTS,
      }
      if (d.buy_x_get_y_ben_range_type === SPECIFIC_PRODUCTS) {
        benefitRange.included_products = d.buy_x_get_y_ben_range_keys
      }
      if (d.buy_x_get_y_ben_range_type === SPECIFIC_COLLECTIONS) {
        benefitRange.included_collections = d.buy_x_get_y_ben_range_keys
      }
      // assign range to benefit
      benefit.collection = benefitRange

      // assign benefit to discount
      disc.benefit = benefit
      break
    }
    default: {
      // wierd like how did we get here?
    }
  }
  // if (d.type === VOUCHER) {
  //   if (d.code_type === 'single') {
  //     const voucher: VoucherType = {
  //       voucher_id: '',
  //       code: d.code,
  //       shop_id: shop?.shop_id,
  //       discount_id: d.discount_id,
  //       usage: d.code_usage,
  //     };
  //     disc.vouchers = [voucher];
  //   } else if (d.code_type === 'set') {
  //     const voucherSet: VoucherSetType = {
  //       set_id: '',
  //       shop_id: shop?.shop_id,
  //       usage: d.code_usage,
  //       discount_id: d.discount_id,
  //       code_length: d.code_length,
  //       count: d.number_of_codes,
  //     };
  //     disc.voucher_sets = [voucherSet];
  //   }
  // }
  return disc
}

export const discountToValues = (d?: DiscountType, shop?: ShopType): Values => {
  if (!d) {
    return initialValues
  }
  const disc: Values = {
    ...initialValues,
    discount_id: d.discount_id,
    title: d.name || initialValues.title,
    description: d.description || initialValues.description,
    type: d.offer_type || initialValues.type,
    max_basket_applications: d.max_basket_applications || 1,
    max_global_applications: d.max_global_applications ?? undefined,
    max_user_applications: d.max_user_applications ?? undefined,
    has_max_user_applications: !!d.max_user_applications,
    has_max_discount: !!d.max_discount,
    has_max_global_applications: !!d.max_global_applications,
    page_title: d.page_title || initialValues.page_title,
    page_description: d.page_description || initialValues.page_description,
    start_date: moment(d.start).format("YYYY-MM-DD"),
    start_time: moment(d.start).format("HH:mm:ss"),
    end_date: moment(d.end).format("YYYY-MM-DD"),
    end_time: moment(d.end).format("HH:mm:ss"),
  }
  if (
    (d.benefit?.benefit_type === ABSOLUTE ||
      d.benefit?.benefit_type === FIXED_PRICE ||
      d.benefit?.benefit_type === MULTIBUY ||
      d.benefit?.benefit_type === PERCENTAGE) &&
    !isBxGy(d)
  ) {
    // condition deconstruction
    disc.condition_type =
      d.condition?.condition_type || initialValues.condition_type
    if (
      d.condition?.condition_type === COVERAGE ||
      d.condition?.condition_type === COUNT
    ) {
      disc.condition_value = d.condition.value || initialValues.condition_value
    } else if (d.condition?.condition_type === VALUE) {
      // will be quite weird that these values would not exist
      // at the time when they are needed
      // d.condition.money_value
      disc.condition_amount = mtos(d.condition.amount!)
    } else {
      // TODO:(romeo) remove this block as it's weird as we should NEVER! reach here
    }
    // benefit deconstruction
    if (d.benefit) {
      disc.incentive_type =
        d.benefit.benefit_type || initialValues.incentive_type
      disc.applies_to = d.benefit.collection?.includes_all_products
        ? ALL_PRODUCTS
        : ""
      if (
        d.benefit.collection &&
        d.benefit.collection?.included_collections &&
        d.benefit.collection?.included_collections?.length > 0
      ) {
        disc.applies_to = SPECIFIC_COLLECTIONS
        disc.included_collections = d.benefit.collection?.included_collections
      } else if (
        d.benefit.collection &&
        d.benefit.collection?.included_products &&
        d.benefit.collection?.included_products?.length > 0
      ) {
        disc.applies_to = SPECIFIC_PRODUCTS
        disc.included_products = d.benefit.collection?.included_products
      }
      if (d.benefit.amount) {
        disc.value = mtos(d.benefit.amount)
      } else if (d.benefit.value) {
        disc.value = d.benefit.value
      }
    }
  } else {
    disc.incentive_type = BUY_X_GET_Y
    if (d.condition) {
      disc.buy_x_get_y_condition_type =
        d.condition?.condition_type || initialValues.buy_x_get_y_condition_type
      if (
        d.condition?.condition_type === COVERAGE ||
        d.condition?.condition_type === COUNT
      ) {
        disc.buy_x_get_y_condition_value =
          d.condition.value || initialValues.buy_x_get_y_condition_value
      } else if (d.condition?.condition_type === VALUE) {
        // will be quite weird that these values would not exist
        // at the time when they are needed
        disc.buy_x_get_y_condition_value = mtos(d.condition.amount)
      } else {
        // TODO:(romeo)  remove this block as it's weird as we should NEVER! reach here
      }
      // deconstructing the condition range
      disc.buy_x_get_y_condition_range_type = d.condition.collection
        ?.includes_all_products
        ? ALL_PRODUCTS
        : ""
      if (
        d.condition.collection &&
        d.condition.collection?.included_collections &&
        d.condition.collection?.included_collections?.length > 0
      ) {
        disc.buy_x_get_y_condition_range_type = SPECIFIC_COLLECTIONS
        disc.buy_x_get_y_condition_range_keys =
          d.condition.collection?.included_collections ||
          initialValues.buy_x_get_y_condition_range_keys
      } else if (
        d.condition.collection &&
        d.condition.collection?.included_products &&
        d.condition.collection?.included_products?.length > 0
      ) {
        disc.buy_x_get_y_condition_range_type = SPECIFIC_PRODUCTS
        disc.buy_x_get_y_condition_range_keys =
          d.condition.collection?.included_products ||
          initialValues.buy_x_get_y_condition_range_keys
      }
    }

    // benefit deconstruction
    if (d.benefit) {
      disc.buy_x_get_y_discounted_value_type =
        d.benefit.benefit_type ||
        initialValues.buy_x_get_y_discounted_value_type

      // deconstructing the benefit range
      disc.buy_x_get_y_ben_range_type = d.benefit.collection
        ?.includes_all_products
        ? ALL_PRODUCTS
        : ""
      if (
        d.benefit.collection &&
        d.benefit.collection?.included_collections &&
        d.benefit.collection?.included_collections?.length > 0
      ) {
        disc.buy_x_get_y_ben_range_type = SPECIFIC_COLLECTIONS
        disc.buy_x_get_y_ben_range_keys =
          d.benefit.collection?.included_collections
      } else if (
        d.benefit.collection &&
        d.benefit.collection?.included_products &&
        d.benefit.collection?.included_products?.length > 0
      ) {
        disc.buy_x_get_y_ben_range_type = SPECIFIC_PRODUCTS
        disc.buy_x_get_y_ben_range_keys =
          d.benefit.collection?.included_products
      }
      if (d.benefit.amount) {
        disc.buy_x_get_y_discounted_value = mtos(d.benefit.amount)
      } else if (d.benefit.value) {
        disc.buy_x_get_y_discounted_value = d.benefit.value as string
      }
      disc.buy_x_get_y_ben_max_affected_items =
        d.benefit.max_affected_items ||
        initialValues.buy_x_get_y_ben_max_affected_items
    }
  }
  disc.max_discount = mtos(d.max_discount)
  return disc
}

const isBxGy = (d: DiscountType): boolean => {
  return !!d && !!d.condition && !!d.condition.collection
}
