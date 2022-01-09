import { useCallback } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import useHyperVibesContract from './useHyperVibesContract';

export interface Claim {
  realmId: string;
  collection: string;
  tokenId: string;
  amount: BigNumber;
}

export default () => {
  const hyperVibesContract = useHyperVibesContract();

  const claimTokens = useCallback(
    async (claim: Claim) => {
      return hyperVibesContract?.claim({
        realmId: claim.realmId,
        collection: claim.collection,
        tokenId: BigNumber.from(claim.tokenId),
        amount: claim.amount,
      });
    },
    [hyperVibesContract]
  );

  return {
    claimTokens,
  };
};
