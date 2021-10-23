import { UseFormReturn } from 'react-hook-form';
import Label from './Label';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  maxLength?: number;
  register: UseFormReturn['register'];
  errors: UseFormReturn['formState']['errors'];
}

export default ({ register, name, label, required, maxLength, errors, ...rest }: Props) => (
  <>
    <Label name={name}>{label}</Label>

    <textarea id={name} {...register(name, { required, maxLength })} {...rest} />
    {errors[name] && errors[name].type === 'required' && <span>This field is required.</span>}
    {errors[name] && errors[name].type === 'maxLength' && (
      <span>This field must be shorter than {maxLength} characters.</span>
    )}
  </>
);
