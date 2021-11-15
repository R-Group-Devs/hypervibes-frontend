import { useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useMetadata from '../hooks/useMetadata';
import fallbackImage from '../assets/images/fallback.png';

interface Props {
  name: string;
  url: string;
  tokenUri: string;
}

const Container = styled.div`
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: 5.25em;
  display: inline-block;

  &:hover > *:first-child {
    outline: 4px solid #bcff67;
    box-shadow: 0 0 20px 0 #bcff67;
  }
`;

const Image = styled.div<{ src: string }>`
  width: 214px;
  height: 302px;
  background: url(${({ src }) => src}) center center no-repeat,
    url(${fallbackImage}) center center no-repeat;
  background-size: cover;
  border-radius: 12px;
  border-top-left-radius: 250px;
  border-top-right-radius: 250px;
  outline: 4px solid transparent;
  box-shadow: none;
  transition: all 0.2s;
`;

const StyledLink = styled(Link)`
  color: #fff;

  &:hover {
    color: #bcff67;
    text-decoration: none;
  }
`;

const Name = styled.div`
  margin-top: 12px;
  width: 100%;
  padding-left: 6px;
  font-size: 16px;
  text-align: left;
`;

export default ({ name, url, tokenUri }: Props) => {
  const { metadata, isLoading } = useMetadata(tokenUri);
  const image = useMemo(() => {
    if (metadata?.image) {
      return metadata?.image;
    }

    if (!isLoading) {
      return fallbackImage;
    }

    return '';
  }, [metadata, isLoading]);

  return (
    <StyledLink to={url}>
      <Container>
        <Image src={image} />
        <Name>{name}</Name>
      </Container>
    </StyledLink>
  );
};
