import { fetchIpfsJson } from './ipfs';

export interface Metadata {
  name: string;
  description: string;
  image?: string;
  animationUrl?: string;
  externalUrl?: string;
}

// resolve metadata give a token URI
export const resolveMetadata = async (uri: string) => {
  // base64 encoded
  if (uri.match(/^data:application\/json;/)) {
    return parseBase64MetadataUri(uri);
  }

  // ipfs-style
  const match = uri.match(/ipfs\/(.*)$/);
  if (!match) {
    throw new Error('cannot resolve metadata');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fetched = await fetchIpfsJson<any>(match[1]);

  const projected: Metadata = {
    name: fetched.name ?? '',
    description: fetched.description ?? '',
    image: fetched.image ?? undefined,
    animationUrl: fetched.animation_url ?? undefined,
    externalUrl: fetched.external_url ?? undefined,
  };

  return projected;
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
