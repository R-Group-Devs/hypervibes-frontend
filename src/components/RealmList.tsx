import styled from 'styled-components';
import RealmCard from './RealmCard';
import { Realm } from '../types';

interface Props {
  realms: Realm[];
  url?: (realmId: string) => string;
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const EmptyState = styled.div`
  width: 100%;
  text-align: center;
`;

export default ({ realms, url }: Props) => (
  <Container>
    {realms.length > 0 ? (
      <>
        {realms.map(realm => (
          <RealmCard
            key={realm.id}
            name={realm.name}
            tokenUri={realm.infusions[0]?.nft?.tokenUri}
            url={url ? url(realm.id) : `realm/${realm.id}/select-collection`}
          />
        ))}
      </>
    ) : (
      <EmptyState>There are no realms.</EmptyState>
    )}
  </Container>
);
