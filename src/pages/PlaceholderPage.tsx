import styled from 'styled-components';
import CenteredContent from '../components/CenteredContent';

const H1 = styled.h1`
  margin-top: 0;
  margin-bottom: 0.25em;
  font-size: 18px;
  font-family: '3616 Grammastile', sans-serif;
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
    <H1>&#8725;&#8725; hypervibes &#8725;&#8725;</H1>
    <H2>coming soon</H2>
  </CenteredContent>
);
