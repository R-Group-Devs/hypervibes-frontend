import styled from 'styled-components';

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
    <H1>&#8725;&#8725; hypervibes &#8725;&#8725;</H1>
    <H2>coming soon</H2>
  </Container>
);

export default PlaceholderPage;
