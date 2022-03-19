export interface AddressDataType {
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
}
export interface UserAddressType {
  data: AddressDataType;
  account_id?: string;
  is_default_for_shipping?: boolean;
  is_default_for_billing?: boolean;
  shipping_usages?: number;
  billing_usages?: number;
  hash?: string;
  created_at?: string;
  address_id?: string;
}
