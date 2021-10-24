import { UseFormReturn } from 'react-hook-form';
import Label from './Label';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  maxLength?: number;
  register: UseFormReturn['register'];
  errors: UseFormReturn['formState']['errors'];
}

export default ({ register, name, label, required, maxLength, errors, ...rest }: Props) => (
  <div>
    <Label name={name}>{label}</Label>

    <textarea id={name} {...register(name, { required, maxLength })} {...rest} />
    <FormFieldErrorMessage error={errors[name]} />
  </div>
);
