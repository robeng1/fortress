import { MoneyType } from "../money"
export enum TxnKind {
  CREDIT = 0,
  DEBIT = 1,
}
export interface TransactionType {
  transaction_id?: string
  transfer_id?: string
  account_id?: string
  amount?: MoneyType | null
  unit_amount?: number | string
  created_at?: string
  txn_kind?: TxnKind | keyof typeof TxnKind
}
export interface TransactionViewType {
  transaction_id: string
  transfer_id: string
  account_id: string
  minor_amount: number
  created_at: number
  txn_kind: string
  description: string
  currency: string
}

export interface TransactionListType {
  transactions?: TransactionType[]
  next_page_token?: string
}
