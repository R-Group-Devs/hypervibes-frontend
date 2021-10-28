import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  column-gap: 2em;
`;

const Path = styled.div`
  display: flex;
  align-items: center;
  padding: 1em 2em;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

export default () => {
  return (
    <>
      <h2>Choose Your Path</h2>

      <Container>
        <StyledLink to="/realm/create">
          <Path>
            <h3>Create a new HyperVIBES realm</h3>
          </Path>
        </StyledLink>

        <StyledLink to="/infuse">
          <Path>
            <h3>Infuse an NFT with tokens</h3>
          </Path>
        </StyledLink>

        <StyledLink to="/claim">
          <Path>
            <h3>Claim tokens from an NFT</h3>
          </Path>
        </StyledLink>
      </Container>
    </>
  );
};
