import * as React from 'react';
import { toast } from 'react-toastify';
import union from 'lodash/union';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import moment from 'moment';
import Divider from '@mui/material/Divider';

import { Formik } from 'formik';
import ReactQuill from 'react-quill';
import Uppy from '@uppy/core';
import Tus from '@uppy/tus';
import { Dashboard } from '@uppy/react';
import '@uppy/status-bar/dist/style.css';
import '@uppy/drag-drop/dist/style.css';
import '@uppy/progress-bar/dist/style.css';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';

import { Loader } from 'app/components/Loader';
import { fortressURL } from 'app/endpoints/urls';
import DropTarget from '@uppy/drop-target';
import { DiscountType } from 'app/models/discount/discount-type';
import { ConditionType } from 'app/models/discount/condition-type';
import { BenefitType } from 'app/models/discount/benefit-type';
import { RangeType } from 'app/models/discount/range-type';
import { VoucherType } from 'app/models/voucher/voucher';
import { VoucherSetType } from 'app/models/voucher/voucherset';
import { useState } from 'react';
import SelectableResultSearchModal from 'app/components/common/modal-searcher';
import { request, ResponseError } from 'utils/request';
import { useAtom } from 'jotai';
import { shopAtom } from 'store/shop';
import { mToS, sToM } from 'app/utils/money';

// FIXME:(romeo) BADLY WRITTEN SPAGHETTI CODE AHEAD. NEEDS REFACTORING & SIMPLICATION
// TODO:(fix range keys)
interface Values {
  title: string;
  description: string;
  page_title: string;
  page_description: string;
  // default 'site'
  type: string;
  // default false
  all_products: boolean;
  // default false
  specific_products: boolean;
  included_products: string[];
  excluded_products: string[];
  included_collections: string[];
  incentive_type: string;
  max_affected_items: number | null;
  condition_value_money: string;
  condition_value_int: number;
  buy_x_get_y_condition_value: string | number;
  buy_x_get_y_condition_range_type: string;
  buy_x_get_y_condition_range_keys: string[];
  // default 'count'
  buy_x_get_y_condition_type: string;
  buy_x_get_y_ben_range_type: string;
  buy_x_get_y_ben_range_keys: string[];
  // default 1
  buy_x_get_y_ben_max_affected_items: number;
  // default 'percentage'
  buy_x_get_y_discounted_value_type: string;
  buy_x_get_y_discounted_value: string;
  condition_type: string;
  value: string | number;
  // default 'all_products'
  applies_to: string;
  exclusive: true;
  customer_eligibility: string;
  // default false
  has_max_global_applications: boolean;
  // default false
  has_max_user_applications: boolean;
  // default false
  has_max_discount: boolean;
  max_basket_applications: number;
  max_discount: string;
  max_user_applications?: number;
  max_global_applications?: number;
  start_date: string;
  start_time: string;
  end_date: string;
  end_time: string;
  cover_photo: string;
  // default 'single'
  code_type: string;
  code: string;
  code_usage: string;
  code_length: number;
  // default 2
  number_of_codes: number;
}

const initialValues: Values = {
  title: '',
  description: '',
  page_title: '',
  page_description: '',
  type: 'site',
  all_products: false,
  specific_products: false,
  included_products: [],
  excluded_products: [],
  included_collections: [],
  incentive_type: 'percentage',
  max_affected_items: null,
  buy_x_get_y_condition_value: '',
  buy_x_get_y_condition_range_type: 'specific_products',
  buy_x_get_y_condition_range_keys: [],
  buy_x_get_y_condition_type: 'count',
  buy_x_get_y_ben_range_type: 'specific_products',
  buy_x_get_y_ben_range_keys: [],
  buy_x_get_y_ben_max_affected_items: 1,
  buy_x_get_y_discounted_value_type: 'percentage',
  buy_x_get_y_discounted_value: '',
  condition_value_money: '',
  condition_value_int: 1,
  condition_type: 'none',
  value: '',
  applies_to: 'all_products',
  exclusive: true,
  customer_eligibility: 'everyone',
  has_max_global_applications: false,
  has_max_user_applications: false,
  has_max_discount: false,
  max_basket_applications: 1,
  max_discount: '',
  max_user_applications: undefined,
  max_global_applications: undefined,
  start_date: '',
  start_time: '',
  end_date: '',
  end_time: '',
  cover_photo: '',
  code_type: 'single',
  code: '',
  code_usage: '',
  code_length: 6,
  number_of_codes: 2,
};

