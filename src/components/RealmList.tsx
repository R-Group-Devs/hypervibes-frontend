import styled from 'styled-components';
import Card from './Card';
import { Realm } from '../types';

interface Props {
  realms: Realm[];
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  column-gap: 2em;
  row-gap: 2em;
`;

export default ({ realms }: Props) => (
  <Container>
    {realms.map(realm => (
      <Card
        key={realm.id}
        name={realm.name}
        url={`realm/${realm.id}/select-collection`}
      />
    ))}
  </Container>
);
