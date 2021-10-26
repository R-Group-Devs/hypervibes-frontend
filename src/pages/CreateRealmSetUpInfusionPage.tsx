import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import useCreateRealmWizard, { Realm } from '../hooks/useCreateRealmWizard';
import AddressInput from '../components/AddressInput';
import { useLazyERC20Contract } from '../hooks/useERC20Contract';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';
import { isAddress } from '@ethersproject/address';

const Container = styled.div`
  position: relative;
`;

const TokenSymbol = styled.div`
  position: absolute;
  top: 1.5em;
  right: 5em;
`;

export default () => {
  const { realm, updateRealm } = useCreateRealmWizard();
  const methods = useForm<Realm>({ defaultValues: realm });
  const getErc20Contract = useLazyERC20Contract();
  const history = useHistory();
  const [tokenSymbol, setTokenSymbol] = useState('');

  const onSubmit = methods.handleSubmit((data) => {
    updateRealm(data);
    history.push('advanced-settings');
  });

  const [tokenAddress] = methods.watch(['tokenAddress']);

  useEffect(() => {
    (async () => {
      try {
        if (isAddress(tokenAddress) && getErc20Contract) {
          const symbol = await getErc20Contract(tokenAddress)?.symbol();
          setTokenSymbol(symbol);
        }
      } catch (e) {
        setTokenSymbol('');
      }
    })();
  }, [tokenAddress, getErc20Contract]);

  return (
    <Container>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <AddressInput name="tokenAddress" label="ERC-20 Token Address" required />
          <TokenSymbol>{tokenSymbol}</TokenSymbol>

          <MultiAddressInput name="allowedInfusers" label="Allowed infusers" />

          <SubmitButton>Next</SubmitButton>
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </Container>
  );
};
