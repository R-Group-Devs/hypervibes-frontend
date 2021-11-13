import styled from 'styled-components';
import Card from './Card';
import { shortenAddress } from '../utils/address';
import { Collection } from '../types';

interface Props {
  collections: Collection[];
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  column-gap: 2em;
  row-gap: 2em;
`;

export default ({ collections }: Props) => (
  <Container>
    {collections.map(collection => (
      <Card
        key={collection.id}
        name={shortenAddress(collection.address)}
        url={`collection/${collection.id}/select-token`}
      />
    ))}
  </Container>
);
