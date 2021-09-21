// this requests a signed url from the backend service for image upload
import { storageURL } from 'app/endpoints/urls';
import { request } from 'utils/request';

export type SignedURL = {
  key: string;
  url: string;
};

export type SignedURLRequest = {
  ext: string;
  key: string;
  bucket: string;
  contentType: string;
};

export async function getSignedURL(
  body: SignedURLRequest,
): Promise<SignedURL | undefined> {
  try {
    const signed = await request(`${storageURL}/uploads/signed-url`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
    if (signed) {
      return signed as SignedURL;
    }
  } catch (err) {
    return undefined;
  }
}
