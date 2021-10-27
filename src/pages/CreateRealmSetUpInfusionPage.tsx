import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, { Realm } from '../hooks/useCreateRealmWizard';
import useErc20TokenDetails from '../hooks/useErc20TokenDetails';
import RadioGroup from '../components/RadioGroup';
import RadioButton from '../components/RadioButton';
import AddressInput from '../components/AddressInput';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';

const Container = styled.div`
  position: relative;
`;

const TokenSymbol = styled.div`
  position: absolute;
  top: 7.5em;
  right: 8em;
`;

export default () => {
  const { realm, updateRealm } = useCreateRealmWizard();
  const methods = useForm<Realm>({ defaultValues: realm });
  const allowPublicInfusion = methods.watch('allowPublicInfusion');
  const tokenAddress = methods.watch('tokenAddress');
  const { symbol } = useErc20TokenDetails(tokenAddress);
  const history = useHistory();

  const onSubmit = methods.handleSubmit((data) => {
    updateRealm(data);
    history.push('advanced-settings');
  });

  return (
    <Container>
      <h2>Set up Infusion</h2>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <AddressInput name="tokenAddress" label="ERC-20 Token Address" required />
          <TokenSymbol>{symbol}</TokenSymbol>

          <RadioGroup name="allowPublicInfusion" label="Select Infusers">
            <RadioButton
              name="allowPublicInfusion"
              id="yes"
              label="Allow anyone to infuse"
              required
            />
            <RadioButton
              name="allowPublicInfusion"
              id="no"
              label="Only allow specific addresses to infuse"
              required
            />
          </RadioGroup>

          {allowPublicInfusion === 'no' && (
            <MultiAddressInput name="allowedInfusers" label="Allowed infusers" required />
          )}

          <SubmitButton>Next</SubmitButton>
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </Container>
  );
};
