import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import Label from './Label';
import Input from './Input';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  min?: number;
  onChange?: (value: string) => void;
  validate?: (value: string) => boolean | string;
}

const Container = styled.div`
  position: relative;
`;

const StyledInput = styled(Input)`
  max-width: 270px;
  padding-top: 1.5em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  border-radius: 10px;
  border-width: 2px;
`;

const StyledLabel = styled(Label)`
  position: absolute;
  top: -0.5em;
  left: 1em;
  font-size: 12px;
  font-weight: 400;
  text-transform: none;
`;

export default ({
  name,
  label,
  required = false,
  min = 0,
  onChange,
  validate,
  ...rest
}: Props) => {
  const { register, formState } = useFormContext();

  return (
    <Container>
      <StyledLabel name={name} isRequired={required}>
        {label}
      </StyledLabel>

      <StyledInput
        type="text"
        id={name}
        hasError={formState.errors[name]}
        autoComplete="off"
        {...register(name, {
          required,
          onChange,
          validate: {
            isNumber: value => !!value?.match(/^[+-]?(\d*\.)?\d+$/),
            minValue: value => value === undefined || parseFloat(value) >= min,
            custom: value => !validate || validate(value),
          },
        })}
        {...rest}
      />

      <FormFieldErrorMessage error={formState.errors[name]} minValue={min} />
    </Container>
  );
};
