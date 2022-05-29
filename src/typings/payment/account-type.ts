import { MoneyType } from "../money"

export enum AccountStatus {
  OPEN = 0,
  FROZEN = 1,
  CLOSED = 2,
}
export enum PaymentMode {
  BANK_CARD = 0,
  MOBILE_NETWORK = 1,
}

export interface BankCard {
  number?: string
  card_type?: string
  expiry_month?: string
  name?: string
  expiry_year?: string
  issuer_number?: string
  ccv?: string
}

export interface MobileWallet {
  merchant?: string
  name?: string
  number?: string
}

export interface Account {
  account_id?: string
  name?: string
  description?: string
  account_type?: string
  code?: string
  primary_user?: string
  secondary_users?: string[]
  status?: AccountStatus | keyof typeof AccountStatus
  credit_limit?: MoneyType | null
  balance?: MoneyType | null
  unit_balance?: number | string
  start_date?: string
  end_date?: string
  created_at?: string
  is_default_for_billing?: boolean
  payment_mode?: PaymentMode | keyof typeof PaymentMode
  card?: BankCard | null
  wallet?: MobileWallet | null
  key?: string
  label?: string
  account_kind?: string
  blocked_amount?: MoneyType | null
  // payment_data?: 'card' | 'wallet';
}

export enum TxnKind {
  CREDIT = 0,
  DEBIT = 1,
}

export interface Transaction {
  transaction_id: string
  transfer_id?: string
  account_id: string
  amount?: MoneyType | null
  unit_amount?: number | string
  created_at?: string
  txn_kind?: TxnKind | keyof typeof TxnKind
}
