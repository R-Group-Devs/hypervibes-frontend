import styled from 'styled-components';
import { BigNumber } from 'ethers';
import { Link } from 'react-router-dom';
import useMetadata from '../hooks/useMetadata';
import InfusionTicker from '../components/InfusionTicker';
import fallbackImage from '../assets/images/fallback.png';

interface Props {
  chainId?: number;
  realmId?: BigNumber;
  collection?: string;
  tokenId?: BigNumber;
  url: string;
  tokenUri: string;
  size?: 'sm' | 'lg';
  showClaimableAmount?: boolean;
}

const Container = styled.div`
  margin-left: 1em;
  margin-right: 1em;
  margin-bottom: 2em;
  display: inline-block;

  &:hover img {
    outline: 4px solid #bcff67;
    box-shadow: 0 0 20px 0 #bcff67;
  }
`;

const Image = styled.img<{ size: 'sm' | 'lg' }>`
  width: ${({ size }) => (size === 'sm' ? '136px' : '270px')};
  height: ${({ size }) => (size === 'sm' ? '136px' : '270px')};
  border-radius: 12px;
  outline: 4px solid transparent;
  box-shadow: none;
  transition: all 0.2s;
`;

const Name = styled.div`
  margin: 12px 0 8px;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
`;

const StyledLink = styled(Link)`
  color: #fff;

  &:hover ${Name} {
    color: #bcff67;
    text-decoration: none;
  }
`;

export default ({
  chainId,
  realmId,
  collection,
  tokenId,
  url,
  tokenUri,
  size = 'sm',
  showClaimableAmount = true,
}: Props) => {
  const { metadata, isLoading } = useMetadata(tokenUri);

  return (
    <StyledLink to={url}>
      <Container>
        {!isLoading && (
          <>
            <Image src={metadata?.image || fallbackImage} size={size} alt="" />
            <Name>{metadata?.name}</Name>

            {showClaimableAmount &&
              chainId &&
              realmId &&
              collection &&
              tokenId && (
                <InfusionTicker
                  chainId={chainId}
                  realmId={realmId}
                  collection={collection}
                  tokenId={tokenId}
                />
              )}
          </>
        )}
      </Container>
    </StyledLink>
  );
};
