export interface Address {
  street?: string;
  city?: string;
  area?: string;
  province?: string;
  country?: string;
}

export interface Currency {
  name?: string;
  iso_code?: string;
  symbol?: string;
}

export interface Policy {
  p_type?: string;
  title?: string;
  body?: string;
}

export interface ShopLocale {
  endonym_name?: string;
  name?: string;
  primary?: boolean;
  root?: string;
  iso_code?: string;
}

export interface Shop {
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
  address?: Address | null;
  account_id?: string;
  tags?: string[];
  policies?: Policy[];
  published_locales?: ShopLocale[];
  enabled_payment_types?: string[];
  currency?: Currency | null;
  enabled_currencies?: Currency[];
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
