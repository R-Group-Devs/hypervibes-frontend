import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CenteredContent from './CenteredContent';

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

export default () => (
  <CenteredContent>
    <H1>something went wrong :(</H1>
    <H2>
      <Link to="/">go back home</Link>
    </H2>
  </CenteredContent>
);
