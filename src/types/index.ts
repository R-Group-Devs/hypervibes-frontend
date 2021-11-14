export interface Realm {
  id: string;
  name: string;
  description: string;
  token: string;
  minInfusionAmount: string;
  allowAllCollections: boolean;
  realmCollections: { id: string; collection: Collection }[];
}

export interface Collection {
  id: string;
  address: string;
}