// TODO: (romeo) refactor duplicated pieces of logic
const DiscountForm = ({ handleShow, id }) => {
  const queryClient = useQueryClient();
  const [shop] = useAtom(shopAtom);
  const requestURL = `${fortressURL}/shops/${shop?.shop_id}/offers`;

  const [discountId, setDiscountId] = useState(id);

  // query for getting the discount
  const { data: discount, isLoading } = useQuery<DiscountType>(
    ['discount', discountId],
    async () => await request(`${requestURL}/${discountId}`),
    {
      // The query will not execute until the discountId exists
      enabled: !!discountId,
      keepPreviousData: true,
    },
  );

  const [image, setImage] = useState(discount?.cover_photo?.image_url);
  const handleSelectedResults =
    (
      setFieldValue: (f: string, v: any, sv?: boolean | undefined) => void,
      field: string,
    ) =>
    (selectedResults: unknown[]) => {
      setFieldValue(field, [...selectedResults]);
    };
  // for normal offers benefit range
  const [searchIncludedProductsOpen, setSearchIncludedProductsOpen] =
    useState(false);
  const [searchIncludedCollectionsOpen, setSearchIncludedCollectionsOpen] =
    useState(false);

  // for condition range
  const [
    searchBXGYCondRangeIncludedProductsOpen,
    setSearchBXGYCondRangeIncludedProductsOpen,
  ] = useState(false);
  const [
    searchBXGYCondRangeIncludedCollectionsOpen,
    setSearchBXGYCondRangeIncludedCollectionsOpen,
  ] = useState(false);

  // for benefit range
  const [
    searchBXGYBenRangeIncludedProductsOpen,
    setSearchBXGYBenRangeIncludedProductsOpen,
  ] = useState(false);
  const [
    searchBXGYBenRangeIncludedCollectionsOpen,
    setSearchBXGYBenRangeIncludedCollectionsOpen,
  ] = useState(false);

  // this is only useful for controlling which queries should be
  // enabled to prevent react-query from running all the quries
  const [isBuyXGetY, setIsBuyXGetY] = useState<boolean>(false);

  // keep track of product & collection IDs included in range for
  // non buy-x-get-y discounts
  const [includedProductKeys, setIncludedProductKeys] = useState<string[]>([]);
  const [includedCollectionKeys, setIncludedCollectionKeys] = useState<
    string[]
  >([]);

  // keep track of product & collection IDs included in range for
  // buy-x-get-y discounts
  // condition keys
  const [
    buyXGetYConditionIncludedProductKeys,
    setBuyXGetYConditionIncludedProductKeys,
  ] = useState<string[]>([]);
  const [
    buyXGetYConditionIncludedCollectionKeys,
    setBuyXGetYConditionIncludedCollectionKeys,
  ] = useState<string[]>([]);

  // benefit keys
  const [
    buyXGetYBenefitIncludedProductKeys,
    setBuyXGetYBenefitIncludedProductKeys,
  ] = useState<string[]>([]);
  const [
    buyXGetYBenefitIncludedCollectionKeys,
    setBuyXGetYBenefitIncludedCollectionKeys,
  ] = useState<string[]>([]);

  const convDiscountToValues = (d: DiscountType | undefined): Values => {
    if (!d) {
      return initialValues;
    }
    const disc: Values = {
      ...initialValues,
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
          disc.included_collections =
            d.benefit.collection?.included_collections;
          setIncludedCollectionKeys(disc.included_collections || []);
        } else if (
          d.benefit.collection &&
          d.benefit.collection?.included_products &&
          d.benefit.collection?.included_products?.length > 0
        ) {
          disc.applies_to = 'specific_products';
          disc.included_products = d.benefit.collection?.included_products;
          setIncludedProductKeys(disc.included_products || []);
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
          setBuyXGetYConditionIncludedCollectionKeys(
            disc.buy_x_get_y_condition_range_keys,
          );
        } else if (
          d.condition.collection &&
          d.condition.collection?.included_products &&
          d.condition.collection?.included_products?.length > 0
        ) {
          disc.buy_x_get_y_condition_range_type = 'specific_products';
          disc.buy_x_get_y_condition_range_keys =
            d.condition.collection?.included_products ||
            initialValues.buy_x_get_y_condition_range_keys;
          setBuyXGetYConditionIncludedProductKeys(
            disc.buy_x_get_y_condition_range_keys,
          );
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
          setBuyXGetYBenefitIncludedCollectionKeys(
            disc.buy_x_get_y_ben_range_keys,
          );
        } else if (
          d.benefit.collection &&
          d.benefit.collection?.included_products &&
          d.benefit.collection?.included_products?.length > 0
        ) {
          disc.buy_x_get_y_ben_range_type = 'specific_products';
          disc.buy_x_get_y_ben_range_keys =
            d.benefit.collection?.included_products;
          setBuyXGetYBenefitIncludedProductKeys(
            disc.buy_x_get_y_ben_range_keys,
          );
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
  const convValuesToDiscount = (d: Values): DiscountType => {
    const disc: DiscountType = {
      shop_id: shop?.shop_id || '',
      discount_id: discountId,
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
      cover_photo: { image_url: image },
    };
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
          includes_all_products:
            d.buy_x_get_y_ben_range_type === 'all_products',
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
          discount_id: discountId,
          usage: d.code_usage,
        };
        disc.vouchers = [voucher];
      } else if (d.code_type === 'set') {
        const voucherSet: VoucherSetType = {
          set_id: '',
          shop_id: shop?.shop_id,
          usage: d.code_usage,
          discount_id: discountId,
          code_length: d.code_length,
          count: d.number_of_codes,
        };
        disc.voucher_sets = [voucherSet];
      }
    }
    return disc;
  };

  // create the discount
  const { mutate: createDiscount } = useMutation(
    (payload: DiscountType) =>
      request(requestURL, {
        method: 'POST',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newDiscount: DiscountType) => {
        setDiscountId(newDiscount.discount_id);
        queryClient.setQueryData(['discount', discountId], newDiscount);
        toast('Discount created successfully');
      },
      onError: (e: ResponseError) => {
        toast('Collection creation failed due to ' + e.message);
      },
    },
  );

  // update the update
  const { mutate: updateDiscount } = useMutation(
    (payload: DiscountType) =>
      request(`${requestURL}/${discountId}`, {
        method: 'PATCH',
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (newDiscount: DiscountType) => {
        setDiscountId(newDiscount.discount_id);
        queryClient.setQueryData(['discount', discountId], newDiscount);
        toast('Discount updated successfully');
      },
      onError: (e: ResponseError) => {
        toast('Discount could not be updated due to' + e.message);
      },
    },
  );

  const onUploadComplete = result => {
    const url = result.successful[0].uploadURL;
    // const fileName = file.name;
    setImage(url);
    // const li = document.createElement('li');
    // const a = document.createElement('a');
    // a.href = url;
    // a.target = '_blank';
    // a.appendChild(document.createTextNode(fileName));
    // li.appendChild(a);

    // document.querySelector(elForUploadedFiles).appendChild(li);
  };

  const uppy = React.useMemo(() => {
    return new Uppy({
      id: 'discount',
      autoProceed: false,
      restrictions: {
        maxFileSize: 15 * 1024 * 1024,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*', 'video/*'],
      },
    })
      .use(DropTarget, { target: document.body })
      .on('complete', onUploadComplete)
      .use(Tus, { endpoint: 'https://storage.reoplex.com/files/' });
  }, []);

  const addFiles = files => {
    files.forEach(e => {
      uppy.addFile({
        name: e.name,
        type: e.type,
        data: e.blob, // changed blob -> data
      });
    });

    Object.keys(uppy.state.files).forEach(fileID => {
      uppy.setFileState(fileID, {
        progress: { uploadComplete: true, uploadStarted: true },
      });
    });
  };

  React.useEffect(() => {
    // assuming the image lives on a server somewhere
    discount?.cover_photo?.image_url &&
      discount?.cover_photo?.image_url !== '' &&
      discount?.cover_photo?.image_url !== undefined &&
      fetch(discount?.cover_photo?.image_url)
        .then(response => response.blob()) // returns a Blob
        .then(blob => {
          addFiles([
            {
              name: discount?.slug,
              type: blob.type,
              data: blob, // changed blob -> data
            },
          ]);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [discount]);

  React.useEffect(() => {
    return () => uppy.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // options search URLs
  const collectionOptionSearchURL = `${fortressURL}/shops/${shop?.shop_id}/collections/option-search`;
  const productOptionSearchURL = `${fortressURL}/shops/${shop?.shop_id}/products/option-search`;

  const productQueryComposer = (term: string): Record<string, any> => {
    return { limit: 15, term, shop_id: shop?.shop_id, type: 'product' };
  };

  const collectionQueryComposer = (term: string): Record<string, any> => {
    return { limit: 15, term, shop_id: shop?.shop_id, type: 'collection' };
  };

  // queries to display selected products and/or collections
  // gets the selected products for them to be displayed
  const selectedProductsQuery = (products: string[]): string => {
    let query = `SELECT * FROM product WHERE shop_id = '${shop?.shop_id}' AND product_id IN (`;
    products.forEach((productId, index) => {
      if (index === products.length) {
        query += `'${productId}'`;
      } else {
        query += `'${productId}',`;
      }
    });
    query += `)`;
    return query;
  };

  // gets the selected collections for them to be displayed
  const selectedCollectionsQuery = (collections: string[]): string => {
    let query = `SELECT * FROM collection WHERE shop_id = '${shop?.shop_id}' AND collection_id IN (`;
    collections.forEach((collectionId, index) => {
      if (index === collections.length) {
        query += `'${collectionId}'`;
      } else {
        query += `'${collectionId}',`;
      }
    });
    query += `)`;
    return query;
  };

  // query for getting included products
  const {
    data: { result: includedProducts },
  } = useQuery<any>(
    ['included-products', discountId],
    async () =>
      await request(productOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedProductsQuery(includedProductKeys),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled: !!discountId && includedProductKeys.length > 0 && !isBuyXGetY,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  // query for getting included collections
  const {
    data: { result: includedCollections },
  } = useQuery<any>(
    ['included-collections', discountId],
    async () =>
      await request(collectionOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedCollectionsQuery(includedCollectionKeys),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled: !!discountId && includedCollectionKeys.length > 0 && !isBuyXGetY,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  // query for getting included products for a condition's range
  const {
    data: { result: condRangeIncludedProducts },
  } = useQuery<any>(
    ['cond-range-included-products', discountId],
    async () =>
      await request(productOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedProductsQuery(buyXGetYConditionIncludedProductKeys),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled:
        !!discountId &&
        buyXGetYConditionIncludedProductKeys.length > 0 &&
        isBuyXGetY,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  // query for getting included collections for a condition's range
  const {
    data: { result: condRangeIncludedCollections },
  } = useQuery<any>(
    ['cond-range-included-collections', discountId],
    async () =>
      await request(collectionOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedCollectionsQuery(
            buyXGetYConditionIncludedCollectionKeys,
          ),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled:
        !!discountId &&
        buyXGetYConditionIncludedCollectionKeys.length > 0 &&
        isBuyXGetY,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  // query for getting included products for a condition's range
  const {
    data: { result: benRangeIncludedProducts },
  } = useQuery<any>(
    ['ben-range-included-products', discountId],
    async () =>
      await request(productOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedProductsQuery(buyXGetYBenefitIncludedProductKeys),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled:
        !!discountId &&
        buyXGetYBenefitIncludedProductKeys.length > 0 &&
        isBuyXGetY,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  // query for getting included collections for a condition's range
  const {
    data: { result: benRangeIncludedCollections },
  } = useQuery<any>(
    ['ben-range-included-collections', discountId],
    async () =>
      await request(collectionOptionSearchURL, {
        method: 'POST',
        body: JSON.stringify({
          query: selectedCollectionsQuery(
            buyXGetYBenefitIncludedCollectionKeys,
          ),
        }),
      }),
    {
      // The query will not execute until the discountId exists
      enabled:
        !!discountId &&
        buyXGetYBenefitIncludedCollectionKeys.length > 0 &&
        isBuyXGetY,
      keepPreviousData: true,
      initialData: { result: [] },
    },
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Formik
            initialValues={{
              ...initialValues,
              ...convDiscountToValues(discount),
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (discount) {
                updateDiscount({
                  ...discount,
                  ...convValuesToDiscount({ ...values }),
                });
              } else {
                createDiscount({
                  ...convValuesToDiscount({ ...values }),
                });
              }
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              setFieldError,
              setValues,
              setFieldTouched,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <div className="flex-grow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-6">
                  <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
                    <section className="rounded bg-white shadow overflow-hidden p-3">
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="title"
                          >
                            Discount Title
                          </label>
                          <input
                            id="title"
                            name="title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                            className="form-input w-full"
                            type="text"
                            autoComplete="discount-title"
                            placeholder="X-mas Sales"
                          />
                        </div>
                      </div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="description"
                          >
                            Description
                          </label>
                          <ReactQuill
                            theme="snow"
                            onChange={e => setFieldValue('description', e)}
                            value={values.description}
                            style={{
                              maxHeight: '14rem',
                            }}
                          />
                        </div>
                      </div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="type"
                          >
                            Discount Type
                          </label>
                          <select
                            name="type"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.type}
                            id="type"
                            className="form-select block"
                          >
                            <option value="">Please Select</option>
                            <option value="site">Automatic</option>
                            <option value="voucher">Manual</option>
                          </select>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
                    <section className="rounded bg-white shadow overflow-hidden p-3">
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="sm:w-full mt-1">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="incentive_type"
                          >
                            Type
                          </label>
                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="incentive_type"
                                className="form-radio"
                                onChange={e => {
                                  setFieldValue('incentive_type', 'percentage');
                                  setIsBuyXGetY(false);
                                }}
                                checked={values.incentive_type === 'percentage'}
                                value={values.incentive_type}
                              />
                              <span className="text-sm ml-2">Percentage</span>
                            </label>
                          </div>
                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="incentive_type"
                                className="form-radio"
                                onChange={e => {
                                  setFieldValue(
                                    'incentive_type',
                                    'fixed_discount',
                                  );
                                  setIsBuyXGetY(false);
                                }}
                                checked={
                                  values.incentive_type === 'fixed_discount'
                                }
                                value={values.incentive_type}
                              />
                              <span className="text-sm ml-2">Fixed amount</span>
                            </label>
                          </div>
                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="incentive_type"
                                className="form-radio"
                                onChange={e => {
                                  setFieldValue('incentive_type', 'multibuy');
                                  setIsBuyXGetY(false);
                                }}
                                checked={values.incentive_type === 'multibuy'}
                                value={values.incentive_type}
                              />
                              <span className="text-sm ml-2">Multibuy</span>
                            </label>
                          </div>
                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="incentive_type"
                                className="form-radio"
                                onChange={e => {
                                  setFieldValue(
                                    'incentive_type',
                                    'fixed_price',
                                  );
                                  setIsBuyXGetY(false);
                                }}
                                checked={
                                  values.incentive_type === 'fixed_price'
                                }
                                value={values.incentive_type}
                              />
                              <span className="text-sm ml-2">Fixed price</span>
                            </label>
                          </div>
                          {/* <div className="m-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="incentive_type"
                            className="form-radio"
                            onChange={e =>
                              setFieldValue(
                                'incentive_type',
                                'fixed_price_per_product',
                              )
                            }
                            checked={
                              values.incentive_type ===
                              'fixed_price_per_product'
                            }
                            value={values.incentive_type}
                          />
                          <span className="text-sm ml-2">
                            Fixed price per product
                          </span>
                        </label>
                      </div> */}
                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="incentive_type"
                                className="form-radio"
                                onChange={e => {
                                  setFieldValue(
                                    'incentive_type',
                                    'buy-x-get-y',
                                  );
                                  setIsBuyXGetY(true);
                                }}
                                checked={
                                  values.incentive_type === 'buy-x-get-y'
                                }
                                value={values.incentive_type}
                              />
                              <span className="text-sm ml-2">Buy X Get Y</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                  <div className="sm:col-span-3 md:col-span-3 lg:col-span-2">
                    <section
                      className={`rounded bg-white shadow overflow-hidden p-3 mb-10 ${
                        values.incentive_type === 'buy-x-get-y'
                          ? 'block'
                          : 'hidden'
                      }`}
                    >
                      <h2 className="block text-lg font-semibold mb-1">
                        Customer buys
                      </h2>
                      <div className="m-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="buy_x_get_y_condition_type"
                            className="form-radio"
                            onChange={e =>
                              setFieldValue(
                                'buy_x_get_y_condition_type',
                                'count',
                              )
                            }
                            checked={
                              values.buy_x_get_y_condition_type === 'count'
                            }
                            value={values.buy_x_get_y_condition_type}
                          />
                          <span className="text-sm ml-2">
                            Minimum quantity of items
                          </span>
                        </label>
                      </div>
                      <div className="m-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="buy_x_get_y_condition_type"
                            className="form-radio"
                            onChange={e =>
                              setFieldValue(
                                'buy_x_get_y_condition_type',
                                'value',
                              )
                            }
                            checked={
                              values.buy_x_get_y_condition_type === 'value'
                            }
                            value={values.buy_x_get_y_condition_type}
                          />
                          <span className="text-sm ml-2">
                            Minimum purchase amount
                          </span>
                        </label>
                      </div>
                      <div className="m-3">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="buy_x_get_y_condition_type"
                            className="form-radio"
                            onChange={e =>
                              setFieldValue(
                                'buy_x_get_y_condition_type',
                                'coverage',
                              )
                            }
                            checked={
                              values.buy_x_get_y_condition_type === 'coverage'
                            }
                            value={values.buy_x_get_y_condition_type}
                          />
                          <span className="text-sm ml-2">
                            Minimum quantity of distinct items
                          </span>
                        </label>
                      </div>

                      {/* TODO: radios for customer to choose value type */}
                      <div>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                          <div className="w-1/2">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="buy_x_get_y_condition_value"
                            >
                              {values.buy_x_get_y_condition_type === 'count' ||
                              values.buy_x_get_y_condition_type === 'coverage'
                                ? 'Quantity'
                                : 'Amount'}
                            </label>
                            <div
                              className={`relative ${
                                values.buy_x_get_y_condition_type === 'count' ||
                                values.buy_x_get_y_condition_type ===
                                  'coverage' ||
                                values.buy_x_get_y_condition_type === ''
                                  ? 'hidden'
                                  : 'block'
                              }`}
                            >
                              <input
                                className="form-input w-full pl-12"
                                type="text"
                                id="buy_x_get_y_condition_value"
                                name="buy_x_get_y_condition_value"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.buy_x_get_y_condition_value}
                              />
                              <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                                <span className="text-sm text-gray-400 font-medium px-3">
                                  GHS
                                </span>
                              </div>
                            </div>
                            <div
                              className={`relative ${
                                values.buy_x_get_y_condition_type === 'value' ||
                                values.buy_x_get_y_condition_type === ''
                                  ? 'hidden'
                                  : 'block'
                              }`}
                            >
                              <input
                                id="buy_x_get_y_condition_value"
                                name="buy_x_get_y_condition_value"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.buy_x_get_y_condition_value}
                                className="form-input w-full pr-8"
                                step={1}
                                min={1}
                                type="number"
                                placeholder="1"
                              />
                              {/* <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                            <span className="text-sm text-gray-400 font-medium px-3">
                              products
                            </span>
                          </div> */}
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="buy_x_get_y_condition_range_type"
                              >
                                Any Items from
                              </label>
                              <select
                                name="buy_x_get_y_condition_range_type"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.buy_x_get_y_condition_range_type}
                                id="buy_x_get_y_condition_range_type"
                                className="form-select block w-2/3"
                              >
                                <option value="specific_products">
                                  Specific products
                                </option>
                                <option value="specific_collections">
                                  Specific collections
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                          {values.buy_x_get_y_condition_range_type ===
                          'specific_products' ? (
                            <div className="w-full">
                              <div className="w-full">
                                <div
                                  onClick={e => {
                                    e.stopPropagation();
                                    setSearchBXGYCondRangeIncludedProductsOpen(
                                      !searchBXGYCondRangeIncludedProductsOpen,
                                    );
                                  }}
                                  className="flex border-1 rounded"
                                >
                                  <input
                                    type="text"
                                    className="form-input w-full"
                                    placeholder="Search products..."
                                  />
                                  <button className="flex items-center justify-center px-4 border-l">
                                    <svg
                                      className="w-6 h-6 text-gray-600"
                                      fill="currentColor"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                    </svg>
                                  </button>
                                </div>
                                <SelectableResultSearchModal
                                  id="quick-find-modal-cr"
                                  searchId="quick-find-cr"
                                  modalOpen={
                                    searchBXGYCondRangeIncludedProductsOpen
                                  }
                                  setModalOpen={
                                    setSearchBXGYCondRangeIncludedProductsOpen
                                  }
                                  queryURL={productOptionSearchURL}
                                  composeQuery={productQueryComposer}
                                  matchKey="key"
                                  queryKey="products-opt-search"
                                  handleResultSelected={(items: any[]) => {
                                    const keys = items.map(item => item['key']);
                                    const nl = union(
                                      keys,
                                      buyXGetYConditionIncludedProductKeys,
                                    );
                                    handleSelectedResults(
                                      setFieldValue,
                                      'buy_x_get_y_condition_range_keys',
                                    )(nl);
                                    setBuyXGetYConditionIncludedProductKeys(nl);
                                    queryClient.invalidateQueries([
                                      'cond-range-included-products',
                                      discountId,
                                    ]);
                                  }}
                                  alreadySelected={union(
                                    values.buy_x_get_y_condition_range_keys,
                                    buyXGetYConditionIncludedProductKeys,
                                  )}
                                  placeholder="Products"
                                  queryEnabled={!!shop?.shop_id}
                                />
                              </div>
                              <div>
                                {condRangeIncludedProducts.map(
                                  (product: any) => (
                                    <div
                                      key={product.key}
                                      className="flex items-center"
                                    >
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                          className="h-10 w-10"
                                          src={product.image_url}
                                          alt={product.label}
                                        />
                                      </div>
                                      <div className="ml-4 flex justify-between">
                                        <div className="text-sm font-medium text-gray-900">
                                          {product.label}
                                        </div>
                                        <div
                                          onClick={e => {
                                            e.stopPropagation();
                                            setBuyXGetYConditionIncludedProductKeys(
                                              previousKeys =>
                                                previousKeys.filter(
                                                  k => k !== product.key,
                                                ),
                                            );
                                            queryClient.invalidateQueries([
                                              'cond-range-included-products',
                                              discountId,
                                            ]);
                                          }}
                                          className="text-sm text-gray-500 cursor-pointer"
                                        >
                                          X
                                        </div>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="w-full">
                              <div className="w-full">
                                <div
                                  onClick={e => {
                                    e.stopPropagation();
                                    setSearchBXGYCondRangeIncludedCollectionsOpen(
                                      !searchBXGYCondRangeIncludedCollectionsOpen,
                                    );
                                  }}
                                  className="flex border-1 rounded"
                                >
                                  <input
                                    type="text"
                                    className="form-input w-full"
                                    placeholder="Search collections..."
                                  />
                                  <button className="flex items-center justify-center px-4 border-l">
                                    <svg
                                      className="w-6 h-6 text-gray-600"
                                      fill="currentColor"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                    </svg>
                                  </button>
                                </div>
                                <SelectableResultSearchModal
                                  id="quick-find-modal-cr"
                                  searchId="quick-find-cr"
                                  modalOpen={
                                    searchBXGYCondRangeIncludedCollectionsOpen
                                  }
                                  setModalOpen={
                                    setSearchBXGYCondRangeIncludedCollectionsOpen
                                  }
                                  queryURL={collectionOptionSearchURL}
                                  composeQuery={collectionQueryComposer}
                                  matchKey="key"
                                  queryKey="collections-opt-search"
                                  handleResultSelected={(items: any[]) => {
                                    const keys = items.map(item => item['key']);
                                    const nl = union(
                                      keys,
                                      buyXGetYConditionIncludedCollectionKeys,
                                    );
                                    handleSelectedResults(
                                      setFieldValue,
                                      'buy_x_get_y_condition_range_keys',
                                    )(nl);
                                    setBuyXGetYConditionIncludedCollectionKeys(
                                      nl,
                                    );
                                    queryClient.invalidateQueries([
                                      'cond-range-included-collections',
                                      discountId,
                                    ]);
                                  }}
                                  alreadySelected={union(
                                    values.buy_x_get_y_condition_range_keys,
                                    buyXGetYConditionIncludedCollectionKeys,
                                  )}
                                  placeholder="Collections"
                                  queryEnabled={!!shop?.shop_id}
                                />
                              </div>
                              <div>
                                {condRangeIncludedCollections.map(
                                  (collection: any) => (
                                    <div
                                      key={collection.key}
                                      className="flex items-center"
                                    >
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                          className="h-10 w-10"
                                          src={collection.image_url}
                                          alt={collection.label}
                                        />
                                      </div>
                                      <div className="ml-4 flex justify-between">
                                        <div className="text-sm font-medium text-gray-900">
                                          {collection.label}
                                        </div>
                                        <div
                                          onClick={e => {
                                            e.stopPropagation();
                                            setBuyXGetYConditionIncludedCollectionKeys(
                                              previousKeys =>
                                                previousKeys.filter(
                                                  k => k !== collection.key,
                                                ),
                                            );
                                            queryClient.invalidateQueries([
                                              'cond-range-included-collections',
                                              discountId,
                                            ]);
                                          }}
                                          className="text-sm text-gray-500 cursor-pointer"
                                        >
                                          X
                                        </div>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                    <section
                      className={`rounded bg-white shadow overflow-hidden p-3 mb-10 ${
                        values.incentive_type === 'buy-x-get-y'
                          ? 'block'
                          : 'hidden'
                      }`}
                    >
                      <h2 className="block text-lg font-semibold mb-1">
                        Customer gets
                      </h2>
                      <div>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                          <div className="w-1/2">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="buy_x_get_y_ben_max_affected_items"
                            >
                              Quantity
                            </label>
                            <input
                              id="buy_x_get_y_ben_max_affected_items"
                              name="buy_x_get_y_ben_max_affected_items"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.buy_x_get_y_ben_max_affected_items}
                              className="form-input w-1/2"
                              step={1}
                              min={1}
                              type="number"
                              placeholder="1"
                            />
                          </div>
                          <div className="w-full">
                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="buy_x_get_y_ben_range_type"
                              >
                                Any Items from
                              </label>
                              <select
                                name="buy_x_get_y_ben_range_type"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.buy_x_get_y_ben_range_type}
                                id="buy_x_get_y_ben_range_type"
                                className="form-select block w-2/3"
                              >
                                <option value="specific_products">
                                  Specific products
                                </option>
                                <option value="specific_collections">
                                  Specific collections
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                          {values.buy_x_get_y_ben_range_type ===
                          'specific_products' ? (
                            <div className="w-full">
                              <div className="w-full">
                                <div
                                  onClick={e => {
                                    e.stopPropagation();
                                    setSearchBXGYBenRangeIncludedProductsOpen(
                                      !searchBXGYBenRangeIncludedProductsOpen,
                                    );
                                  }}
                                  className="flex border-1 rounded"
                                >
                                  <input
                                    type="text"
                                    className="form-input w-full"
                                    placeholder="Search products..."
                                  />
                                  <button className="flex items-center justify-center px-4 border-l">
                                    <svg
                                      className="w-6 h-6 text-gray-600"
                                      fill="currentColor"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                    </svg>
                                  </button>
                                </div>
                                <SelectableResultSearchModal
                                  id="quick-find-modal-br"
                                  searchId="quick-find-br"
                                  modalOpen={
                                    searchBXGYBenRangeIncludedProductsOpen
                                  }
                                  setModalOpen={
                                    setSearchBXGYBenRangeIncludedProductsOpen
                                  }
                                  queryURL={productOptionSearchURL}
                                  composeQuery={productQueryComposer}
                                  matchKey="key"
                                  queryKey="products-opt-search"
                                  handleResultSelected={(items: any[]) => {
                                    const keys = items.map(item => item['key']);
                                    const nl = union(
                                      keys,
                                      buyXGetYBenefitIncludedProductKeys,
                                    );
                                    handleSelectedResults(
                                      setFieldValue,
                                      'buy_x_get_y_ben_range_keys',
                                    )(nl);
                                    setBuyXGetYBenefitIncludedProductKeys(nl);
                                    queryClient.invalidateQueries([
                                      'ben-range-included-products',
                                      discountId,
                                    ]);
                                  }}
                                  alreadySelected={union(
                                    values.buy_x_get_y_ben_range_keys,
                                    buyXGetYBenefitIncludedProductKeys,
                                  )}
                                  placeholder="Products"
                                  queryEnabled={!!shop?.shop_id}
                                />
                              </div>
                              <div>
                                {benRangeIncludedProducts.map(
                                  (product: any) => (
                                    <div
                                      key={product.key}
                                      className="flex items-center"
                                    >
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                          className="h-10 w-10"
                                          src={product.image_url}
                                          alt={product.label}
                                        />
                                      </div>
                                      <div className="ml-4 flex justify-between">
                                        <div className="text-sm font-medium text-gray-900">
                                          {product.label}
                                        </div>
                                        <div
                                          onClick={e => {
                                            e.stopPropagation();
                                            setBuyXGetYBenefitIncludedProductKeys(
                                              previousKeys =>
                                                previousKeys.filter(
                                                  k => k !== product.key,
                                                ),
                                            );
                                            queryClient.invalidateQueries([
                                              'ben-range-included-products',
                                              discountId,
                                            ]);
                                          }}
                                          className="text-sm text-gray-500 cursor-pointer"
                                        >
                                          X
                                        </div>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="w-full">
                              <div className="w-full">
                                <div
                                  onClick={e => {
                                    e.stopPropagation();
                                    setSearchBXGYBenRangeIncludedCollectionsOpen(
                                      !searchBXGYBenRangeIncludedCollectionsOpen,
                                    );
                                  }}
                                  className="flex border-1 rounded"
                                >
                                  <input
                                    type="text"
                                    className="form-input w-full"
                                    placeholder="Search collections..."
                                  />
                                  <button className="flex items-center justify-center px-4 border-l">
                                    <svg
                                      className="w-6 h-6 text-gray-600"
                                      fill="currentColor"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                    </svg>
                                  </button>
                                </div>
                                <SelectableResultSearchModal
                                  id="quick-find-modal-br"
                                  searchId="quick-find-br"
                                  modalOpen={
                                    searchBXGYBenRangeIncludedCollectionsOpen
                                  }
                                  setModalOpen={
                                    setSearchBXGYBenRangeIncludedCollectionsOpen
                                  }
                                  queryURL={collectionOptionSearchURL}
                                  composeQuery={collectionQueryComposer}
                                  matchKey="key"
                                  queryKey="collections-opt-search"
                                  handleResultSelected={(items: any[]) => {
                                    const keys = items.map(item => item['key']);
                                    const nl = union(
                                      keys,
                                      buyXGetYBenefitIncludedCollectionKeys,
                                    );
                                    handleSelectedResults(
                                      setFieldValue,
                                      'buy_x_get_y_ben_range_keys',
                                    )(nl);
                                    setBuyXGetYBenefitIncludedCollectionKeys(
                                      nl,
                                    );
                                    queryClient.invalidateQueries([
                                      'cond-range-included-collections',
                                      discountId,
                                    ]);
                                  }}
                                  alreadySelected={union(
                                    values.buy_x_get_y_ben_range_keys,
                                    buyXGetYBenefitIncludedCollectionKeys,
                                  )}
                                  placeholder="Collections"
                                  queryEnabled={!!shop?.shop_id}
                                />
                              </div>
                              <div>
                                {benRangeIncludedCollections.map(
                                  (collection: any) => (
                                    <div
                                      key={collection.key}
                                      className="flex items-center"
                                    >
                                      <div className="flex-shrink-0 h-10 w-10">
                                        <img
                                          className="h-10 w-10"
                                          src={collection.image_url}
                                          alt={collection.label}
                                        />
                                      </div>
                                      <div className="ml-4 flex justify-between">
                                        <div className="text-sm font-medium text-gray-900">
                                          {collection.label}
                                        </div>
                                        <div
                                          onClick={e => {
                                            e.stopPropagation();
                                            setBuyXGetYBenefitIncludedCollectionKeys(
                                              previousKeys =>
                                                previousKeys.filter(
                                                  k => k !== collection.key,
                                                ),
                                            );
                                            queryClient.invalidateQueries([
                                              'ben-range-included-collections',
                                              discountId,
                                            ]);
                                          }}
                                          className="text-sm text-gray-500 cursor-pointer"
                                        >
                                          X
                                        </div>
                                      </div>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                          <div className="w-full">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="applies_to"
                            >
                              AT A DISCOUNTED VALUE
                            </label>
                            <div className="m-3">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="buy_x_get_y_discounted_value_type"
                                  className="form-radio"
                                  onChange={e =>
                                    setFieldValue(
                                      'buy_x_get_y_discounted_value_type',
                                      'percentage',
                                    )
                                  }
                                  checked={
                                    values.buy_x_get_y_discounted_value_type ===
                                    'percentage'
                                  }
                                  value={
                                    values.buy_x_get_y_discounted_value_type
                                  }
                                />
                                <span className="text-sm ml-2">Percentage</span>
                              </label>
                            </div>
                            <div className="m-3">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="buy_x_get_y_discounted_value_type"
                                  className="form-radio"
                                  onChange={e =>
                                    setFieldValue(
                                      'buy_x_get_y_discounted_value_type',
                                      'fixed_discount',
                                    )
                                  }
                                  checked={
                                    values.buy_x_get_y_discounted_value_type ===
                                    'fixed_discount'
                                  }
                                  value={
                                    values.buy_x_get_y_discounted_value_type
                                  }
                                />
                                <span className="text-sm ml-2">
                                  Fixed discount
                                </span>
                              </label>
                            </div>
                            <div className="m-3">
                              <label className="flex items-center">
                                <input
                                  type="radio"
                                  name="buy_x_get_y_discounted_value_type"
                                  className="form-radio"
                                  onChange={e =>
                                    setFieldValue(
                                      'buy_x_get_y_discounted_value_type',
                                      'free',
                                    )
                                  }
                                  checked={
                                    values.buy_x_get_y_discounted_value_type ===
                                    'free'
                                  }
                                  value={
                                    values.buy_x_get_y_discounted_value_type
                                  }
                                />
                                <span className="text-sm ml-2">Free</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`relative w-1/2 ${
                            values.buy_x_get_y_discounted_value_type ===
                              'free' || values.buy_x_get_y_condition_type === ''
                              ? 'hidden'
                              : 'block'
                          }`}
                        >
                          <input
                            id="buy_x_get_y_discounted_value"
                            name="buy_x_get_y_discounted_value"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.buy_x_get_y_discounted_value}
                            className={`form-input w-full pr-8 ${
                              (values.buy_x_get_y_discounted_value_type ===
                                'fixed_price' ||
                                values.buy_x_get_y_discounted_value_type ===
                                  'fixed_discount' ||
                                values.buy_x_get_y_discounted_value_type ===
                                  'fixed_discount') &&
                              'pl-12'
                            }`}
                            // step={1}
                            // min={1}
                            type="text"
                          />
                          {values.buy_x_get_y_discounted_value_type ===
                            'percentage' && (
                            <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                              <span className="text-sm text-gray-400 font-medium px-3">
                                %
                              </span>
                            </div>
                          )}
                          {(values.buy_x_get_y_discounted_value_type ===
                            'fixed_price' ||
                            values.buy_x_get_y_discounted_value_type ===
                              'fixed_discount' ||
                            values.buy_x_get_y_discounted_value_type ===
                              'fixed_discount') && (
                            <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                              <span className="text-sm text-gray-400 font-medium px-3">
                                GHS
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                    <section className="rounded bg-white overflow-hidden p-3 mb-10">
                      <div className="sm:col-span-3 md:col-span-3">
                        <section
                          className={`rounded bg-white overflow-hidden p-3 ${
                            values.incentive_type === 'buy-x-get-y' ||
                            values.incentive_type === 'multibuy'
                              ? 'hidden'
                              : 'block'
                          }`}
                        >
                          <div className="sm:w-1/2 mb-4">
                            <label
                              className="block text-sm font-medium mb-1"
                              htmlFor="value"
                            >
                              Value
                            </label>
                            <div className={`relative`}>
                              <input
                                id="value"
                                name="value"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.value}
                                className="form-input w-full pr-8"
                                type="text"
                              />
                              {values.incentive_type === 'percentage' && (
                                <div className="absolute inset-0 left-auto flex items-center pointer-events-none">
                                  <span className="text-sm text-gray-400 font-medium px-3">
                                    %
                                  </span>
                                </div>
                              )}
                              {(values.incentive_type === 'fixed_price' ||
                                values.incentive_type === 'fixed_discount') && (
                                <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                                  <span className="text-sm text-gray-400 font-medium px-3">
                                    GHS
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <Divider />
                          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="applies_to"
                              >
                                APPLIES TO
                              </label>
                              <div className="m-3">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="applies_to"
                                    className="form-radio"
                                    onChange={e =>
                                      setFieldValue(
                                        'applies_to',
                                        'all_products',
                                      )
                                    }
                                    checked={
                                      values.applies_to === 'all_products'
                                    }
                                    value={values.applies_to}
                                  />
                                  <span className="text-sm ml-2">
                                    All products
                                  </span>
                                </label>
                              </div>

                              <div className="m-3">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="applies_to"
                                    className="form-radio"
                                    onChange={e =>
                                      setFieldValue(
                                        'applies_to',
                                        'specific_products',
                                      )
                                    }
                                    checked={
                                      values.applies_to === 'specific_products'
                                    }
                                    value={values.applies_to}
                                  />
                                  <span className="text-sm ml-2">
                                    Specific products
                                  </span>
                                </label>
                              </div>
                              <div className="m-3">
                                <label className="flex items-center">
                                  <input
                                    type="radio"
                                    name="applies_to"
                                    className="form-radio"
                                    onChange={e =>
                                      setFieldValue(
                                        'applies_to',
                                        'specific_collections',
                                      )
                                    }
                                    checked={
                                      values.applies_to ===
                                      'specific_collections'
                                    }
                                    value={values.applies_to}
                                  />
                                  <span className="text-sm ml-2">
                                    Specific collections
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`${
                              values.applies_to === 'all_products' ||
                              values.applies_to === ''
                                ? 'hidden'
                                : 'block'
                            }`}
                          >
                            <div
                              className={`sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5`}
                            >
                              {values.applies_to === 'specific_products' ? (
                                <div className="w-full">
                                  <div className="w-full">
                                    <div
                                      onClick={e => {
                                        e.stopPropagation();
                                        setSearchIncludedProductsOpen(
                                          !searchIncludedProductsOpen,
                                        );
                                      }}
                                      className="flex border-1 rounded"
                                    >
                                      <input
                                        type="text"
                                        className="form-input w-full"
                                        placeholder="Search products..."
                                      />
                                      <button className="flex items-center justify-center px-4 border-l">
                                        <svg
                                          className="w-6 h-6 text-gray-600"
                                          fill="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                        </svg>
                                      </button>
                                    </div>
                                    <SelectableResultSearchModal
                                      id="quick-find-modal-ip"
                                      searchId="quick-find-ip"
                                      modalOpen={searchIncludedProductsOpen}
                                      setModalOpen={
                                        setSearchIncludedProductsOpen
                                      }
                                      queryURL={productOptionSearchURL}
                                      composeQuery={productQueryComposer}
                                      matchKey="key"
                                      queryKey="products-opt-search"
                                      handleResultSelected={(items: any[]) => {
                                        const keys: string[] = items.map(
                                          item => item['key'],
                                        );
                                        const nl = union(
                                          keys,
                                          includedProductKeys,
                                        );
                                        handleSelectedResults(
                                          setFieldValue,
                                          'included_products',
                                        )(nl);
                                        setIncludedProductKeys(nl);
                                        queryClient.invalidateQueries([
                                          'included-products',
                                          discountId,
                                        ]);
                                      }}
                                      alreadySelected={union(
                                        values.included_products,
                                        includedProductKeys,
                                      )}
                                      placeholder="Products"
                                      queryEnabled={!!shop?.shop_id}
                                    />
                                  </div>
                                  <div>
                                    {includedProducts.map((product: any) => (
                                      <div
                                        key={product.key}
                                        className="flex items-center"
                                      >
                                        <div className="flex-shrink-0 h-10 w-10">
                                          <img
                                            className="h-10 w-10"
                                            src={product.image_url}
                                            alt={product.label}
                                          />
                                        </div>
                                        <div className="ml-4 flex justify-between">
                                          <div className="text-sm font-medium text-gray-900">
                                            {product.label}
                                          </div>
                                          <div
                                            onClick={e => {
                                              e.stopPropagation();
                                              setIncludedProductKeys(
                                                previousKeys =>
                                                  previousKeys.filter(
                                                    k => k !== product.key,
                                                  ),
                                              );
                                              queryClient.invalidateQueries([
                                                'included-products',
                                                discountId,
                                              ]);
                                            }}
                                            className="text-sm text-gray-500 cursor-pointer"
                                          >
                                            X
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <div className="w-full">
                                  <div className="w-full">
                                    <div
                                      onClick={e => {
                                        e.stopPropagation();
                                        setSearchIncludedCollectionsOpen(
                                          !searchIncludedCollectionsOpen,
                                        );
                                      }}
                                      className="flex border-1 rounded"
                                    >
                                      <input
                                        type="text"
                                        className="form-input w-full"
                                        placeholder="Search collections..."
                                      />
                                      <button className="flex items-center justify-center px-4 border-l">
                                        <svg
                                          className="w-6 h-6 text-gray-600"
                                          fill="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                        </svg>
                                      </button>
                                    </div>
                                    <SelectableResultSearchModal
                                      id="quick-find-modal"
                                      searchId="quick-find"
                                      modalOpen={searchIncludedCollectionsOpen}
                                      setModalOpen={
                                        setSearchIncludedCollectionsOpen
                                      }
                                      queryURL={collectionOptionSearchURL}
                                      composeQuery={collectionQueryComposer}
                                      matchKey="key"
                                      queryKey="collections-opt-search"
                                      handleResultSelected={(items: any[]) => {
                                        const keys: string[] = items.map(
                                          item => item['key'],
                                        );
                                        const nl = union(
                                          keys,
                                          includedCollectionKeys,
                                        );
                                        handleSelectedResults(
                                          setFieldValue,
                                          'included_collections',
                                        )(nl);
                                        setIncludedCollectionKeys(nl);
                                        queryClient.invalidateQueries([
                                          'included-collections',
                                          discountId,
                                        ]);
                                      }}
                                      alreadySelected={union(
                                        values.included_collections,
                                        includedCollectionKeys,
                                      )}
                                      placeholder="Collections"
                                      queryEnabled={!!shop?.shop_id}
                                    />
                                  </div>
                                  <div>
                                    {includedCollections.map(
                                      (collection: any) => (
                                        <div
                                          key={collection.key}
                                          className="flex items-center"
                                        >
                                          <div className="flex-shrink-0 h-10 w-10">
                                            <img
                                              className="h-10 w-10"
                                              src={collection.image_url}
                                              alt={collection.label}
                                            />
                                          </div>
                                          <div className="ml-4 flex justify-between">
                                            <div className="text-sm font-medium text-gray-900">
                                              {collection.label}
                                            </div>
                                            <div
                                              onClick={e => {
                                                e.stopPropagation();
                                                setIncludedCollectionKeys(
                                                  previousKeys =>
                                                    previousKeys.filter(
                                                      k => k !== collection.key,
                                                    ),
                                                );
                                                queryClient.invalidateQueries([
                                                  'included-collections',
                                                  discountId,
                                                ]);
                                              }}
                                              className="text-sm text-gray-500 cursor-pointer"
                                            >
                                              X
                                            </div>
                                          </div>
                                        </div>
                                      ),
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </section>
                        <div
                          className={`sm:w-full mt-6 ${
                            values.incentive_type === 'buy-x-get-y'
                              ? 'hidden'
                              : 'block'
                          }`}
                        >
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="condition_type"
                          >
                            Requirements
                          </label>
                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="condition_type"
                                className="form-radio"
                                onChange={e =>
                                  setFieldValue('condition_type', 'none')
                                }
                                checked={
                                  values.condition_type === 'none'
                                    ? true
                                    : false
                                }
                              />
                              <span className="text-sm ml-2">None</span>
                            </label>
                          </div>

                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="condition_type"
                                className="form-radio"
                                onChange={e =>
                                  setFieldValue('condition_type', 'value')
                                }
                                checked={
                                  values.condition_type === 'value'
                                    ? true
                                    : false
                                }
                              />
                              <span className="text-sm ml-2">
                                Minimum purchase amount
                              </span>
                            </label>
                          </div>
                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="condition_type"
                                className="form-radio"
                                onChange={e =>
                                  setFieldValue('condition_type', 'count')
                                }
                                checked={
                                  values.condition_type === 'count'
                                    ? true
                                    : false
                                }
                              />
                              <span className="text-sm ml-2">
                                Minimum quantity of items
                              </span>
                            </label>
                          </div>
                          <div className="m-3">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name="condition_type"
                                className="form-radio"
                                onChange={e =>
                                  setFieldValue('condition_type', 'coverage')
                                }
                                checked={
                                  values.condition_type === 'coverage'
                                    ? true
                                    : false
                                }
                              />
                              <span className="text-sm ml-2">
                                Minimum quantity of distinct eligible items
                              </span>
                            </label>
                          </div>
                          <div className="w-1/2">
                            {!(values.condition_type === 'none') && (
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="condition_value_*"
                              >
                                {values.condition_type === 'count' ||
                                values.condition_type === 'coverage'
                                  ? 'Quantity'
                                  : 'Amount'}
                              </label>
                            )}
                            <div
                              className={`relative ${
                                values.condition_type === 'count' ||
                                values.condition_type === 'coverage' ||
                                values.condition_type === '' ||
                                values.condition_type === 'none'
                                  ? 'hidden'
                                  : 'block'
                              }`}
                            >
                              <input
                                id="condition_value_int"
                                className="form-input w-full pl-12"
                                type="text"
                                name="condition_value_int"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.condition_value_int}
                              />
                              <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                                <span className="text-sm text-gray-400 font-medium px-3">
                                  GHS
                                </span>
                              </div>
                            </div>
                            <div
                              className={`relative ${
                                values.condition_type === 'value' ||
                                values.condition_type === '' ||
                                values.condition_type === 'none'
                                  ? 'hidden'
                                  : 'block'
                              }`}
                            >
                              <input
                                id="condition_value_money"
                                name="condition_value_money"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.condition_value_money}
                                className="form-input w-full pr-8"
                                step={1}
                                min={1}
                                type="text"
                                placeholder="1"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:w-1/2 mt-6">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="customer_eligibility"
                          >
                            Customer Eligibility
                          </label>
                          <select
                            name="customer_eligibility"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.customer_eligibility}
                            id="customer_eligibility"
                            className="form-select block"
                          >
                            <option value="">Please Select</option>
                            <option value="everyone">Everyone</option>
                            <option value="group">
                              Specific group of customers
                            </option>
                            <option value="specific">Specific customers</option>
                          </select>
                        </div>
                        <div>
                          <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1 mt-6">
                            Usage Limits
                          </h2>
                          <div className="flex m-3 items-center w-full">
                            <input
                              id="has_max_global_applications"
                              name="has_max_global_applications"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-checkbox"
                              checked={values.has_max_global_applications}
                              type="checkbox"
                            />
                            <label
                              className="block text-sm ml-2"
                              htmlFor="has_max_global_applications"
                            >
                              Limit the number of times this offer can be
                              applied in total
                            </label>
                          </div>
                          {values.has_max_global_applications ? (
                            <div className="w-1/2">
                              <input
                                id="max_global_applications"
                                name="max_global_applications"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.max_global_applications}
                                className="form-input block m-3"
                                type="number"
                                step={1}
                                min={1}
                                autoComplete="max_global_applications"
                                placeholder="1"
                              />
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="m-3 flex items-center w-full">
                            <input
                              name="has_max_user_applications"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-checkbox"
                              checked={values.has_max_user_applications}
                              id="has_max_user_applications"
                              type="checkbox"
                            />
                            <label
                              className="block text-sm ml-2"
                              htmlFor="has_max_user_applications"
                            >
                              Limit the number of times this offer can be used
                              per customer
                            </label>
                          </div>
                          {values.has_max_user_applications ? (
                            <div className="w-1/2">
                              <input
                                id="max_user_applications"
                                name="max_user_applications"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.max_user_applications}
                                className="form-input block m-3"
                                type="number"
                                step={1}
                                min={1}
                                autoComplete="max_user_applications"
                                placeholder="1"
                              />
                            </div>
                          ) : (
                            <></>
                          )}
                          <div className="flex m-3 items-center w-full">
                            <input
                              name="has_max_discount"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              className="form-checkbox"
                              checked={values.has_max_discount}
                              id="has_max_discount"
                              type="checkbox"
                            />
                            <label
                              className="block text-sm ml-2"
                              htmlFor="has_max_discount"
                            >
                              Limit the total value of this discount
                            </label>
                          </div>
                          {values.has_max_discount ? (
                            <div className="w-1/2">
                              <input
                                id="max_discount"
                                name="max_discount"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.max_discount}
                                className="form-input block m-3"
                                type="number"
                                step={1}
                                min={1}
                                autoComplete="max_discount"
                                placeholder="1"
                              />
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </section>
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                        Active Dates
                      </h2>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="sm:w-1/2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="start_date"
                          >
                            Start Date
                          </label>
                          <input
                            id="start_date"
                            name="start_date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.start_date}
                            className="form-input w-full"
                            type="date"
                            placeholder="RS6TR"
                          />
                        </div>
                        <div className="sm:w-1/2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="start_time"
                          >
                            Start time
                          </label>
                          <input
                            id="start_time"
                            name="start_time"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.start_time}
                            className="form-input"
                            type="time"
                            placeholder="217328189902301"
                          />
                        </div>
                      </div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="sm:w-1/2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="end_date"
                          >
                            End Date
                          </label>
                          <input
                            id="end_date"
                            name="end_date"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.end_date}
                            className="form-input w-full"
                            type="date"
                            placeholder="RS6TR"
                          />
                        </div>
                        <div className="sm:w-1/2">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="end_time"
                          >
                            End time
                          </label>
                          <input
                            id="end_time"
                            name="end_time"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.end_time}
                            className="form-input"
                            type="time"
                            placeholder="217328189902301"
                          />
                        </div>
                      </div>
                    </section>
                    {!discountId && values.type === 'voucher' && (
                      <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                        <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                          Voucher
                        </h2>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="incentive_type"
                        >
                          Code type
                        </label>
                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="code_type"
                              className="form-radio"
                              onChange={e =>
                                setFieldValue('code_type', 'single')
                              }
                              checked={values.code_type === 'single'}
                              value={values.code_type}
                            />
                            <span className="text-sm ml-2">Single</span>
                          </label>
                        </div>
                        <div className="m-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="code_type"
                              className="form-radio"
                              onChange={e => setFieldValue('code_type', 'set')}
                              checked={values.code_type === 'set'}
                              value={values.code_type}
                            />
                            <span className="text-sm ml-2">Multi</span>
                          </label>
                        </div>
                        {values.code_type === 'single' && (
                          <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                            <div className="w-full">
                              <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="code"
                              >
                                Code
                              </label>
                              <input
                                id="code"
                                name="code"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.code}
                                className="form-input"
                                type="text"
                                placeholder="SPRNGSALE"
                              />
                            </div>
                          </div>
                        )}
                        {values.code_type === 'set' && (
                          <>
                            <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                              <div className="w-full">
                                <label
                                  className="block text-sm font-medium mb-1"
                                  htmlFor="code_length"
                                >
                                  Code Length
                                </label>
                                <input
                                  id="code_length"
                                  name="code_length"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.code_length}
                                  className="form-input"
                                  type="number"
                                  min={1}
                                  step={1}
                                  max={10}
                                  placeholder="1"
                                />
                              </div>
                            </div>
                            <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                              <div className="w-full">
                                <label
                                  className="block text-sm font-medium mb-1"
                                  htmlFor="number_of_codes"
                                >
                                  Number of codes
                                </label>
                                <input
                                  id="number_of_codes"
                                  name="number_of_codes"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.number_of_codes}
                                  className="form-input"
                                  type="number"
                                  min={1}
                                  step={1}
                                  placeholder="1"
                                />
                              </div>
                            </div>
                          </>
                        )}
                        <div className="sm:w-1/2 mt-6">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="code_usage"
                          >
                            Usage
                          </label>
                          <select
                            name="code_usage"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.code_usage}
                            id="code_usage"
                            className="form-select block"
                          >
                            <option value="">Please Select</option>
                            <option value="multi_use">
                              Can be used multiple times by multiple customers
                            </option>
                            <option value="single_use">
                              Can be used once by one customer
                            </option>
                            <option value="once_per_customer">
                              Can only be used once per customer
                            </option>
                          </select>
                        </div>
                      </section>
                    )}
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                        Cover Image
                      </h2>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <Dashboard
                            uppy={uppy}
                            proudlyDisplayPoweredByUppy={false}
                            showProgressDetails={true}
                            width="100%"
                            height="400px"
                            theme="light"
                            note="Images and video only, 2–6 files, up to 1 MB"
                            metaFields={[
                              {
                                id: 'alt',
                                name: 'Alt',
                                placeholder: 'describe what the image is about',
                              },
                            ]}
                          />
                        </div>
                      </div>
                    </section>
                    <section className="rounded bg-white shadow overflow-hidden p-3 mb-10">
                      <h2 className="text-sm header leading-snug text-gray-800 font-bold mb-1">
                        Search Engine Preview
                        <p className="text-sm header leading-snug text-gray-800 font-light mb-1">
                          This shows how your product shows up in search results
                          like Google
                        </p>
                      </h2>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="page_title"
                          >
                            Page Title
                          </label>
                          <input
                            id="page_title"
                            name="page_title"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.page_title}
                            className="form-input"
                            type="text"
                            autoComplete="product-title"
                            placeholder="wearhebron.com/chilled-beer"
                          />
                        </div>
                      </div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="page_description"
                          >
                            Page Description
                          </label>
                          <textarea
                            id="page_description"
                            name="page_description"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.page_description}
                            className="form-textarea w-full"
                            rows={5}
                            placeholder="E.g. Rocketship Kumasi warehouse, near Santasi somewhere"
                          />
                        </div>
                      </div>
                      <div className="sm:flex sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5">
                        <div className="w-full mb-4">
                          <div className="bg-white ml-2">
                            <h2 className="mb-[0px] mt-[25px] font-normal text-blue-700">
                              Wearhebron | Bikershorts
                            </h2>
                            <a
                              href="https://reoplex.com"
                              className="mb-[0px] text-green-600 text-sm"
                            >
                              https://www.wearhebron.com/products/bikershorts
                            </a>
                            <button className="text-green-600">▼</button>
                            <p className="w-full h-12 text-gray-600 line-clamp-2">
                              A mutual exclusion (mutex) is a program object
                              that prevents simultaneous access to a shared
                              resource.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
                <footer>
                  <div className="flex flex-col px-6 py-5 border-t border-gray-200">
                    <div className="flex self-end md:self-center">
                      <button className="btn border-gray-200 hover:border-gray-300 text-gray-600">
                        Cancel
                      </button>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          handleSubmit();
                        }}
                        className="btn bg-blue-900 bg-opacity-100 rounded-lg  text-white ml-3"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </footer>
              </div>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};
export default DiscountForm;
