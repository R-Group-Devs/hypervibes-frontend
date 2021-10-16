import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const H1 = styled.h1`
  margin-top: 0;
  margin-bottom: 0.25em;
  font-size: 28px;
  letter-spacing: 5px;
`;

const H2 = styled.h2`
  margin-bottom: 0;
  font-size: 16px;
  letter-spacing: 8px;
  color: rgba(255, 255, 255, 0.6);
`;

const PlaceholderPage = () => (
  <Container>
    <H1>404 not found :(</H1>
    <H2>
      <Link to="/">go back home</Link>
    </H2>
  </Container>
);

export default PlaceholderPage;
