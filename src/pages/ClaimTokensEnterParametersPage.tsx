import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory, useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import NumberInput from '../components/NumberInput';
import SubmitButton from '../components/SubmitButton';
import useClaimTokens from '../hooks/useClaimTokens';

interface FormValues {
  amount: number;
}

interface Params {
  realmId: string;
  collection: string;
  tokenId: string;
}

export default () => {
  const methods = useForm<FormValues>();
  const { account } = useWallet();
  const history = useHistory();
  const { realmId, collection, tokenId } = useParams<Params>();
  const { claimTokens } = useClaimTokens();

  const onSubmit = methods.handleSubmit(async data => {
    // TODO: how do we handle cases where use is not connected w/ wallet beforehand?
    if (account) {
      await claimTokens({
        realmId: parseInt(realmId, 10),
        collection,
        tokenId: parseInt(tokenId, 10),
        amount: data.amount,
      });

      history.push(`/claim/success`);
    }
  });

  return (
    <>
      <h2>Claim Tokens</h2>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <NumberInput name="amount" label="Amount to Claim" required />

          <SubmitButton>Claim Tokens</SubmitButton>
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </>
  );
};
