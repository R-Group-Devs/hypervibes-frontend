import { useCallback } from 'react';
import { utils } from 'ethers';
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

  const claimTokens = useCallback(
    async (claim: Claim) => {
      console.log(utils.parseUnits(claim.amount));
      return hyperVibesContract?.claim({
        realmId: claim.realmId,
        collection: claim.collection,
        tokenId: BigNumber.from(claim.tokenId),
        // TODO: get decimals from collection ERC-20
        amount: utils.parseUnits(claim.amount, 18),
      });
    },
    [hyperVibesContract]
  );

  return {
    claimTokens,
  };
};
