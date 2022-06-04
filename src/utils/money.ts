import { MoneyType } from "typings/money"
import currency from "currency.js"
import { formatValueWithCurrency } from "./utils"

export function currencyTom(mm: currency, code: string = "GHS"): MoneyType {
  return { amount: mm.value * 100, currency: code }
}

export function formatCurrency(mm: currency, code: string = "GHS"): string {
  return `${formatValueWithCurrency(mm.value, code)}`
}

export function mToCurrency(mm: MoneyType | null | undefined): currency {
  return currency(mm?.amount || 0, { fromCents: true })
}

export function sToCurrency(mm: string): currency {
  return currency(mm || 0)
}

export function mtos(mm: MoneyType | null | undefined): string {
  return mToCurrency(mm).toString()
}

export function stom(m: string | number, c: string = "GHS"): MoneyType {
  const d = currency(m)
  return { amount: d.intValue, currency: c }
}
export function sToMFromCents(
  m: string | number,
  c: string = "GHS"
): MoneyType {
  const d = currency(m, { fromCents: true })
  return { amount: d.intValue, currency: c }
}

export function formatPesosMoney(
  m: string | number,
  c: string = "GHS"
): string {
  const d = currency(m, { fromCents: true })
  return `${formatValueWithCurrency(d.value, c)}`
}

export function pesosRawMoney(m: string | number): string {
  const d = currency(m, { fromCents: true })
  return d.toString()
}

export function mToSFormatted(mm: MoneyType | null | undefined): string {
  return mToSFormattedK(mm)
}
export function mToSFormattedK(mm: MoneyType | null | undefined): string {
  return `${formatValueWithCurrency(
    mToCurrency(mm).value,
    mm?.currency || "GHS"
  )}`
}
