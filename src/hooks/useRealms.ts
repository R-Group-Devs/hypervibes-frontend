import { useWallet } from 'use-wallet';
import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';
import { Realm } from '../types';

interface QueryResult {
  realms: Realm[];
}

export default () => {
  const { account } = useWallet();

  const res = useHyperVibesSubgraph<QueryResult>(
    'realms',
    gql`
      query {
        realms {
          id
          name
          description
          infusions {
            nft {
              tokenUri
            }
          }
        }
      }
    `,
    { enabled: !!account }
  );

  return {
    ...res,
    data: res.data?.realms,
  };
};
