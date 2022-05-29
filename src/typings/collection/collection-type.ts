export interface CollectType {
  shop_id?: string
  collection_id?: string
  product_id?: string
  active?: boolean
  position?: number
}

export interface SortOptionType {
  name?: string
  value?: string
}

export interface CollectionTagType {
  shop_id?: string
  collection_id?: string
  tag?: string
}

export interface CollectionType {
  shop_id?: string
  collection_id: string
  handle?: string
  all_tags?: string[]
  default_sort_by?: string
  sort_options?: SortOptionType[]
  products?: CollectType[]
  template_suffix?: string
  sale_channels?: string[]
  active?: boolean
  tags?: CollectionTagType[]
  all_products_count?: number
  publishing_at?: string
  published_at?: string
  image?: string
  description?: string
  title?: string
  page_title?: string
  page_description?: string
  shard?: number
}

export interface CollectionViewListType {
  collections?: CollectionViewType[]
  total: number
  cursor?: string
}

export interface CollectionViewType {
  title?: string
  description?: string
  handle?: string
  all_products_count?: number
  shop_id: string
  collection_id: string
  image_url?: string
  active: boolean
  all_tags: string[]
  sales_channels: string[]
  position?: number
  shard_key?: number
  created_at: number
  updated_at: number
  published_at?: number
  publishing_date?: number
}
