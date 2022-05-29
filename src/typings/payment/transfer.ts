import { MoneyType } from "../money"
export enum TransferKind {
  TRANSFER = 0,
  ALLOCATION = 1,
  SETTLEMENT = 2,
  RELEASE = 3,
}

export interface TransferType {
  transfer_id?: string
  transfer_kind?: TransferKind | keyof typeof TransferKind
  reference?: string
  source_id?: string
  destination_id?: string
  loopy?: boolean
  amount?: MoneyType | null
  unit_amount?: number | string
  parent_id?: string
  merchant_reference?: string
  description?: string
  authorisor_id?: string
  authorisor_name?: string
  created_at?: string
  is_system?: boolean
  system_name?: string
  system_metadata?: { [key: string]: string }
}
