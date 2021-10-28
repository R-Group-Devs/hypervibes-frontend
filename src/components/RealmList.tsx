import styled from 'styled-components';
import RealmCard from './RealmCard';
import { Realm } from '../types';

interface Props {
  realms: Realm[];
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 2em;
  row-gap: 2em;
`;

export default ({ realms }: Props) => (
  <Container>
    {realms.map((realm) => (
      <RealmCard key={realm.id} {...realm} />
    ))}
  </Container>
);
