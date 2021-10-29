import styled from 'styled-components';
import { useFormContext, Validate } from 'react-hook-form';
import { get } from 'lodash';
import Label from './Label';
import Input from './Input';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  maxLength?: number;
  validate?: Record<string, Validate<string>>;
}

const Description = styled.p`
  margin: 0 0 0.5em;
  font-size: 14px;
  font-weight: 300;
`;

export default ({
  name,
  label,
  description,
  required = false,
  maxLength,
  validate,
  ...rest
}: Props) => {
  const { register, formState } = useFormContext();

  return (
    <div>
      {label && (
        <Label name={name} isRequired={required}>
          {label}
        </Label>
      )}

      {description && <Description>{description}</Description>}

      <Input
        type="text"
        id={name}
        hasError={get(formState.errors, name)}
        spellCheck={false}
        {...register(name, { required, maxLength, validate })}
        {...rest}
      />

      <FormFieldErrorMessage error={get(formState.errors, name)} maxLength={maxLength} />
    </div>
  );
};
