import styled from 'styled-components';
import { useFormContext, Validate } from 'react-hook-form';
import Label from './Label';
import Input from './Input';
import FormFieldErrorMessage from './FormFieldErrorMessage';
import { getDeep } from '../utils/object';

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
        hasError={getDeep(formState.errors, name)}
        spellCheck={false}
        autoComplete="off"
        {...register(name, { required, maxLength, validate })}
        {...rest}
      />

      <FormFieldErrorMessage
        error={getDeep(formState.errors, name)}
        maxLength={maxLength}
      />
    </div>
  );
};
