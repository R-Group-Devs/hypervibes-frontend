import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Realm } from '../types';

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

export default ({ id, name, description }: Realm) => (
  <StyledLink to={`realm/${id}/select-collection`}>
    <Container>
      <h3>{name}</h3>
      <h4>{description}</h4>
    </Container>
  </StyledLink>
);
