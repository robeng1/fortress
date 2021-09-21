export interface AddressType {
  street?: string;
  city?: string;
  area?: string;
  province?: string;
  country?: string;
}

export interface CurrencyType {
  name?: string;
  iso_code?: string;
  symbol?: string;
}

export interface PolicyType {
  p_type?: string;
  title?: string;
  body?: string;
}

export interface ShopLocaleType {
  endonym_name?: string;
  name?: string;
  primary?: boolean;
  root?: string;
  iso_code?: string;
}

export interface ShopType {
  shop_id?: string;
  about_seller?: string;
  phone?: string;
  email?: string;
  created_at?: string;
  has_store?: boolean;
  seller_category?: string;
  business_name?: string;
  business_display_name?: string;
  status?: string;
  address?: AddressType | null;
  account_id?: string;
  tags?: string[];
  policies?: PolicyType[];
  published_locales?: ShopLocaleType[];
  enabled_payment_types?: string[];
  currency?: CurrencyType | null;
  enabled_currencies?: CurrencyType[];
  domain?: string;
  permanent_domain?: string;
  customer_accounts_enabled?: boolean;
  customer_accounts_optional?: boolean;
  handle?: string;
  image?: string;
  industry?: string;
  page_title?: string;
  page_description?: string;
  is_registered?: boolean;
}
