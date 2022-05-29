export interface AuthResponse {
  account_id?: string
  email?: string
  phone?: string
  username?: string
  verified_phone?: boolean
  verified_email?: boolean
  email_verification_required?: boolean
  phone_verification_required?: boolean
}
export interface Session {
  id?: string
  active?: boolean
  expires_at?: number | string
  authenticated_at?: number | string
  issued_at?: number | string
  logout_token?: string
  identity_id?: string
  created_at?: number | string
  updated_at?: number | string
  session_token?: string
  identity?: AuthResponse
}
