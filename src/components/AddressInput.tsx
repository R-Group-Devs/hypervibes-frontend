import { isAddress } from '@ethersproject/address';
import TextInput from './TextInput';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
}

export default ({ name, required, label }: Props) => (
  <TextInput
    name={name}
    label={label}
    required={required}
    validate={{
      address: (value) => !value || isAddress(value),
    }}
  />
);
