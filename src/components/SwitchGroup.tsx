import React from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label: string;
  children: React.ReactNode;
}

const Container = styled.div`
  margin-top: 3em;
  margin-bottom: 0.5em;
`;

const RadioGroup = styled.div`
  display: flex;
  column-gap: 2em;
`;

const Label = styled.h3`
  margin-bottom: 1.5em;
  text-transform: uppercase;
`;

export default ({ name, label, children }: Props) => {
  const { formState } = useFormContext();

  return (
    <Container>
      <Label>{label}</Label>

      <RadioGroup>{children}</RadioGroup>
      <FormFieldErrorMessage error={formState.errors[name]} />
    </Container>
  );
};
