import {
  ProductImage,
  ProductStructure,
  ProductType,
} from "typings/product/product-type"
import { InventoryType } from "typings/inventory/inventory-type"

export interface VarOption {
  attribute: Record<string, string>
  values: string[]
}

export interface SelectOption {
  key: string
  label: string
}

export interface AttrOption {
  name: string
  values: string[]
}

export interface Values {
  title: string
  description: string
  is_parent: boolean
  shipping_required: boolean
  track_quantity: boolean
  quantity: number
  type?: { key: string; label: string }
  collection_fks?: string[]
  stock_records: InventoryType[]
  variants: ProductType[]
  locations: string[] | undefined
  variation_options: VarOption[]
  images: ProductImage[]
  tags: string[]
  vendor: string
  channels: string[]
  template_suffix: string
  price: string
  compare_at_price: string
  cost_per_item: string
  sku: string
  barcode: string
  unlimited: boolean
  weight: string
  length: string
  width: string
  height: string
  page_title: string
  page_description: string
}
