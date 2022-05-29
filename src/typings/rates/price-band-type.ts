import { MoneyType } from "../money"

export interface PriceBandType {
  upper_limit?: MoneyType | null
  charge?: MoneyType | null
}
