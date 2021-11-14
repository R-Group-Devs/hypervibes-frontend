import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';
import { isAddress } from '@ethersproject/address';
import TextInput from './TextInput';
import useEns from '../hooks/useEns';
import useErc20TokenDetails from '../hooks/useErc20TokenDetails';

interface Props {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  showTokenSymbol?: boolean;
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ResolvedAddress = styled.div`
  position: absolute;
  bottom: 0.35em;
  font-size: 12px;
`;

const TokenSymbol = styled.div`
  position: absolute;
  right: 0;
  bottom: 2.4em;
  padding: 2em 0.5em 0 2em;
  background: #000;
`;

export default ({
  name,
  label,
  description,
  required,
  showTokenSymbol,
}: Props) => {
  const { watch } = useFormContext();
  const value = watch(name);
  const { address } = useEns(value);
  const { symbol } = useErc20TokenDetails(value);

  return (
    <Container>
      <TextInput
        name={name}
        label={label}
        description={description}
        required={required}
        validate={{
          address: value => !value || isAddress(value),
        }}
      />

      {showTokenSymbol && <TokenSymbol>{symbol}</TokenSymbol>}

      {address && (
        <ResolvedAddress>
          <strong>Resolved address</strong>: {address}
        </ResolvedAddress>
      )}
    </Container>
  );
};
