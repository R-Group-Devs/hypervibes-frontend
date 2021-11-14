import { useParams } from 'react-router';
import styled from 'styled-components';

interface Params {
  network: string;
  collection: string;
  tokenId: string;
}

const Container = styled.div``;

export default () => {
  const { network, collection, tokenId } = useParams<Params>();

  return (
    <Container>
      <p>
        nft detail - {network}, nft = {collection}, token id={tokenId}
      </p>
    </Container>
  );
};
