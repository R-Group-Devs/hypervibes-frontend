import styled from 'styled-components';
import { useNft } from 'use-nft';

interface Props {
  contractAddress: string;
  tokenId: string;
}

const Container = styled.div`
  width: 25%;
`;

const ImageContainer = styled.div`
  display: flex;
  height: 400px;
  align-items: center;
`;

const Image = styled.img`
  width: 300px;
`;

export default ({ contractAddress, tokenId }: Props) => {
  const { loading, error, nft } = useNft(contractAddress, tokenId);

  if (loading) return <>Loading...</>;

  if (error || !nft) return <>Error.</>;

  return (
    <Container>
      <ImageContainer>
        <Image src={nft.image} alt={nft.name} />
      </ImageContainer>
      <h3>{nft.name}</h3>
    </Container>
  );
};
