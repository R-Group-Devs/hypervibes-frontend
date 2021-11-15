import { useCallback } from 'react';
import { utils } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import useHyperVibesContract from './useHyperVibesContract';

export interface Infusion {
  realmId: string;
  collection: string;
  tokenId: string;
  infuser: string;
  amount: string;
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
        // TODO: get decimals from collection ERC-20
        amount: utils.parseUnits(infusion.amount, 18),
        comment: '',
      });
    },
    [hyperVibesContract]
  );

  return {
    infuseNft,
  };
};
