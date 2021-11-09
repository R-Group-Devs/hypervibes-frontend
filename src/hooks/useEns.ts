import { useState, useEffect } from 'react';
import { useWallet } from 'use-wallet';
import { getENS, ResolvedENS } from 'get-ens';
import { JsonRpcProvider } from '@ethersproject/providers';
import { RPC_URLS } from '../constants/rpc';

export default (name: string) => {
  const { chainId = 1 } = useWallet();
  const [ens, setEns] = useState<Partial<ResolvedENS>>({});
  const rpcUrl = RPC_URLS[chainId];

  useEffect(() => {
    (async () => {
      try {
        if (name.endsWith('.eth')) {
          const provider = new JsonRpcProvider(rpcUrl);
          const res = await getENS(provider)(name);
          setEns(res);
        } else {
          setEns({});
        }
      } catch (e) {
        setEns({});
      }
    })();
  }, [name, rpcUrl]);

  return ens;
};
