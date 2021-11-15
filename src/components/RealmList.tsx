import styled from 'styled-components';
import RealmCard from './RealmCard';
import EmptyState from './EmptyState';
import { Realm } from '../types';

interface Props {
  realms: Realm[];
  url?: (realmId: string) => string;
  size?: 'sm' | 'lg';
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

export default ({ realms, url, size = 'sm' }: Props) => (
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
      <EmptyState>There are no realms.</EmptyState>
    )}
  </Container>
);
