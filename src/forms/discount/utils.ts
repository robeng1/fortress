import moment from 'moment';
import { DiscountType } from 'typings/discount/discount-type';
import { ConditionType } from 'typings/discount/condition-type';
import { BenefitType } from 'typings/discount/benefit-type';
import { RangeType } from 'typings/discount/range-type';
import { VoucherType } from 'typings/voucher/voucher';
import { VoucherSetType } from 'typings/voucher/voucherset';
import { mToS, sToM } from 'utils/money';
import { initialValues, Values } from './values';
import { ShopType } from 'typings/settings/shop-type';

export const valuesToDiscount = (d: Values, shop?: ShopType): DiscountType => {
  const disc: DiscountType = {
    shop_id: shop?.shop_id || '',
    name: d.title,
    description: d.description,
    offer_type: d.type,
    max_basket_applications: d.max_basket_applications,
    max_global_applications: d.max_global_applications,
    max_user_applications: d.max_user_applications,
    page_title: d.page_title,
    page_description: d.page_description,
    start: moment(d.start_date + ' ' + d.start_time).toISOString(),
    end: moment(d.end_date + ' ' + d.end_time).toISOString(),
    // image: { image_url: image },
  };
  if (d.discount_id) disc.discount_id = d.discount_id;
  disc.max_discount = sToM(d.max_discount, shop?.currency?.iso_code);
  switch (d.incentive_type) {
    case 'fixed_discount': {
      const condition: ConditionType = {
        condition_type: d.condition_type,
      };
      if (d.condition_type === 'coverage' || d.condition_type === 'count') {
        condition.value_int = d.condition_value_int;
      } else if (d.condition_type === 'value') {
        condition.money_value = sToM(
          d.condition_value_money,
          shop?.currency?.iso_code,
        );
      } else {
        condition.value_int = 0;
        condition.money_value = sToM(0.0, shop?.currency?.iso_code);
      }
      disc.condition = condition;

      // benefit construction
      const benefit: BenefitType = {
        benefit_type: d.incentive_type,
        value_m: sToM(d.value, shop?.currency?.iso_code),
      };
      const benRange: RangeType = {
        includes_all_products: d.applies_to === 'all_products',
      };
      if (d.applies_to === 'specific_products') {
        benRange.included_products = d.included_products;
      }
      if (d.applies_to === 'specific_collections') {
        benRange.included_collections = d.included_collections;
      }
      benefit.collection = benRange;
      disc.benefit = benefit;
      break;
    }
    case 'percentage': {
      const condition: ConditionType = {
        condition_type: d.condition_type,
      };
      if (d.condition_type === 'coverage' || d.condition_type === 'count') {
        condition.value_int = d.condition_value_int;
      } else if (d.condition_type === 'value') {
        condition.money_value = sToM(
          d.condition_value_money,
          shop?.currency?.iso_code,
        );
      } else {
        condition.value_int = 0;
        condition.money_value = sToM(0.0, shop?.currency?.iso_code);
      }
      disc.condition = condition;

      // benefit construction
      const benefit: BenefitType = {
        benefit_type: d.incentive_type,
        value_i: parseInt(d.value as string),
      };
      const benRange: RangeType = {
        includes_all_products: d.applies_to === 'all_products',
      };
      if (d.applies_to === 'specific_products') {
        benRange.included_products = d.included_products;
      }
      if (d.applies_to === 'specific_collections') {
        benRange.included_collections = d.included_collections;
      }
      benefit.collection = benRange;
      disc.benefit = benefit;
      break;
    }
    case 'multibuy':
      const condition: ConditionType = {
        condition_type: d.condition_type,
      };
      if (d.condition_type === 'coverage' || d.condition_type === 'count') {
        condition.value_int = d.condition_value_int;
      } else if (d.condition_type === 'value') {
        condition.money_value = sToM(
          d.condition_value_money,
          shop?.currency?.iso_code,
        );
      } else {
        condition.value_int = 0;
        condition.money_value = sToM(0.0, shop?.currency?.iso_code);
      }
      disc.condition = condition;

      // Multibuy does not require a value and max_affected_items
      const benefit: BenefitType = {
        benefit_type: d.incentive_type,
      };
      const benRange: RangeType = {
        includes_all_products: d.applies_to === 'all_products',
      };
      if (d.applies_to === 'specific_products') {
        benRange.included_products = d.included_products;
      }
      if (d.applies_to === 'specific_collections') {
        benRange.included_collections = d.included_collections;
      }
      benefit.collection = benRange;
      disc.benefit = benefit;
      break;
    case 'fixed_price': {
      const condition: ConditionType = {
        condition_type: d.condition_type,
      };
      if (d.condition_type === 'coverage' || d.condition_type === 'count') {
        condition.value_int = d.condition_value_int;
      } else if (d.condition_type === 'value') {
        condition.money_value = sToM(
          d.condition_value_money,
          shop?.currency?.iso_code,
        );
      } else {
        condition.value_int = 0;
        condition.money_value = sToM(0.0, shop?.currency?.iso_code);
      }
      disc.condition = condition;

      // benefit construction
      const benefit: BenefitType = {
        benefit_type: d.incentive_type,
        value_m: sToM(d.value, shop?.currency?.iso_code),
      };
      const benRange: RangeType = {
        includes_all_products: d.applies_to === 'all_products',
      };
      if (d.applies_to === 'specific_products') {
        benRange.included_products = d.included_products;
      }
      if (d.applies_to === 'specific_collections') {
        benRange.included_collections = d.included_collections;
      }
      benefit.collection = benRange;
      disc.benefit = benefit;
      break;
    }
    case 'buy-x-get-y': {
      const condition: ConditionType = {
        condition_type: d.buy_x_get_y_condition_type,
      };
      if (
        d.buy_x_get_y_condition_type === 'coverage' ||
        d.buy_x_get_y_condition_type === 'count'
      ) {
        condition.value_int = d.buy_x_get_y_condition_value as number;
      } else if (d.buy_x_get_y_condition_type === 'value') {
        condition.money_value = sToM(
          d.buy_x_get_y_condition_value,
          shop?.currency?.iso_code,
        );
      } else {
        condition.value_int = 0;
        condition.money_value = sToM(0.0, shop?.currency?.iso_code);
      }
      const condRange: RangeType = {
        includes_all_products: false,
      };
      if (d.buy_x_get_y_condition_range_type === 'specific_products') {
        condRange.included_products = d.buy_x_get_y_condition_range_keys;
      }
      if (d.buy_x_get_y_condition_range_type === 'specific_collections') {
        condRange.included_collections = d.buy_x_get_y_condition_range_keys;
      }
      // assign range to condition
      condition.collection = condRange;
      // assign condition to discount
      disc.condition = condition;

      // benefit construction
      const benefit: BenefitType = {
        benefit_type: d.buy_x_get_y_discounted_value_type,
      };
      if (d.buy_x_get_y_discounted_value_type === 'fixed_discount') {
        benefit.value_m = sToM(
          d.buy_x_get_y_discounted_value,
          shop?.currency?.iso_code,
        );
      } else if (d.buy_x_get_y_discounted_value_type === 'percentage') {
        benefit.value_i = parseInt(d.buy_x_get_y_discounted_value);
      } else if (d.buy_x_get_y_discounted_value_type === 'free') {
        benefit.benefit_type = 'percentage';
        benefit.value_i = 100;
      }

      benefit.max_affected_items = d.buy_x_get_y_ben_max_affected_items;

      // range
      const benRange: RangeType = {
        includes_all_products: d.buy_x_get_y_ben_range_type === 'all_products',
      };
      if (d.buy_x_get_y_ben_range_type === 'specific_products') {
        benRange.included_products = d.buy_x_get_y_ben_range_keys;
      }
      if (d.buy_x_get_y_ben_range_type === 'specific_collections') {
        benRange.included_collections = d.buy_x_get_y_ben_range_keys;
      }
      // assign range to benefit
      benefit.collection = benRange;

      // assign benefit to discount
      disc.benefit = benefit;
      break;
    }
    default: {
      // wierd like how did we get here?
    }
  }
  if (d.type === 'voucher') {
    if (d.code_type === 'single') {
      const voucher: VoucherType = {
        voucher_id: '',
        code: d.code,
        shop_id: shop?.shop_id,
        discount_id: d.discount_id,
        usage: d.code_usage,
      };
      disc.vouchers = [voucher];
    } else if (d.code_type === 'set') {
      const voucherSet: VoucherSetType = {
        set_id: '',
        shop_id: shop?.shop_id,
        usage: d.code_usage,
        discount_id: d.discount_id,
        code_length: d.code_length,
        count: d.number_of_codes,
      };
      disc.voucher_sets = [voucherSet];
    }
  }
  return disc;
};

export const handleSelectedResults =
  (
    setFieldValue: (f: string, v: any, sv?: boolean | undefined) => void,
    field: string,
  ) =>
  (selectedResults: unknown[]) => {
    setFieldValue(field, [...selectedResults]);
  };
