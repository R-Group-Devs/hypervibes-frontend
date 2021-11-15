import { useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useMetadata from '../hooks/useMetadata';
import fallbackImage from '../assets/images/fallback.png';

interface Props {
  name: string;
  url: string;
  tokenUri: string;
  size: 'sm' | 'lg';
}

const Container = styled.div<{ size: 'sm' | 'lg' }>`
  width: ${({ size }) => (size === 'sm' ? '134px' : '214px')};
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: 5.25em;
  display: inline-block;

  &:hover > *:first-child {
    outline: 4px solid #bcff67;
    box-shadow: 0 0 20px 0 #bcff67;
  }
`;

const Image = styled.div<{ src: string; size: 'sm' | 'lg' }>`
  width: ${({ size }) => (size === 'sm' ? '134px' : '214px')};
  height: ${({ size }) => (size === 'sm' ? '175px' : '302px')};
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

const Name = styled.div<{ size: 'sm' | 'lg' }>`
  margin-top: 12px;
  font-size: ${({ size }) => (size === 'sm' ? '12px' : '16px')};
  font-weight: ${({ size }) => (size === 'sm' ? 600 : 400)};
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default ({ name, url, tokenUri, size }: Props) => {
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
      <Container size={size}>
        <Image src={image} size={size} />
        <Name size={size}>{name}</Name>
      </Container>
    </StyledLink>
  );
};
