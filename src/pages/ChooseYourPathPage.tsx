import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CenteredContent from '../components/CenteredContent';
import heading from '../assets/images/headings/choose-your-path.svg';

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
          <Path></Path>

          <PathLabel>
            Create a new
            <br />
            HyperVIBES realm
          </PathLabel>
        </StyledLink>

        <StyledLink to="/infuse">
          <Path></Path>

          <PathLabel>
            Infuse an NFT
            <br />
            with tokens
          </PathLabel>
        </StyledLink>

        <StyledLink to="/claim">
          <Path></Path>

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
