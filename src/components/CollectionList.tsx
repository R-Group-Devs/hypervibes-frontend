import styled from 'styled-components';
import CollectionCard from './CollectionCard';
import { shortenAddress } from '../utils/address';
import { Collection } from '../types';

interface Props {
  collections: Collection[];
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export default ({ collections }: Props) => (
  <Container>
    {collections.map(collection => (
      <CollectionCard
        key={collection.id}
        name={collection.name || shortenAddress(collection.address)}
        tokenUri={collection.nfts[0]?.tokenUri}
        url={`collection/${collection.id}/select-token`}
      />
    ))}
  </Container>
);
