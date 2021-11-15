import { useWallet } from 'use-wallet';
import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';
import { Nft } from '../types';

interface QueryResult {
  account: {
    ownedNFTs: Nft[];
  };
}

export default () => {
  const { account } = useWallet();

  const res = useHyperVibesSubgraph<QueryResult>(
    'infusedNfts',
    gql`
      query {
        account(id: "${account?.toLowerCase()}") {
          id
          ownedNFTs {
            collection {
              id
              address
            }
            tokenId
            tokenUri
            infusions {
              realm {
                id
              }
            }
          }
        }
      }
    `,
    { enabled: !!account }
  );

  return {
    data: {
      infusedNfts: res.data?.account?.ownedNFTs,
    },
  };
};
