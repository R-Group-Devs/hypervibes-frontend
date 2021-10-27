export interface Realm {
  id: string;
  name: string;
  description: string;
  realmCollections: { id: string; collection: Collection }[];
}

export interface Collection {
  id: string;
  address: string;
}
