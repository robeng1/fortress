import { Photo } from '../photo';

export interface CollectionProductType {
  shop_id?: string;
  collection_id?: string;
  collection_handle?: string;
  product_id?: string;
  product_handle?: string;
  active?: boolean;
  position?: number;
  variant_id?: string;
}

export interface SortOptionType {
  name?: string;
  value?: string;
}

export interface CollectionTagType {
  shop_id?: string;
  collection_id?: string;
  tag?: string;
}

export interface CollectionType {
  shop_id?: string;
  collection_id?: string;
  handle?: string;
  all_tags?: string[];
  default_sort_by?: string;
  sort_options?: SortOptionType[];
  products?: CollectionProductType[];
  template_suffix?: string;
  sale_channels?: string[];
  active?: boolean;
  tags?: CollectionTagType[];
  all_products_count?: number;
  publishing_at?: string;
  published_at?: string;
  image?: Photo | null;
  description?: string;
  title?: string;
  page_title?: string;
  page_description?: string;
  shard?: number;
}

export interface CollectionListType {
  collections?: CollectionType[];
  next_page_token?: string;
}
