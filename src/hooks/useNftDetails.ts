import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';
import { Nft } from '../types';

interface QueryResult {
  nfts: Nft[];
}

export default (realmId: string, collection: string, tokenId: string) => {
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
          tokenUri
          infusions (where: { realm: "${realmId}" }) {
            balance
            lastClaimAtTimestamp
          }
        }
      }
    `
  );

  const lastClaimAtTimestamp =
    res.data?.nfts[0]?.infusions[0]?.lastClaimAtTimestamp;

  return {
    data: {
      tokenUri: res.data?.nfts[0]?.tokenUri,
      lastClaimAtTimestamp,
    },
  };
};
