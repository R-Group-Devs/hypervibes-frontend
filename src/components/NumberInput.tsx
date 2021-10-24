import { UseFormReturn } from 'react-hook-form';
import Label from './Label';
import Input from './Input';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  register: UseFormReturn['register'];
  errors: UseFormReturn['formState']['errors'];
}

export default ({ register, name, label, required = false, errors, ...rest }: Props) => (
  <div>
    <Label name={name}>{label}</Label>

    <Input type="number" id={name} {...register(name, { required })} {...rest} />
    {errors[name] && errors[name].type === 'required' && <span>This field is required.</span>}
  </div>
);