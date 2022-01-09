import { useCallback } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import useHyperVibesContract from './useHyperVibesContract';

export interface Infusion {
  realmId: string;
  collection: string;
  tokenId: string;
  infuser: string;
  amount: BigNumber;
}

export default () => {
  const hyperVibesContract = useHyperVibesContract();

  const infuseNft = useCallback(
    async (infusion: Infusion) => {
      return hyperVibesContract?.infuse({
        realmId: infusion.realmId,
        collection: infusion.collection,
        tokenId: BigNumber.from(infusion.tokenId),
        infuser: infusion.infuser,
        amount: infusion.amount,
        comment: '',
      });
    },
    [hyperVibesContract]
  );

  return {
    infuseNft,
  };
};
