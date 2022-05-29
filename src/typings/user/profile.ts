export interface ProfileType {
  account_id?: string
  first_name?: string
  last_name?: string
  email?: string
  profile_image?: string
  username?: string
  phone?: string
  interests?: string[]
  gender?: string
  skills_set?: string[]
}

export type RegisterLogInType = {
  identifier: string
  password: string
}
