import { useCallback } from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import useHyperVibesContract from './useHyperVibesContract';

export interface Claim {
  realmId: string;
  collection: string;
  tokenId: string;
  amount: string;
}

export default () => {
  const hyperVibesContract = useHyperVibesContract();

  // TODO: get decimals from collection ERC-20
  const decimals = BigNumber.from(10).pow(18);

  const claimTokens = useCallback(
    async (claim: Claim) => {
      return hyperVibesContract?.claim({
        realmId: claim.realmId,
        collection: claim.collection,
        tokenId: BigNumber.from(claim.tokenId),
        amount: BigNumber.from(claim.amount).mul(decimals),
      });
    },
    [hyperVibesContract, decimals]
  );

  return {
    claimTokens,
  };
};
