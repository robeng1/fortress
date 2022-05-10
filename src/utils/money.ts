import { MoneyType } from 'typings/money';
import { Dinero, dinero, toSnapshot } from 'dinero.js';
import { GHS, KES, NGN, RWF, UGX, Currency } from '@dinero.js/currencies';
import currency from 'currency.js';

export function dineroToM(mm: Dinero<number>): MoneyType {
  const { amount, currency } = toSnapshot(mm);
  return { amount, currency: currency.code };
}

export function mToDinero(mm: MoneyType): Dinero<number> {
  return dinero({ amount: mm.amount, currency: curr(mm.currency) });
}

export function currencyToM(mm: currency, code: string = 'GHS'): MoneyType {
  return { amount: mm.value * 100, currency: code };
}

export function formatCurrency(mm: currency, code: string = 'GHS'): string {
  return mm.format({ symbol: symbol(code) });
}

export function mToCurrency(mm: MoneyType | null | undefined): currency {
  return currency(mm?.amount || 0, { fromCents: true });
}

export function sToCurrency(mm: string): currency {
  return currency(mm || 0);
}

export function mToS(mm: MoneyType | null | undefined): string {
  return mToCurrency(mm).toString();
}

export function sToM(m: string | number, c: string = 'GHS'): MoneyType {
  const d = currency(m);
  return { amount: d.intValue, currency: c };
}
export function sToMFromCents(m: string | number, c: string = 'GHS'): MoneyType {
  const d = currency(m, { fromCents: true});
  return { amount: d.intValue, currency: c, };
}

export function formatPesosMoney(
  m: string | number,
  c: string = 'GHS',
): string {
  const d = currency(m, { fromCents: true });
  return d.format({ symbol: symbol(c) });
}

export function pesosRawMoney(m: string | number): string {
  const d = currency(m, { fromCents: true });
  return d.toString();
}

export function mToSFormatted(mm: MoneyType | null | undefined): string {
  return mToCurrency(mm).format({
    symbol: symbol(mm?.currency || 'GHS'),
  });
}

function curr(code: string): Currency<number> {
  switch (code) {
    case 'GHS': {
      return GHS;
    }
    case 'NGN': {
      return NGN;
    }
    case 'KES': {
      return KES;
    }
    case 'RWF': {
      return RWF;
    }
    case 'UGX': {
      return UGX;
    }
    default:
      return GHS;
  }
}

function symbol(c: string): string {
  switch (c) {
    case 'GHS':
      return 'GH₵'
    case 'USD':
      return '$'
    default:
      return c
  }
}

