import memoize from 'lodash/memoize';
import { rewriteIpfsUri, extractIpfsHash, fetchIpfsJson } from './ipfs';

export interface Metadata {
  name: string;
  description: string;
  image?: string;
  animationUrl?: string;
  externalUrl?: string;
}

// resolve metadata give a token URI
export const resolveMetadata = memoize(async (uri: string) => {
  // base64 encoded
  if (uri.match(/^data:application\/json;/)) {
    return parseBase64MetadataUri(uri);
  }

  // ipfs-style metadata
  const hash = extractIpfsHash(uri);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fetched: any;

  // use throttled ipfs fetch if ipfs, else str8 fetch it
  if (hash) {
    fetched = await fetchIpfsJson(hash);
  } else {
    const resp = await fetch(uri);
    fetched = await resp.json();
  }

  const projected: Metadata = {
    name: fetched.name ?? '',
    description: fetched.description ?? '',
    image: resolveMetadataImage(fetched),
    animationUrl: fetched.animation_url
      ? rewriteIpfsUri(fetched.animation_url)
      : undefined,
    externalUrl: fetched.external_url ?? undefined,
  };

  return projected;
});

// given metadata blob, figure out the image we want to use
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolveMetadataImage = (payload: any): string | undefined => {
  // various metadata formats, trying to be accomodating
  const image = payload.image ?? payload.imageUrl ?? payload.image_url;

  if (image != null) {
    return rewriteIpfsUri(image);
  }

  return undefined;
};

// parse base64 encoded URI schemes
const parseBase64MetadataUri = (uri: string): Metadata => {
  const [, encoded] = uri.match(/^data:application\/json;base64,(.*)$/) ?? [];
  const payload = JSON.parse(atob(encoded));

  const metadata: Metadata = {
    name: payload.name ?? '',
    description: payload.description ?? '',
    image: payload.image ?? undefined,
    animationUrl: payload.animation_url ?? undefined,
    externalUrl: payload.external_url ?? undefined,
  };

  return metadata;
};
