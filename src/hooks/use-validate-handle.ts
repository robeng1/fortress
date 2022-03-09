import { domainURL } from 'endpoints/urls';
import { request } from 'utils/request';

export function useHandleValidator() {
  const isHandleUnique = async (handle?: string): Promise<boolean> => {
    if (!handle) return false;
    const requestURL = `${domainURL}/ask?domain=${handle}.myreoplex.com`;
    let alreadyTaken = false;
    try {
      const val: boolean = await request(requestURL);
      alreadyTaken = val;
    } catch (e) {
      alreadyTaken = false;
    }
    return alreadyTaken;
  };
  return {
    isHandleUnique,
  };
}
