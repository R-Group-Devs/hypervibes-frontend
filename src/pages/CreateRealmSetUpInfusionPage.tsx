import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, { Realm } from '../hooks/useCreateRealmWizard';
import useErc20TokenDetails from '../hooks/useErc20TokenDetails';
import AddressInput from '../components/AddressInput';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';

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
  const tokenAddress = methods.watch('tokenAddress');
  const { symbol } = useErc20TokenDetails(tokenAddress);
  const history = useHistory();

  const onSubmit = methods.handleSubmit((data) => {
    updateRealm(data);
    history.push('advanced-settings');
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <AddressInput name="tokenAddress" label="ERC-20 Token Address" required />
          <TokenSymbol>{symbol}</TokenSymbol>

          <MultiAddressInput name="allowedInfusers" label="Allowed infusers" />

          <SubmitButton>Next</SubmitButton>
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </Container>
  );
};
