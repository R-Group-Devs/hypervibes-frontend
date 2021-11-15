import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';
import { Nft } from '../types';

interface QueryResult {
  nfts: Nft[];
}

export default (collection: string) => {
  const res = useHyperVibesSubgraph<QueryResult>(
    `collection.${collection}`,
    gql`
      query {
        nfts(
          where: {
            collection: "${collection}"
          }
        ) {
          tokenId
          tokenUri
          collection {
            address
          }
          infusions {
            balance
            lastClaimAtTimestamp
          }
        }
      }
    `
  );

  return res;
};
