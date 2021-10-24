import { UseFormReturn } from 'react-hook-form';
import { get } from 'lodash';
import Label from './Label';
import Input from './Input';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  maxLength?: number;
  register: UseFormReturn['register'];
  validate?: Record<string, (value: string) => boolean>;
  errors: UseFormReturn['formState']['errors'];
}

export default ({
  register,
  name,
  label,
  required = false,
  maxLength,
  validate,
  errors,
  ...rest
}: Props) => (
  <div>
    {label && (
      <Label name={name} isRequired={required}>
        {label}
      </Label>
    )}

    <Input
      type="text"
      id={name}
      hasError={get(errors, name)}
      {...register(name, { required, maxLength, validate })}
      {...rest}
    />

    <FormFieldErrorMessage error={get(errors, name)} maxLength={maxLength} />
  </div>
);
