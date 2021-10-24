import React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  children: React.ReactNode;
}

const Container = styled.div``;

const InputGroup = styled.div`
  display: flex;
  column-gap: 2em;
`;

export default ({ label, children }: Props) => (
  <Container>
    <h3>{label}</h3>

    <InputGroup>{children}</InputGroup>
  </Container>
);
