import { UseFormReturn } from 'react-hook-form';
import Label from './Label';
import Input from './Input';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  register: UseFormReturn['register'];
  errors: UseFormReturn['formState']['errors'];
}

export default ({ register, name, label, required = false, errors, ...rest }: Props) => (
  <div>
    <Label name={name} isRequired={required}>
      {label}
    </Label>

    <Input
      type="number"
      id={name}
      hasError={errors[name]}
      {...register(name, { required, valueAsNumber: true })}
      {...rest}
    />
    <FormFieldErrorMessage error={errors[name]} />
  </div>
);
