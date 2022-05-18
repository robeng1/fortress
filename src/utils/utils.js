import resolveConfig from 'tailwindcss/resolveConfig';
export const tailwindConfig = () => {
  // Tailwind config
  return resolveConfig('./src/css/tailwind.config.js');
};

export const hexToRGB = h => {
  let r = 0;
  let g = 0;
  let b = 0;
  if (h.length === 4) {
    r = `0x${h[1]}${h[1]}`;
    g = `0x${h[2]}${h[2]}`;
    b = `0x${h[3]}${h[3]}`;
  } else if (h.length === 7) {
    r = `0x${h[1]}${h[2]}`;
    g = `0x${h[3]}${h[4]}`;
    b = `0x${h[5]}${h[6]}`;
  }
  return `${+r},${+g},${+b}`;
};

export const formatValue = value =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

export const formatValueWithCurrency = (value, currency) =>
  Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    // maximumSignificantDigits: 3,
    maximumFractionDigits: 2, 
    minimumFractionDigits: 2,
    currencyDisplay: 'narrowSymbol',
    notation: 'compact',
    useGrouping: true,
  }).format(value);

export const formatThousands = value =>
  Intl.NumberFormat('en-US', {
    maximumSignificantDigits: 3,
    notation: 'compact',
  }).format(value);

export function formatDuration(intSeconds) {
  return zip(weekParts(intSeconds), ['wk', 'd', 'hr', 'min', 'sec'])
    .reduce(function (a, x) {
      return a.concat(x[0] ? [x[0].toString() + ' ' + x[1]] : []);
    }, [])
    .join(', ');
}

// weekParts :: Int -> [Int]
function weekParts(intSeconds) {
  return [undefined, 7, 24, 60, 60].reduceRight(
    function (a, x) {
      var intRest = a.remaining,
        intMod = isNaN(x) ? intRest : intRest % x;

      return {
        remaining: (intRest - intMod) / (x || 1),
        parts: [intMod].concat(a.parts),
      };
    },
    {
      remaining: intSeconds,
      parts: [],
    },
  ).parts;
}

// GENERIC ZIP

// zip :: [a] -> [b] -> [(a,b)]
function zip(xs, ys) {
  return xs.length === ys.length
    ? xs.map(function (x, i) {
      return [x, ys[i]];
    })
    : undefined;
}

export const objectify = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
};
