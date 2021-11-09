import styled from 'styled-components';
import CollectionCard from './CollectionCard';
import { Collection } from '../types';

interface Props {
  collections: Collection[];
}

const Container = styled.div`
  display: flex;
  column-gap: 2em;
`;

export default ({ collections }: Props) => (
  <Container>
    {collections.map(collection => (
      <CollectionCard key={collection.id} {...collection} />
    ))}
  </Container>
);
