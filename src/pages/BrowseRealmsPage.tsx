import { useParams } from 'react-router';
import styled from 'styled-components';
import useListRealms from '../hooks/useListRealms';
import RealmList from '../components/RealmList';
import { NETWORKS } from '../constants/contracts';
import heading from '../assets/images/headings/explore-realms.svg';

interface Params {
  network: string;
}

const Container = styled.div`
  text-align: center;
`;

const PageHeading = styled.img`
  margin-bottom: 75px;
`;

export default () => {
  const { network } = useParams<Params>();
  const chainId = NETWORKS[network];
  const { data, isLoading, isError } = useListRealms(chainId);

  if (isError) {
    return <p>error fetching realms</p>;
  }

  if (isLoading) {
    return <p>loading realms...</p>;
  }

  if (data == null) {
    return null;
  }

  return (
    <Container>
      <PageHeading src={heading} alt="Explore Realms" />
      <RealmList
        realms={data.realms}
        url={realmId => `realms/${realmId}/nfts`}
        size="lg"
      />
    </Container>
  );
};
