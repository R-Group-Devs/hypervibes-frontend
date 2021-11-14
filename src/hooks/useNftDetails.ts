import { gql } from 'graphql-request';
import { BigNumber } from '@ethersproject/bignumber';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';
import { Nft } from '../types';

interface QueryResult {
  nfts: Nft[];
}

export default (collection: string, tokenId: string) => {
  // TODO: filter NFTs by realm ID
  const res = useHyperVibesSubgraph<QueryResult>(
    `collection.${collection}.${tokenId}`,
    gql`
      query {
        nfts(
          where: {
            collection: "${collection}"
            tokenId: "${tokenId}"
          }
        ) {
          infusions {
            balance
            lastClaimAtTimestamp
          }
        }
      }
    `
  );

  const lastClaimAtTimestamp =
    res.data?.nfts[0]?.infusions[0]?.lastClaimAtTimestamp;

  // TODO: compute across all infusion events
  // TODO: compute claimable amount, not just total balance
  const claimableAmount = res.data?.nfts[0]?.infusions[0]?.balance;

  return {
    data: {
      lastClaimAtTimestamp,
      claimableAmount: BigNumber.from(claimableAmount || 0),
    },
  };
};
