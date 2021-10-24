import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';

interface Props {
  name: string;
  label: string;
  children: React.ReactNode;
  errors: UseFormReturn['formState']['errors'];
}

const Container = styled.div`
  margin-bottom: 3em;
`;

const RadioGroup = styled.div`
  display: flex;
  column-gap: 2em;
`;

export default ({ name, label, children, errors }: Props) => (
  <Container>
    <h3>{label}</h3>

    <RadioGroup>{children}</RadioGroup>

    {errors[name] && errors[name].type === 'required' && <span>This field is required.</span>}
  </Container>
);