import { MoneyType } from "../money"

export interface WeightBandType {
  upper_limit?: number | string
  charge?: MoneyType | null
}
