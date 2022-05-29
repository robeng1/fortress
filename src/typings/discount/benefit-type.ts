import { MoneyType } from "../money"
import { RangeType } from "./range-type"

export interface BenefitType {
  benefit_type?: string
  value_m?: MoneyType | null
  value_i?: number | string
  max_affected_items?: number
  collection?: RangeType | null
}
