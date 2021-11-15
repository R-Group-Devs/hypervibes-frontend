import memoize from 'lodash/memoize';
import PQueue from 'p-queue';

// help a lil bit with ipfs throttling
const ipfsRequestQueue = new PQueue({ concurrency: 1 });

// resolve JSON from ipfs via hash, w/ concurrency management
export const fetchIpfsJson = memoize(async <T>(hash: string): Promise<T> => {
  const resp = await ipfsRequestQueue.add(() =>
    fetch(`https://ipfs.io/ipfs/${hash}`)
  );
  const json = await resp.json();
  return json;
});
