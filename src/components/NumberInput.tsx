import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import Label from './Label';
import Input from './Input';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label: string;
  required?: boolean;
}

const Container = styled.div`
  position: relative;
`;

const StyledInput = styled(Input)`
  padding-top: 1.5em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  border: 2px solid #fff;
  border-radius: 10px;
  -moz-appearance: textfield;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const StyledLabel = styled(Label)`
  position: absolute;
  top: -0.5em;
  left: 1em;
  font-size: 12px;
  font-weight: 400;
  text-transform: none;
`;

export default ({ name, label, required = false, ...rest }: Props) => {
  const { register, formState } = useFormContext();

  return (
    <Container>
      <StyledLabel name={name} isRequired={required}>
        {label}
      </StyledLabel>

      <StyledInput
        type="number"
        id={name}
        hasError={formState.errors[name]}
        {...register(name, { required, valueAsNumber: true })}
        {...rest}
      />

      <FormFieldErrorMessage error={formState.errors[name]} />
    </Container>
  );
};
