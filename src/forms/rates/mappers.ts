import { ItemBasedRateType } from "typings/rates/item-based-rate"
import { WeightBasedRateType } from "typings/rates/weight-based-rate"
import { mtos, stom } from "utils/money"
import { RateType } from "./rate"

export function rateToWB(rate: RateType): WeightBasedRateType {
  return {
    shop_id: rate.shop_id,
    cities: rate.cities,
    price_per_order: stom(rate.price_per_order_amt),
    price_per_weight: stom(rate.price_per_weight_amt),
    name: rate.name,
    code: rate.name,
    description: rate.description,
  }
}

export function rateToIB(rate: RateType): ItemBasedRateType {
  return {
    shop_id: rate.shop_id,
    cities: rate.cities,
    price_per_order: stom(rate.price_per_order_amt),
    price_per_item: stom(rate.price_per_item_amt),
    name: rate.name,
    code: rate.name,
    description: rate.description,
  }
}

export function rawToRate(
  rate: ItemBasedRateType & WeightBasedRateType
): RateType {
  return {
    shop_id: rate?.shop_id || "",
    cities: rate?.cities ?? [],
    price_per_order_amt: mtos(rate?.price_per_order),
    price_per_item_amt: mtos(rate?.price_per_item),
    price_per_weight_amt: mtos(rate?.price_per_weight),
    name: rate?.name || "",
    free_shipping_threshold: mtos(rate?.free_shipping_threshold),
    description: rate?.description || "",
    model:
      rate && "price_per_item" in rate
        ? {
            label: "Item Based",
            value: "ITEM_BASED",
          }
        : {
            label: "Weight Based",
            value: "WEIGHT_BASED",
          },
  }
}
