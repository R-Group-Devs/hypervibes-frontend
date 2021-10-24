import { UseFormReturn } from 'react-hook-form';
import Label from './Label';
import Input from './Input';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  maxLength?: number;
  register: UseFormReturn['register'];
  errors: UseFormReturn['formState']['errors'];
}

export default ({ register, name, label, required = false, maxLength, errors, ...rest }: Props) => (
  <div>
    <Label name={name}>{label}</Label>

    <Input type="text" id={name} {...register(name, { required, maxLength })} {...rest} />
    {errors[name] && errors[name].type === 'required' && <span>This field is required.</span>}
    {errors[name] && errors[name].type === 'maxLength' && (
      <span>This field must be shorter than {maxLength} characters.</span>
    )}
  </div>
);
