import { useParams } from 'react-router';
import styled from 'styled-components';

interface Params {
  network: string;
  realmId: string;
}

const Container = styled.div``;

export default () => {
  const { network, realmId } = useParams<Params>();
  return (
    <Container>
      <p>
        browse nfts - {network}, realmId={realmId}
      </p>
    </Container>
  );
};
