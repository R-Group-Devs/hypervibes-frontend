import { useCallback } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import useHyperVibesContract from './useHyperVibesContract';

export interface Infusion {
  realmId: number;
  collection: string;
  tokenId: number;
  infuser: string;
  dailyRate: number;
  amount: number;
}

export default () => {
  const hyperVibesContract = useHyperVibesContract();

  // TODO: get decimals from collection ERC-20
  const decimals = BigNumber.from(10).pow(18);

  const infuseNft = useCallback(
    async (infusion: Infusion) => {
      console.log(
        JSON.stringify(
          {
            realmId: infusion.realmId,
            collection: infusion.collection,
            tokenId: infusion.tokenId,
            infuser: infusion.infuser,
            dailyRate: BigNumber.from(infusion.dailyRate).mul(decimals),
            amount: BigNumber.from(infusion.amount).mul(decimals),
            comment: '',
          },
          null,
          2
        )
      );

      return hyperVibesContract?.infuse({
        realmId: infusion.realmId,
        collection: infusion.collection,
        tokenId: infusion.tokenId,
        infuser: infusion.infuser,
        dailyRate: BigNumber.from(infusion.dailyRate).mul(decimals),
        amount: BigNumber.from(infusion.amount).mul(decimals),
        comment: '',
      });
    },
    [hyperVibesContract, decimals]
  );

  return {
    infuseNft,
  };
};
