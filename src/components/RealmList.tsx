import styled from 'styled-components';
import RealmCard from './RealmCard';
import { Realm } from '../types';

interface Props {
  realms: Realm[];
}

const Container = styled.div`
  display: flex;
  column-gap: 1em;
`;

export default ({ realms }: Props) => (
  <Container>
    {realms.map((realm) => (
      <RealmCard key={realm.id} {...realm} />
    ))}
  </Container>
);
