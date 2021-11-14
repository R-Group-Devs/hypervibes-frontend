export interface Realm {
  id: string;
  name: string;
  description: string;
  token: string;
  minInfusionAmount: string;
  requireNftIsOwned: boolean;
  allowAllCollections: boolean;
  allowPublicInfusion: boolean;
  allowPublicClaiming: boolean;
  allowMultiInfuse: boolean;
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
  address: string;
}

export interface Nft {
  collection: Collection;
  tokenId: string;
  infusions: Infusion[];
}

export interface Infusion {
  realm: Realm;
  balance: string;
  lastClaimAtTimestamp: string;
}
