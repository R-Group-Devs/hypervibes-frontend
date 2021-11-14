import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label: string;
  children: React.ReactNode;
}

const Container = styled.div`
  margin-top: 1.7em;
  margin-bottom: 0.5em;
`;

const SwitchGroup = styled.div`
  display: flex;
`;

const Label = styled.h3`
  margin-bottom: 1.5em;
  text-transform: uppercase;
  font-size: 18px;
`;

export default ({ name, label, children }: Props) => {
  const { formState } = useFormContext();

  return (
    <Container>
      <Label>{label}</Label>

      <SwitchGroup>{children}</SwitchGroup>
      <FormFieldErrorMessage error={formState.errors[name]} />
    </Container>
  );
};
