import { ReactNode } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import RealmCard from './RealmCard';
import EmptyState from './EmptyState';
import SubmitButton from '../components/SubmitButton';
import { Realm } from '../types';

interface Props {
  realms: Realm[];
  url?: (realmId: string) => string;
  size?: 'sm' | 'lg';
  empty?: ReactNode;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

const Message = styled.div`
  margin-bottom: 1em;
`;

export default ({
  realms,
  url,
  size = 'sm',
  empty = 'There are no realms.',
}: Props) => (
  <Container>
    {realms && realms.length > 0 ? (
      <>
        {realms.map(realm => (
          <RealmCard
            key={realm.id}
            name={realm.name}
            tokenUri={realm.infusions[0]?.nft?.tokenUri}
            url={url ? url(realm.id) : `realm/${realm.id}/select-collection`}
            size={size}
          />
        ))}
      </>
    ) : (
      <EmptyState>
        <Message>{empty}</Message>

        <Link to="/realm/create">
          <SubmitButton>Create a Realm</SubmitButton>
        </Link>
      </EmptyState>
    )}
  </Container>
);
