import styled from 'styled-components';
import Nft from '../components/Nft';

const tokenIds = ['90467', '90468', '90472', '90473'];

const Container = styled.div`
  display: flex;
`;

export default () => (
  <Container>
    {tokenIds.map(tokenId => (
      <Nft
        key={tokenId}
        contractAddress="0xd07dc4262bcdbf85190c01c996b4c06a461d2430"
        tokenId={tokenId}
      />
    ))}
  </Container>
);
