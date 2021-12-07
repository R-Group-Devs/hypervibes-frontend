import memoize from 'lodash/memoize';
import PQueue from 'p-queue';

// help a lil bit with ipfs throttling
const ipfsRequestQueue = new PQueue({ concurrency: 4 });

// resolve JSON from ipfs via hash, w/ concurrency management
export const fetchIpfsJson = memoize(
  async <T>(hashOrUri: string): Promise<T> => {
    const hash = extractIpfsHash(hashOrUri);

    if (!hash) {
      throw new Error(`invalid ipfs uri or hash: ${hashOrUri}`);
    }

    const uri = ipfsHashAsHttp(hash);
    const resp = await ipfsRequestQueue.add(() => fetch(uri));
    const json = await resp.json();
    return json;
  }
);

// if a uri is an ipfs-ish uri, convert it to a https featchable able
export const rewriteIpfsUri = (uri: string | undefined): string | undefined => {
  if (uri == null) return undefined;

  const isIpfsIo = /^https:\/\/ipfs.io\/ipfs/.test(uri);
  const isHttps = /^https:\/\//.test(uri);

  // if its not already https, or if its ipfs's public (slow/throttled) gateway,
  // then rewrite
  if (!isHttps || isIpfsIo) {
    const hash = extractIpfsHash(uri);
    return hash ? ipfsHashAsHttp(hash) : uri;
  }

  // else no-op
  return uri;
};

// fetchable https uri from an ipfs hash
export const ipfsHashAsHttp = (hash: string): string =>
  `https://ipfs.hypervibes.xyz/ipfs/${hash}`;

// attempt to extract ipfs hash from a uri
export const extractIpfsHash = (ipfsUri: string): string | undefined => {
  // if it ends with anything that looks like /ipfs/WHATEVER, assume thats the
  // hash
  let match = ipfsUri.match(/ipfs\/(.*)$/);

  // else, try assuming everything after the protocol part of the uri is the
  // hash if its ipfs://
  if (!match) {
    match = ipfsUri.match(/^ipfs:\/\/(.*)$/);
  }

  // else, see if its already a hash. greedy post Qm is because of /filename.ext
  // patterns, lots of stuff could be valid. might be a problem later
  if (!match) {
    match = ipfsUri.match(/^(Qm.*)$/);
  }

  // give up
  if (!match) {
    return undefined;
  }

  const [, hash] = match;
  return hash;
};
