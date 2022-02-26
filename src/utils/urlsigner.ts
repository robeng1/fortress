import jsSHA from 'jssha';
import { Buffer } from 'buffer';
function hex2a(hexx) {
  const hex = hexx.toString(); //force conversion
  let str = '';
  for (var i = 0; i < hex.length; i += 2)
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  return str;
}

const b64EncodeURL = url => {
  return Buffer.from(url)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

// URL generator logic
export function makeURL(opts) {
  const encoded_url = b64EncodeURL(opts.url);
  const path =
    '/rs:' +
    opts.resize +
    ':' +
    opts.width +
    ':' +
    opts.height +
    ':' +
    opts.enlarge +
    '/g:' +
    opts.gravity +
    '/' +
    encoded_url +
    '.' +
    opts.extension;
  const sha = new jsSHA('SHA-256', 'BYTES');
  sha.setHMACKey(opts.key, 'HEX');
  sha.update(hex2a(opts.salt));
  sha.update(path);
  const hmac = sha
    .getHMAC('B64')
    .replace(/=/g, '')
    .replace(/\//g, '_')
    .replace(/\+/g, '-');
  return opts.proxy_url + '/' + hmac + path;
}

const key =
  '9e37d4f55ed740354dfca0e1237983bd01bc9de9f08587e587b8a1ec975ec66a775c796ef329c299f79cc40356bcdb9f68b8468a3f7f510f1162498927d4d4be';
const salt =
  'a938f5bf3a9dd43c8be546ac1a8d8ed879fa580e0a778dfb449fd907173bea8d4711b94f8eaec83fe1829f5a06c2137bf673613c3e89bc12330f241a2209ba3f';

const resize = 'fit';
const gravity = 'no';
const enlarge = 1;
const defaultExtension = 'jpg';

export const getURL = (
  url: string,
  width = 100,
  height = 100,
  extension = defaultExtension,
): string => {
  const opts = {
    url,
    width,
    height,
    extension,
    key,
    salt,
    resize,
    gravity,
    enlarge,
    proxy_url: 'https://cdn.reoplex.com',
  };
  const path = makeURL(opts);
  return `${path}`;
};
