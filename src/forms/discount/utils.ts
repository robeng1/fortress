import moment from 'moment';
import { DiscountType } from 'models/discount/discount-type';
import { ConditionType } from 'models/discount/condition-type';
import { BenefitType } from 'models/discount/benefit-type';
import { RangeType } from 'models/discount/range-type';
import { VoucherType } from 'models/voucher/voucher';
import { VoucherSetType } from 'models/voucher/voucherset';
import { mToS, sToM } from 'utils/money';
import { initialValues, Values } from './values';
import { ShopType } from 'models/settings/shop-type';

export const discountToValues = (d: DiscountType | undefined): Values => {
  if (!d) {
    return initialValues;
  }
  const disc: Values = {
    ...initialValues,
    discount_id: d.discount_id,
    title: d.name || initialValues.title,
    description: d.description || initialValues.description,
    type: d.offer_type || initialValues.type,
    max_basket_applications: d.max_basket_applications || 1,
    max_global_applications: d.max_global_applications,
    max_user_applications: d.max_user_applications,
    page_title: d.page_title || initialValues.page_title,
    page_description: d.page_description || initialValues.page_description,
    start_date: moment(d.start).format('YYYY-MM-DD'),
    start_time: moment(d.start).format('HH:mm:ss'),
    end_date: moment(d.end).format('YYYY-MM-DD'),
    end_time: moment(d.end).format('HH:mm:ss'),
  };
  if (
    d.benefit?.benefit_type === 'fixed_discount' ||
    d.benefit?.benefit_type === 'fixed_price' ||
    d.benefit?.benefit_type === 'multibuy' ||
    d.benefit?.benefit_type === 'percentage'
  ) {
    // condition deconstruction
    disc.condition_type =
      d.condition?.condition_type || initialValues.condition_type;
    if (
      d.condition?.condition_type === 'coverage' ||
      d.condition?.condition_type === 'count'
    ) {
      disc.condition_value_int =
        d.condition.value_int || initialValues.condition_value_int;
    } else if (d.condition?.condition_type === 'value') {
      // will be quite weird that these values would not exist
      // at the time when they are needed
      // d.condition.money_value
      disc.condition_value_money = mToS(d.condition.money_value!);
    } else {
      // TODO:(romeo) remove this block as it's weird as we should NEVER! reach here
    }

    // benefit deconstruction
    if (d.benefit) {
      disc.incentive_type =
        d.benefit.benefit_type || initialValues.incentive_type;
      disc.applies_to = d.benefit.collection?.includes_all_products
        ? 'all_products'
        : '';
      if (
        d.benefit.collection &&
        d.benefit.collection?.included_collections &&
        d.benefit.collection?.included_collections?.length > 0
      ) {
        disc.applies_to = 'specific_collections';
        disc.included_collections = d.benefit.collection?.included_collections;
        // setIncludedCollectionKeys(disc.included_collections || []);
      } else if (
        d.benefit.collection &&
        d.benefit.collection?.included_products &&
        d.benefit.collection?.included_products?.length > 0
      ) {
        disc.applies_to = 'specific_products';
        disc.included_products = d.benefit.collection?.included_products;
        // setIncludedProductKeys(disc.included_products || []);
      }
      if (d.benefit.value_m) {
        disc.value = mToS(d.benefit.value_m);
      } else if (d.benefit.value_i) {
        disc.value = d.benefit.value_i;
      }
    }
  } else {
    // deconstructing buy-x-get-y
    if (d.condition) {
      disc.buy_x_get_y_condition_type =
        d.condition?.condition_type || initialValues.buy_x_get_y_condition_type;
      if (
        d.condition?.condition_type === 'coverage' ||
        d.condition?.condition_type === 'count'
      ) {
        disc.buy_x_get_y_condition_value =
          d.condition.value_int || initialValues.buy_x_get_y_condition_value;
      } else if (d.condition?.condition_type === 'value') {
        // will be quite weird that these values would not exist
        // at the time when they are needed
        disc.buy_x_get_y_condition_value = mToS(d.condition.money_value);
      } else {
        // TODO:(romeo)  remove this block as it's weird as we should NEVER! reach here
      }
      // deconstructing the condition range
      disc.buy_x_get_y_condition_range_type = d.condition.collection
        ?.includes_all_products
        ? 'all_products'
        : '';
      if (
        d.condition.collection &&
        d.condition.collection?.included_collections &&
        d.condition.collection?.included_collections?.length > 0
      ) {
        disc.buy_x_get_y_condition_range_type = 'specific_collections';
        disc.buy_x_get_y_condition_range_keys =
          d.condition.collection?.included_collections ||
          initialValues.buy_x_get_y_condition_range_keys;
        // setBuyXGetYConditionIncludedCollectionKeys(
        //   disc.buy_x_get_y_condition_range_keys,
        // );
      } else if (
        d.condition.collection &&
        d.condition.collection?.included_products &&
        d.condition.collection?.included_products?.length > 0
      ) {
        disc.buy_x_get_y_condition_range_type = 'specific_products';
        disc.buy_x_get_y_condition_range_keys =
          d.condition.collection?.included_products ||
          initialValues.buy_x_get_y_condition_range_keys;
        // setBuyXGetYConditionIncludedProductKeys(
        //   disc.buy_x_get_y_condition_range_keys,
        // );
      }
    }

    // benefit deconstruction
    if (d.benefit) {
      disc.buy_x_get_y_discounted_value_type =
        d.benefit.benefit_type ||
        initialValues.buy_x_get_y_discounted_value_type;

      // deconstructing the benefit range
      disc.buy_x_get_y_ben_range_type = d.benefit.collection
        ?.includes_all_products
        ? 'all_products'
        : '';
      if (
        d.benefit.collection &&
        d.benefit.collection?.included_collections &&
        d.benefit.collection?.included_collections?.length > 0
      ) {
        disc.buy_x_get_y_ben_range_type = 'specific_collections';
        disc.buy_x_get_y_ben_range_keys =
          d.benefit.collection?.included_collections;
        // setBuyXGetYBenefitIncludedCollectionKeys(
        //   disc.buy_x_get_y_ben_range_keys,
        // );
      } else if (
        d.benefit.collection &&
        d.benefit.collection?.included_products &&
        d.benefit.collection?.included_products?.length > 0
      ) {
        disc.buy_x_get_y_ben_range_type = 'specific_products';
        disc.buy_x_get_y_ben_range_keys =
          d.benefit.collection?.included_products;
        // setBuyXGetYBenefitIncludedProductKeys(disc.buy_x_get_y_ben_range_keys);
      }
      if (d.benefit.value_m) {
        disc.buy_x_get_y_discounted_value = mToS(d.benefit.value_m);
      } else if (d.benefit.value_i) {
        disc.buy_x_get_y_discounted_value = d.benefit.value_i as string;
      }
      disc.buy_x_get_y_ben_max_affected_items =
        d.benefit.max_affected_items ||
        initialValues.buy_x_get_y_ben_max_affected_items;
    }
  }
  disc.max_discount = mToS(d.max_discount);
  return disc;
};
export const valuesToDiscount = (
  d: Values,
  shop?: ShopType,
): DiscountType => {
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
