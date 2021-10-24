import { UseFormReturn } from 'react-hook-form';
import Label from './Label';
import Input from './Input';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label: string;
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
  <>
    <Label name={name} isRequired={required}>
      {label}
    </Label>

    <Input
      type="text"
      id={name}
      hasError={errors[name]}
      {...register(name, { required, maxLength, validate })}
      {...rest}
    />

    <FormFieldErrorMessage error={errors[name]} maxLength={maxLength} />
  </>
);
