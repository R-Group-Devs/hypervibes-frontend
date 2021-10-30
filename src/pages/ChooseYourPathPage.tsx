import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CenteredContent from '../components/CenteredContent';
import heading from '../assets/images/headings/choose-your-path.svg';
import createRealmImage from '../assets/images/create-realm.png';
import infuseNftImage from '../assets/images/infuse-nft.png';
import claimTokensImage from '../assets/images/claim-tokens.png';

const Container = styled.div`
  display: flex;
  column-gap: 4em;
`;

const PageHeading = styled.img`
  margin: 3em 0 4em;
`;

const Path = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 2em;
  width: 32vh;
  height: 50vh;
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

const PathImage = styled.img`
  width: 100%;
`;

const PathLabel = styled.h3`
  margin-top: 1.5em;
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

export default () => {
  return (
    <CenteredContent>
      <PageHeading src={heading} alt="Choose Your Path" />

      <Container>
        <StyledLink to="/realm/create">
          <Path>
            <PathImage src={createRealmImage} alt="Create Realm" />
          </Path>

          <PathLabel>
            Create a new
            <br />
            HyperVIBES realm
          </PathLabel>
        </StyledLink>

        <StyledLink to="/infuse">
          <Path>
            <PathImage src={infuseNftImage} alt="Infuse NFT" />
          </Path>

          <PathLabel>
            Infuse an NFT
            <br />
            with tokens
          </PathLabel>
        </StyledLink>

        <StyledLink to="/claim">
          <Path>
            <PathImage src={claimTokensImage} alt="Claim Tokens" />
          </Path>

          <PathLabel>
            Claim tokens
            <br />
            from an NFT
          </PathLabel>
        </StyledLink>
      </Container>
    </CenteredContent>
  );
};
