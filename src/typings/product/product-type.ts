import { CollectionType } from '../collection/collection-type';
import { InventoryType } from '../inventory/inventory-type';
import { Buffer } from 'buffer';

export interface ProductImage {
  caption?: string;
  url?: string;
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
  product_id?: string;
  upc?: string;
  shop_id?: string;
  attributes?: Buffer;
  title?: string;
  description?: string;
  created_at?: string;
  updated_at?: string | null;
  image?: string;
  sku?: string;
  track_stock?: boolean;
  rating?: number | string;
  categories?: string[];
  status?: string;
  item_condition?: string;
  swatch_image_url?: string;
  material?: string;
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
  bucket?: string;
  tags?: string[];
  page_title?: string;
  page_description?: string;
  images?: ProductImage[];
  sid?: number;
  collections?: CollectionType[];
  stock_records?: InventoryType[];
  variant_rank?: number;
  position?: number;
  ean?: string;
  allow_backorder?: boolean;
  hs_code?: string;
  mid_code?: string;
  deleted_at?: string | null;
  metadata?: Buffer;
  weight?: string;
  length?: string;
  height?: string;
  width?: string;
  profile_id?: string;
  collection_fks?: string[];
  collection_options?: { [key: string]: string };
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
  product_status?: string;
  product_id: string;
  image_url: string;
}

export interface ProductViewListType {
  products: ProductViewType[];
  next_page_token: string;
}
