import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Collection } from '../types';
import { shortenAddress } from '../utils/address';

const Container = styled.div`
  padding: 1em 2em;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StyledLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

export default ({ id, address }: Collection) => (
  <StyledLink to={`collection/${id}/select-token`}>
    <Container>
      <h3>{shortenAddress(address)}</h3>
    </Container>
  </StyledLink>
);
