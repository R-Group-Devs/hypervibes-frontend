import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { NETWORKS } from '../constants/contracts';
import useListRealms from '../hooks/useListRealms';

interface Params {
  network: string;
}

const Container = styled.div``;

const RealmRow = styled.div``;

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
      <h1>browse realms - {network}</h1>
      <div>
        {data.realms.map(realm => (
          <RealmRow key={realm.id}>
            <div>
              {realm.id}:
              <Link to={`/${network}/realms/${realm.id}/nfts`}>
                {realm.name}
              </Link>
            </div>
            <div>
              description: {realm.description} <br />
              created: {realm.createdAtTimestamp}
              <br />
              token: {realm.token.name} ({realm.token.symbol})<br />
              nft: {realm.infusions[0]?.nft.tokenId}
              <hr />
            </div>
          </RealmRow>
        ))}
      </div>
    </Container>
  );
};
