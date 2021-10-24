import { UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import Label from './Label';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  register: UseFormReturn['register'];
  errors: UseFormReturn['formState']['errors'];
}

const Input = styled.input`
  display: block;
`;

export default ({ register, name, label, required = false, errors, ...rest }: Props) => (
  <>
    <Label name={name}>{label}</Label>

    <Input type="number" id={name} {...register(name, { required })} {...rest} />
    {errors[name] && errors[name].type === 'required' && <span>This field is required.</span>}
  </>
);
