import { CollectionType } from '../collection/collection-type';
import { InventoryType } from '../inventory/inventory-type';
import { Photo } from '../photo';

export interface ProductImage {
  caption?: string;
  image?: Photo | null;
  product_id?: string;
  image_id?: string;
  shop_id?: string;
  variant_id?: string;
  alt?: string;
  shard?: number;
}

export interface ProductOption {
  name?: string;
  code?: string;
  required?: boolean;
  type?: string;
  description?: string;
}
export interface BasketProductType {
  product_type_id?: string;
  name?: string;
  slug?: string;
  shipping_required?: boolean;
  track_stock?: boolean;
  attributes?: { [key: string]: any };
  options?: ProductOption[];
}

export enum ProductStructure {
  STANDALONE = 0,
  PARENT = 1,
  CHILD = 2,
}

export interface VariationTheme {
  name?: string;
  code?: string;
  description?: string;
  attributes?: string[];
  can_have_swatches?: boolean;
}

export interface ProductType {
  product_id: string;
  upc?: string;
  shop_id: string;
  attributes?: { [key: string]: any };
  title?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
  image?: Photo | null;
  sku?: string;
  track_stock?: boolean;
  rating?: number | string;
  categories?: string[];
  status?: string;
  item_condition?: string;
  swatch_image_url?: string;
  type?: ProductType | null;
  product_type_id?: string;
  is_discountable?: boolean;
  options?: ProductOption[];
  structure?: ProductStructure | keyof typeof ProductStructure;
  is_public?: boolean;
  parent_id?: string;
  shipping_required?: boolean;
  variants?: ProductType[];
  parent?: ProductType | null;
  variant_id?: string;
  variation_theme?: VariationTheme | null;
  handle?: string;
  vendor?: string;
  channels?: string[];
  inheritance_id?: string;
  product_status?: string;
  template_suffix?: string;
  bucket?: number;
  tags?: string[];
  page_title?: string;
  page_description?: string;
  images?: ProductImage[];
  shard?: number;
  collections: CollectionType[];
  stock_records: InventoryType[];
}

export interface ProductListType {
  product?: ProductType[];
  next_page_token?: string;
  bucket?: number;
}

export interface ProductViewType {
  rating?: number;
  num_variants: number;
  price_int: number;
  title?: string;
  description: string;
  sku: string;
  vendor?: string;
  shop_id: string;
  handle: string;
  channels?: string[];
  num_in_stock: number;
  currency: string;
  num_of_stock: string;
  categories: string[];
  product_type: string;
  track_stock: boolean;
}
