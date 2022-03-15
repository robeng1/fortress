export interface ColourOption {
  readonly value: string;
  readonly label: string;
  readonly color: string;
  readonly isFixed?: boolean;
  readonly isDisabled?: boolean;
}

export interface ShippingRateModelOption {
  readonly value: string;
  readonly label: string;
}

export const modelOptions: readonly ShippingRateModelOption[] = [
  { value: 'WEIGHT_BASED', label: 'Weight based' },
  { value: 'ITEM_BASED', label: 'Item based' },
  // { value: 'WEIGHT_BANDED', label: 'Weight banded' },
  // { value: 'PRICE_BANDED', label: 'Price banded' },
];

declare interface AttrOption {
  value: string;
  label: string;
}
export const attributeOptions: readonly AttrOption[] = [
  { value: 'size', label: 'Size' },
  { value: 'color', label: 'Color' },
  { value: 'scent', label: 'Scent' },
  { value: 'flavour', label: 'Flavour' },
  { value: 'model', label: 'Model' },
  { value: 'material', label: 'Material' },
  { value: 'style', label: 'Style' },
];
