import { MoneyType } from "../money"
import { RangeType } from "./range-type"

export interface BenefitType {
  benefit_type?: string
  amount?: MoneyType | null
  value?: number | string
  max_affected_items?: number
  collection?: RangeType | null
}
