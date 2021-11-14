import { useWallet } from 'use-wallet';
import { gql } from 'graphql-request';
import useHyperVibesSubgraph from './useHyperVibesSubgraph';

export default () => {
  const { account } = useWallet();

  const data = useHyperVibesSubgraph(
    'realms',
    gql`
      query {
        account(id: "${account?.toLowerCase()}") {
          realmAdmins {
            realm {
              id
              name
              description
              createdAt
              token {
                address
              }
              admins {
                createdAt
                account {
                  id
                }
              }
              infusers {
                createdAt
                account {
                  id
                }
              }
            }
          }
        }
      }
    `,
    { enabled: !!account }
  );

  return data;
};
