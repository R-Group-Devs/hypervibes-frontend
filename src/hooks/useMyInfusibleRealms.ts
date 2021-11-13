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
        realms(where: { allowPublicInfusion: true }) {
          id
          name
          description
        }
        account(id: "${account?.toLowerCase()}") {
          id
          realmInfusers {
            id
            realm {
              id
              name
              description
            }
          }
        }
      }
    `,
    { enabled: !!account }
  );

  return {
    data: [
      ...(res.data?.account?.realmInfusers.map(
        infusibleRealm => infusibleRealm.realm
      ) || []),
      ...(res.data?.realms || []),
    ],
  };
};
