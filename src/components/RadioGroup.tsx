import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label: string;
  children: React.ReactNode;
}

const Container = styled.div`
  margin-top: 2em;
  margin-bottom: 0.5em;
`;

const RadioGroup = styled.div`
  display: flex;
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
