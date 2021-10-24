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
  margin-bottom: 1.5em;
`;

const RadioGroup = styled.div`
  display: flex;
  column-gap: 2em;
`;

export default ({ name, label, children }: Props) => {
  const { formState } = useFormContext();

  return (
    <Container>
      <h3>{label}</h3>

      <RadioGroup>{children}</RadioGroup>
      <FormFieldErrorMessage error={formState.errors[name]} />
    </Container>
  );
};
