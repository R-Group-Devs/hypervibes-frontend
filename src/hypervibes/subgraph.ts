import { BigNumber } from 'ethers';
import request, { gql } from 'graphql-request';
import { getChainInfo } from './constants';

export interface GetIndexedInfusionsInput {
  collection: string;
  tokenId: BigNumber;
}

export interface GetIndexedInfusionsOutput {
  id: string;
  collection: string;
  tokenId: BigNumber;
  tokenUri: string;
  currentOwner: string;
  infusions: Array<{
    id: string;
    realm: {
      id: BigNumber;
      name: string;
      dailyRate: BigNumber;
      token: {
        address: string;
        symbol: string;
        name: string;
        decimals: number;
      };
    };
    initialInfusionBy: string;
    initialInfusionAmount: BigNumber;
    currentBalance: BigNumber;
    lastClaimTimestamp: BigNumber;
  }>;
}

const infusionsQuery = gql`
  query getInfusions($ids: [ID!]!) {
    nfts(where: { id_in: $ids }) {
      id
      tokenId
      tokenUri
      owner {
        id
        address
      }
      collection {
        id
        address
        name
        symbol
      }
      infusions {
        id
        balance
        lastClaimAtTimestamp
        realm {
          id
          name
          description
          dailyRate
          token {
            id
            address
            name
            symbol
            decimals
          }
        }
        # only query for first infusion
        events(first: 1, orderBy: createdAtTimestamp, orderDirection: asc) {
          id
          eventType
          createdAtTimestamp
          createdAtBlock
          msgSender {
            id
            address
          }
          target {
            id
            address # infuser
          }
          amount
        }
      }
    }
  }
`;

// WARN: the assumption about the ID format isn't great here
const computeNftId = (datum: { collection: string; tokenId: BigNumber }) =>
  `${datum.collection}-${datum.tokenId.toString()}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toProjectedInfusionInfo = (item: any): GetIndexedInfusionsOutput => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const infusions = item.infusions.map((infusion: any) => {
    const { token } = infusion.realm;
    const [event] = infusion.events;
    if (event == null) throw new Error('missing initial infusion event');
    const entry: GetIndexedInfusionsOutput['infusions'][0] = {
      id: infusion.id,
      realm: {
        id: BigNumber.from(infusion.realm.id),
        name: infusion.realm.name,
        dailyRate: BigNumber.from(infusion.realm.dailyRate),
        token: {
          address: token.address ?? '',
          symbol: token.symbol ?? '',
          name: token.name ?? '',
          decimals: token.decimals,
        },
      },
      currentBalance: BigNumber.from(infusion.balance),
      lastClaimTimestamp: BigNumber.from(infusion.lastClaimAtTimestamp),
      initialInfusionAmount: BigNumber.from(event.amount),
      initialInfusionBy: event.target.address,
    };

    return entry;
  });

  const mapped: GetIndexedInfusionsOutput = {
    id: item.id,
    collection: item.collection.address,
    tokenId: BigNumber.from(item.tokenId),
    tokenUri: item.tokenUri,
    currentOwner: item.owner.address,
    infusions,
  };

  return mapped;
};

/**
 * get indexed information about a batch of NFTs
 *
 * can be used when there is a list of known NFTs presented in a UI (eg, a token
 * grid UX) and you want to know if it has been infused in ANY realm
 */
export const batchGetIndexedInfusions = async (
  batch: GetIndexedInfusionsInput[],
  chainId: number
): Promise<GetIndexedInfusionsOutput[]> => {
  const { subgraph } = getChainInfo(chainId);

  const ids = batch.map(computeNftId);
  const resp = await request(subgraph, infusionsQuery, { ids });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nfts: any[] = resp.nfts;

  const projected = nfts.map(toProjectedInfusionInfo);
  const outputLookup = new Map(projected.map(nft => [computeNftId(nft), nft]));
  const ordered = batch.map(datum => {
    const projected = outputLookup.get(computeNftId(datum));
    if (!projected) throw new Error('batch input output mismatch');
    return projected;
  });

  return ordered;
};
