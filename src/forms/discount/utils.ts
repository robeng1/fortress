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
import { ABSOLUTE, PERCENTAGE, BUY_X_GET_Y, COUNT, COVERAGE, VALUE, VOUCHER, MULTIBUY, FIXED_PRICE, FREE, SPECIFIC_COLLECTIONS, SPECIFIC_PRODUCTS } from './consts';

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
      if (d.applies_to === SPECIFIC_PRODUCTS) {
        benRange.included_products = d.included_products;
      }
      if (d.applies_to === SPECIFIC_COLLECTIONS) {
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
      if (d.applies_to === SPECIFIC_PRODUCTS) {
        benRange.included_products = d.included_products;
      }
      if (d.applies_to === SPECIFIC_COLLECTIONS) {
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
      if (d.applies_to === SPECIFIC_PRODUCTS) {
        benRange.included_products = d.included_products;
      }
      if (d.applies_to === SPECIFIC_COLLECTIONS) {
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
      if (d.applies_to === SPECIFIC_PRODUCTS) {
        benRange.included_products = d.included_products;
      }
      if (d.applies_to === SPECIFIC_COLLECTIONS) {
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
      if (d.buy_x_get_y_condition_range_type === SPECIFIC_PRODUCTS) {
        condRange.included_products = d.buy_x_get_y_condition_range_keys;
      }
      if (d.buy_x_get_y_condition_range_type === SPECIFIC_COLLECTIONS) {
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
      if (d.buy_x_get_y_ben_range_type === SPECIFIC_PRODUCTS) {
        benRange.included_products = d.buy_x_get_y_ben_range_keys;
      }
      if (d.buy_x_get_y_ben_range_type === SPECIFIC_COLLECTIONS) {
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

export const discountToValues = (d?: DiscountType, shop?: ShopType): Values => {
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
    max_global_applications: d.max_global_applications ?? undefined,
    max_user_applications: d.max_user_applications ?? undefined,
    page_title: d.page_title || initialValues.page_title,
    page_description: d.page_description || initialValues.page_description,
    start_date: moment(d.start).format('YYYY-MM-DD'),
    start_time: moment(d.start).format('HH:mm:ss'),
    end_date: moment(d.end).format('YYYY-MM-DD'),
    end_time: moment(d.end).format('HH:mm:ss'),
  };
  if (
    d.benefit?.benefit_type === ABSOLUTE ||
    d.benefit?.benefit_type === FIXED_PRICE ||
    d.benefit?.benefit_type === MULTIBUY ||
    d.benefit?.benefit_type === PERCENTAGE
  ) {
    // condition deconstruction
    disc.condition_type =
      d.condition?.condition_type || initialValues.condition_type;
    if (
      d.condition?.condition_type === COVERAGE ||
      d.condition?.condition_type === COUNT
    ) {
      disc.condition_value_int =
        d.condition.value_int || initialValues.condition_value_int;
    } else if (d.condition?.condition_type === VALUE) {
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
        disc.applies_to = SPECIFIC_COLLECTIONS;
        disc.included_collections =
          d.benefit.collection?.included_collections;
      } else if (
        d.benefit.collection &&
        d.benefit.collection?.included_products &&
        d.benefit.collection?.included_products?.length > 0
      ) {
        disc.applies_to = SPECIFIC_PRODUCTS;
        disc.included_products = d.benefit.collection?.included_products;
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
        d.condition?.condition_type ||
        initialValues.buy_x_get_y_condition_type;
      if (
        d.condition?.condition_type === COVERAGE ||
        d.condition?.condition_type === COUNT
      ) {
        disc.buy_x_get_y_condition_value =
          d.condition.value_int || initialValues.buy_x_get_y_condition_value;
      } else if (d.condition?.condition_type === VALUE) {
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
        disc.buy_x_get_y_condition_range_type = SPECIFIC_COLLECTIONS;
        disc.buy_x_get_y_condition_range_keys =
          d.condition.collection?.included_collections ||
          initialValues.buy_x_get_y_condition_range_keys;
      } else if (
        d.condition.collection &&
        d.condition.collection?.included_products &&
        d.condition.collection?.included_products?.length > 0
      ) {
        disc.buy_x_get_y_condition_range_type = SPECIFIC_PRODUCTS;
        disc.buy_x_get_y_condition_range_keys =
          d.condition.collection?.included_products ||
          initialValues.buy_x_get_y_condition_range_keys;
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
        disc.buy_x_get_y_ben_range_type = SPECIFIC_COLLECTIONS;
        disc.buy_x_get_y_ben_range_keys =
          d.benefit.collection?.included_collections;
      } else if (
        d.benefit.collection &&
        d.benefit.collection?.included_products &&
        d.benefit.collection?.included_products?.length > 0
      ) {
        disc.buy_x_get_y_ben_range_type = SPECIFIC_PRODUCTS;
        disc.buy_x_get_y_ben_range_keys =
          d.benefit.collection?.included_products;
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
}