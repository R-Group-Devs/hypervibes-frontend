import React from 'react';
import styled from 'styled-components';

interface Props {
  label: string;
  description?: string;
  children: React.ReactNode;
}

const Container = styled.div``;

const Label = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
`;

const InputGroup = styled.div`
  display: flex;
  column-gap: 2em;
  margin-bottom: 2em;
`;

const Description = styled.p`
  margin-bottom: 2em;
`;

export default ({ label, description, children }: Props) => (
  <Container>
    <Label>{label}</Label>

    {description && <Description>{description}</Description>}

    <InputGroup>{children}</InputGroup>
  </Container>
);
