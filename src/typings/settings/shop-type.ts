export interface AddressType {
  name?: string;
  street?: string;
  city?: string;
  province?: string;
  postcode?: string;
  country?: string;
  notes?: string;
  latitude?: number | string;
  longitude?: number | string;
  description?: string;
  place_id?: string;
  address_line_2?: string;
  raw?: string;
  area?: string;
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

export interface StartType {
  email?: string;
  business_display_name?: string;
  permanent_domain: string;
  handle?: string;
  password?: string;
}

export interface RealAddress {
  locality: string
  administrative_area_level_1: string
  administrative_area_level_2: string
  sublocality_level_1: string
  sublocality_level_2: string
  sublocality: string
  country: string
  route: string
  lat: number
  lng: number
  place_id: string
}

export interface AddressComponent {
  long_name: string
  short_name: string
  types: string[]
}

export interface PlusCode {
  compound_code: string
  global_code: string
}

export interface Location {
  lat: number
  lng: number
}

export interface Geometry {
  location: Location
  location_type: string
}

export interface AddressTypeFromAPI {
  address_components: AddressComponent[]
  formatted_address: string
  place_id: string
  plus_code: PlusCode
  geometry: Geometry
  types: string[]
}

export const getAddress = (
  address: AddressTypeFromAPI | google.maps.GeocoderResult,
): RealAddress => {
  const components = address.address_components
  return {
    locality:
      components.find(addr => addr.types.includes('locality'))?.long_name ?? '',
    administrative_area_level_1:
      components.find(addr =>
        addr.types.includes('administrative_area_level_1'),
      )?.long_name ?? '',
    administrative_area_level_2:
      components.find(addr =>
        addr.types.includes('administrative_area_level_1'),
      )?.long_name ?? '',
    sublocality:
      components.find(addr => addr.types.includes('sublocality'))?.long_name ??
      '',
    country:
      components.find(addr => addr.types.includes('country'))?.long_name ?? '',
    route:
      components.find(addr => addr.types.includes('route'))?.long_name ?? '',
    sublocality_level_1:
      components.find(addr => addr.types.includes('sublocality_level_1'))
        ?.long_name ?? '',
    sublocality_level_2:
      components.find(addr => addr.types.includes('sublocality_level_2'))
        ?.long_name ?? '',
    lat:
      typeof address.geometry.location.lat === 'function'
        ? address.geometry.location.lat()
        : address.geometry.location.lat,
    lng:
      typeof address.geometry.location.lng === 'function'
        ? address.geometry.location.lng()
        : address.geometry.location.lng,
    place_id: address.place_id,
  }
}

