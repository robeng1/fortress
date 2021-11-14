import { MoneyType } from 'app/models/money';

export default class money {
  static pad = (nanos: number): string | number => {
    if (nanos < 10) {
      let s = String(nanos);
      while (s.length < 2) {
        s = `0${s}`;
      }
      return s;
    }
    return nanos;
  };

  static sum = (x: MoneyType, b: MoneyType) => {
    const a: MoneyType = { ...x };
    a.units += b.units;
    a.nanos += b.nanos;
    while (a.nanos >= 100) {
      a.units += 1;
      a.nanos -= 100;
    }
    a.currency_code =
      a.currency_code !== '' ? a.currency_code : b.currency_code;
    return a;
  };

  static cm = (a: MoneyType, d: number, code: string) => {
    a.units = 0;
    a.nanos = 0;
    while (d >= 100) {
      a.units += 1;
      d -= 100;
    }
    a.nanos = d;
    a.currency_code = code;
    return a;
  };

  static parseInt = (d: number, code: string): MoneyType => {
    const a: MoneyType = { currency_code: code, units: 0, nanos: 0 };
    while (d >= 100) {
      a.units += 1;
      d -= 100;
    }
    a.nanos = d;
    a.currency_code = code;
    return a;
  };

  static parseDouble = (str: string, code: string): MoneyType => {
    let d = parseFloat(str);
    const a: MoneyType = { currency_code: code, units: 0, nanos: 0 };
    while (d >= 1) {
      a.units += 1;
      d -= 1;
    }
    a.nanos = d * 100;
    a.currency_code = code;
    return a;
  };

  static doubleToMoney = (d: number, code: string): MoneyType => {
    const a: MoneyType = { currency_code: code, units: 0, nanos: 0 };
    while (d >= 1) {
      a.units += 1;
      d -= 1;
    }
    a.nanos = d * 100;
    a.currency_code = code;
    return a;
  };

  static toDouble = (x: MoneyType): number => {
    const str = `${x.units}.${x.nanos}`;
    return parseFloat(str);
  };

  static valuesToString = (units: number, nanos: number): string => {
    return `${units}.${nanos}`;
  };

  static intToString = (d: number, code: string): string => {
    const parsed = money.parseInt(d, code);
    return `${parsed.currency_code}${parsed.units}.${money.pad(parsed.nanos)}`;
  };
  static toString = (x: MoneyType): string => {
    return `${x.currency_code} ${x.units}.${money.pad(x.nanos)}`;
  };

  static toInt = (a: MoneyType): number => {
    return a.units * 100 + a.nanos;
  };

  static subtract = (x: MoneyType, b: MoneyType): MoneyType => {
    const a = { ...x };
    const as = money.toInt(a);
    const bs = money.toInt(b);
    const d = as - bs;
    // don't ever entertain negative values for this use case
    if (d < 0) {
      a.units = 0;
      a.nanos = 0;
      return a;
    }
    return money.parseInt(d, x.currency_code);
  };

  static multiply = (x: MoneyType, b: number): MoneyType => {
    const a = { ...x };
    const as = money.toInt(a);
    const d = as * b;
    return money.parseInt(d, x.currency_code);
  };

  static equals = (a: MoneyType, b: MoneyType): boolean =>
    a.units === b.units && a.nanos === b.nanos;

  static lessThan = (a: MoneyType, b: MoneyType): boolean =>
    // short circuit
    a.units < b.units || (a.units === b.units && a.nanos < b.nanos);

  static greaterThan = (a: MoneyType, b: MoneyType): boolean =>
    // short circuit
    a.units > b.units || (a.units === b.units && a.nanos > b.nanos);

  static isZero = (a: MoneyType): boolean => a.units === 0 && a.nanos === 0;

  static Zero = () => ({
    units: 0,
    nanos: 0,
    currency_code: '',
  });
}
