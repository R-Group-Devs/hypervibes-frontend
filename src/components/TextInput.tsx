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
  errors: UseFormReturn['formState']['errors'];
}

export default ({ register, name, label, required = false, maxLength, errors, ...rest }: Props) => (
  <>
    <Label name={name} isRequired={required}>
      {label}
    </Label>

    <Input
      type="text"
      id={name}
      hasError={errors[name]}
      {...register(name, { required, maxLength })}
      {...rest}
    />

    <FormFieldErrorMessage error={errors[name]} maxLength={maxLength} />
  </>
);
