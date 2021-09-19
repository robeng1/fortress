import { MoneyType } from '../money';
import { RangeType } from './range-type';
export interface CompoundMetaType {
  conjunction?: string;
  sub_condition?: ConditionType[];
}
export interface ConditionType {
  condition_type?: string;
  value_int?: number;
  money_value?: MoneyType | null;
  compound_meta?: CompoundMetaType[];
  collection?: RangeType | null;
}
