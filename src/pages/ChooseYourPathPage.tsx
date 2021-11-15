import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import CenteredContent from '../components/CenteredContent';
import heading from '../assets/images/headings/choose-your-path.svg';
import cardBack from '../assets/images/card-back.png';
import exploreRealmsHr from '../assets/images/explore-realms-hr.svg';
//import createRealmImage from '../assets/images/create-realm.png';
//import infuseNftImage from '../assets/images/infuse-nft.png';
//import claimTokensImage from '../assets/images/claim-tokens.png';
//import star from '../assets/images/star.svg';
//import plus from '../assets/images/plus.svg';
//import flag from '../assets/images/flag.svg';

const Container = styled.div`
  display: flex;
`;

const PageHeading = styled.img`
  margin: 3em 0 4em;
`;

const PathCard = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2em;
  padding: 14px;
  width: 29.25vh;
  height: 45vh;
  min-width: 200px;
  min-height: 305px;
  max-width: 332px;
  max-height: 508px;
  background: #1c1c1c;
  border: 1px solid #fff;
  border-radius: 30px;
  transition: all 0.2s;

  &:hover {
    outline: 1px solid #17ffe3;
    border-color: #17ffe3;
    box-shadow: 0 0 20px 4px #bcff67;
  }
`;

const CardBackImage = styled.img`
  width: 100%;
`;

const PathImage = styled.img<{ width?: string }>`
  width: ${({ width }) => (width ? width : '100%')};
`;

const PathLabel = styled.h3`
  margin-top: 2.5em;
  font-family: '3616 Grammastile', sans-serif;
  font-size: 10px;
  font-weight: 400;
  line-height: 16px;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const CardFlourish = styled.img<{ position: 'top' | 'bottom' }>`
  position: absolute;
  top: ${({ position }) => (position === 'top' ? '20px' : 'auto')};
  right: ${({ position }) => (position === 'top' ? '20px' : 'auto')};
  bottom: ${({ position }) => (position === 'bottom' ? '20px' : 'auto')};
  left: ${({ position }) => (position === 'bottom' ? '20px' : 'auto')};
  height: 9%;
`;

const ExploreRealmsHr = styled.img`
  margin-top: 45px;
`;

const ExploreRealmsLink = styled(Link)`
  margin-top: 15px;
  font-size: 14px;
  color: #bcff67;
`;

export default () => {
  const wallet = useWallet();

  return (
    <CenteredContent>
      <PageHeading src={heading} alt="Choose Your Path" />

      <Container>
        <StyledLink to="/realm/create">
          <PathCard>
            <CardBackImage src={cardBack} alt="Create Realm" />
          </PathCard>

          <PathLabel>
            Create a new
            <br />
            HyperVIBES realm
          </PathLabel>
        </StyledLink>

        <StyledLink to="/infuse">
          <PathCard>
            <CardBackImage src={cardBack} width="85%" alt="Infuse NFT" />
          </PathCard>

          <PathLabel>
            Infuse an NFT
            <br />
            with tokens
          </PathLabel>
        </StyledLink>

        <StyledLink to="/claim">
          <PathCard>
            <CardBackImage src={cardBack} alt="Claim Tokens" />
          </PathCard>

          <PathLabel>
            Claim tokens
            <br />
            from an NFT
          </PathLabel>
        </StyledLink>
      </Container>

      <ExploreRealmsHr src={exploreRealmsHr} alt="" />
      <ExploreRealmsLink
        to={`/${
          wallet.networkName === 'main'
            ? 'mainnet'
            : wallet.networkName ?? 'mainnet'
        }/realms`}
      >
        Explore Realms Instead
      </ExploreRealmsLink>
    </CenteredContent>
  );
};
