import { BigNumber } from '@ethersproject/bignumber';

export interface Realm {
  id: string;
  name: string;
  description: string;
  token: {
    address: string;
  };
  minClaimAmount: string;
  minInfusionAmount: string;
  maxTokenBalance: BigNumber;
  requireNftIsOwned: boolean;
  allowAllCollections: boolean;
  allowPublicInfusion: boolean;
  allowPublicClaiming: boolean;
  allowMultiInfuse: boolean;
  infusions: Infusion[];
  realmCollections: { id: string; collection: Collection }[];
  realmInfusers: { id: string; account: Account }[];
  realmClaimers: { id: string; account: Account }[];
}

export interface Account {
  id: string;
  address: string;
}

export interface Collection {
  id: string;
  name: string;
  address: string;
  nfts: Nft[];
}

export interface Nft {
  collection: Collection;
  tokenId: string;
  tokenUri: string;
  infusions: Infusion[];
}

export interface Infusion {
  id: string;
  realm: Realm;
  balance: string;
  nft: Nft;
  lastClaimAtTimestamp: string;
}
