import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { isAddress } from '@ethersproject/address';
import TextInput from './TextInput';
import useEns from '../hooks/useEns';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ResolvedAddress = styled.div`
  position: relative;
  top: -1em;
  font-size: 12px;
`;

export default ({ name, required, label }: Props) => {
  const { watch } = useFormContext();
  const value = watch(name);
  const { address } = useEns(value);

  return (
    <Container>
      <TextInput
        name={name}
        label={label}
        required={required}
        validate={{
          address: (value) => !value || isAddress(value) || value.endsWith('.eth'),
        }}
      />

      {address && (
        <ResolvedAddress>
          <strong>Resolved address</strong>: {address}
        </ResolvedAddress>
      )}
    </Container>
  );
};
