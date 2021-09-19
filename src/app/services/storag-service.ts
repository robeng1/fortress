// this requests a signed url from the backend service for image upload
import { storageApi } from 'app/api/axios';
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
    const signed = await request(`${storageApi}/uploads/signed-url`, {
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
