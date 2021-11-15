import { useWallet } from 'use-wallet';
import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';
import { Realm } from '../types';

interface QueryResult {
  account: {
    realmInfusers: { realm: Realm }[];
  };
  realms: Realm[];
}

export default () => {
  const { account } = useWallet();

  const res = useHyperVibesSubgraph<QueryResult>(
    'infusibleRealms',
    gql`
      query {
        account(id: "${account?.toLowerCase()}") {
          id
          realmInfusers {
            id
            realm {
              id
              name
              description
              requireNftIsOwned
              infusions {
                nft {
                  tokenUri
                }
              }
            }
          }
        }
        realms(where: { allowPublicInfusion: true }) {
          id
          name
          description
          requireNftIsOwned
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

  const data = [
    ...(res.data?.account?.realmInfusers.map(
      infusibleRealm => infusibleRealm.realm
    ) || []),
    ...(res.data?.realms || []),
  ];

  return {
    ...res,
    data: res.data ? data : null,
  };
};
