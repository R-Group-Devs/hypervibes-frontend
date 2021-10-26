import { useState, useEffect } from 'react';
import { getENS, ResolvedENS } from 'get-ens/dist/index';
import { getDefaultProvider } from '@ethersproject/providers';

export default (name: string) => {
  const [ens, setEns] = useState<Partial<ResolvedENS>>({});

  useEffect(() => {
    (async () => {
      const provider = getDefaultProvider();
      const res = await getENS(provider)(name);
      setEns(res);
    })();
  }, [name]);

  return ens;
};
