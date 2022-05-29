import { domainURL, fortressURL, paymentURL, theKeepURL } from "endpoints/urls"

export const useReoplex = () => {
  const urls = {
    payments: paymentURL,
    application: fortressURL,
    users: theKeepURL,
    domains: domainURL,
  }

  return {
    urls,
  }
}
