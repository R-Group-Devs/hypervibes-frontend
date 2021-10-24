import { isAddress } from '@ethersproject/address';
import { UseFormReturn } from 'react-hook-form';
import TextInput from './TextInput';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  register: UseFormReturn['register'];
  errors: UseFormReturn['formState']['errors'];
}

export default ({ register, name, required, label, errors }: Props) => (
  <TextInput
    name={name}
    label={label}
    required={required}
    register={register}
    validate={{
      address: (value: string) => isAddress(value),
    }}
    errors={errors}
  />
);
