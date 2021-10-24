import { UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import Label from './Label';

interface Props {
  name: string;
  id: string;
  label: string;
  required?: boolean;
  maxLength?: number;
  register: UseFormReturn['register'];
}

const RadioButton = styled.input`
  display: block;
`;

export default ({ register, id, name, label, required = false, ...rest }: Props) => (
  <>
    <Label name={id}>{label}</Label>

    <RadioButton type="radio" id={id} value={id} {...register(name, { required })} {...rest} />
  </>
);
