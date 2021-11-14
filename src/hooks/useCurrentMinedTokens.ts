import { useState, useEffect } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import useHyperVibesContract from './useHyperVibesContract';

export default (realmId: string, collection: string, tokenId: string) => {
  const hyperVibesContract = useHyperVibesContract();
  const [currentMinedTokens, setCurrentMinedTokens] = useState(
    BigNumber.from(0)
  );

  useEffect(() => {
    (async () => {
      try {
        if (currentMinedTokens.isZero()) {
          const res = await hyperVibesContract?.currentMinedTokens(
            realmId,
            collection,
            tokenId
          );
          setCurrentMinedTokens(BigNumber.from(res));
        }
      } catch (e) {
        setCurrentMinedTokens(BigNumber.from(0));
      }
    })();
  }, [hyperVibesContract, currentMinedTokens, realmId, collection, tokenId]);

  return currentMinedTokens;
};
