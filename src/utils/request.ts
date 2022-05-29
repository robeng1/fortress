export class ResponseError extends Error {
  public response: Response

  constructor(response: Response) {
    super(response.statusText)
    this.response = response
  }
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response: Response) {
  if (response.status === 204 || response.status === 205) {
    return null
  }
  return response.json()
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new ResponseError(response)
  error.response = response
  const text = await response.text()
  const parsedText = JSON.parse(text)
  const parts = (parsedText["error"]["message"] as string).split("=")
  if (parts.length > 0) {
    throw new Error(parts[parts.length - 1])
  } else {
    throw new Error(text)
  }
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export async function request(
  url: string,
  options?: RequestInit
): Promise<{} | any | { err: ResponseError }> {
  const fetchResponse = await fetch(url, {
    ...options,
    headers: { ...options?.headers, "Content-Type": "application/json" },
    mode: "cors",
  })
  const response = await checkStatus(fetchResponse)
  return parseJSON(response)
}
