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
import { ABSOLUTE, PERCENTAGE, BUY_X_GET_Y, COUNT, COVERAGE, VALUE, VOUCHER, MULTIBUY, FIXED_PRICE, FREE } from './consts';

export const valuesToDiscount = (d: Values, shop?: ShopType): DiscountType => {
  const disc: DiscountType = {
    shop_id: shop?.shop_id || '',
    name: d.title,
    description: d.description,
    offer_type: d.type,
    short_name: '',
    max_basket_applications: d.max_basket_applications,
    max_global_applications: d.max_global_applications ?? null,
    max_user_applications: d.max_user_applications ?? null,
    page_title: d.page_title,
    page_description: d.page_description,
    start: moment(d.start_date + ' ' + d.start_time).toISOString(),
    end: moment(d.end_date + ' ' + d.end_time).toISOString(),
    discount_id: '',
    slug: '',
    group_id: '',
    exclusive: false,
    status: '',
    condition: null,
    benefit: null,
    priority: 0,
    max_discount: null,
    total_discount: null,
    num_applications: 0,
    num_orders: 0,
    redirect_url: '',
    created_at: '',
    image: '',
    categories: [],
    keywords: [],
    voucher: null,
    deleted_at: '',
    metadata: '',
    club_id: ''
  };
  if (d.discount_id) disc.discount_id = d.discount_id;
  disc.max_discount = sToM(d.max_discount, shop?.currency?.iso_code);
  switch (d.incentive_type) {
    case ABSOLUTE: {
      const condition: ConditionType = {
        condition_type: d.condition_type,
      };
      if (d.condition_type === COVERAGE || d.condition_type === COUNT) {
        condition.value_int = d.condition_value_int;
      } else if (d.condition_type === VALUE) {
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
    case PERCENTAGE: {
      const condition: ConditionType = {
        condition_type: d.condition_type,
      };
      if (d.condition_type === COVERAGE || d.condition_type === COUNT) {
        condition.value_int = d.condition_value_int;
      } else if (d.condition_type === VALUE) {
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
    case MULTIBUY:
      const condition: ConditionType = {
        condition_type: d.condition_type,
      };
      if (d.condition_type === COVERAGE || d.condition_type === COUNT) {
        condition.value_int = d.condition_value_int;
      } else if (d.condition_type === VALUE) {
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
    case FIXED_PRICE: {
      const condition: ConditionType = {
        condition_type: d.condition_type,
      };
      if (d.condition_type === COVERAGE || d.condition_type === COUNT) {
        condition.value_int = d.condition_value_int;
      } else if (d.condition_type === VALUE) {
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
    case BUY_X_GET_Y: {
      const condition: ConditionType = {
        condition_type: d.buy_x_get_y_condition_type,
      };
      if (
        d.buy_x_get_y_condition_type === COVERAGE ||
        d.buy_x_get_y_condition_type === COUNT
      ) {
        condition.value_int = d.buy_x_get_y_condition_value as number;
      } else if (d.buy_x_get_y_condition_type === VALUE) {
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
      if (d.buy_x_get_y_discounted_value_type === ABSOLUTE) {
        benefit.value_m = sToM(
          d.buy_x_get_y_discounted_value,
          shop?.currency?.iso_code,
        );
      } else if (d.buy_x_get_y_discounted_value_type === PERCENTAGE) {
        benefit.value_i = Number.parseInt(d.buy_x_get_y_discounted_value);
      } else if (d.buy_x_get_y_discounted_value_type === FREE) {
        benefit.benefit_type = PERCENTAGE;
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
  if (d.type === VOUCHER) {
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
