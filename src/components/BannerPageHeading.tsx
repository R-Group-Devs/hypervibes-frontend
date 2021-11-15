import styled from 'styled-components';
import useMetadata from '../hooks/useMetadata';

interface Props {
  name: string;
  tokenUri: string;
}

const Banner = styled.div<{ src?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)),
    url(${({ src }) => src}) center center no-repeat;
  background-size: cover;
  z-index: -1;
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: center;
`;

const Subtitle = styled.div`
  font-size: 14px;
  text-align: center;
`;

export default ({ name, tokenUri }: Props) => {
  const { metadata, isLoading, isIdle } = useMetadata(tokenUri);

  if (isLoading || isIdle) {
    return null;
  }

  return (
    <>
      <Banner src={metadata?.image} />
      <Title>{name}</Title>
      <Subtitle>NFTs in this realm</Subtitle>
    </>
  );
};
