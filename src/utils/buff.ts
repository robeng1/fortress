import { Buffer } from "buffer"

export const b64Encode = (d: any): string => {
  return Buffer.from(JSON.stringify(d)).toString("base64")
}

export const encodeBuf = (d: any): Buffer => {
  return Buffer.from(JSON.stringify(d))
}

export const base64Decode = (
  b64: string
): Record<string, any> | Record<string, any>[] => {
  return JSON.parse(Buffer.from(b64, "base64").toString("utf8"))
}

export const decodeBuf = (
  buf: Buffer
): Record<string, any> | Record<string, any>[] | undefined => {
  if (!buf) return undefined
  if (buf.byteLength === 0) return undefined
  if (buf.length === 0) return undefined
  return JSON.parse(buf.toString("utf8"))
}
