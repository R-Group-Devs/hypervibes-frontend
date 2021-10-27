import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory, useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import NumberInput from '../components/NumberInput';
import SubmitButton from '../components/SubmitButton';
import useInfuseNft from '../hooks/useInfuseNft';

interface FormValues {
  amount: number;
  dailyRate: number;
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
  const { infuseNft } = useInfuseNft();

  const onSubmit = methods.handleSubmit(async (data) => {
    // TODO: Add token approve step

    // TODO: how do we handle cases where use is not connected w/ wallet beforehand?
    if (account) {
      await infuseNft({
        realmId: parseInt(realmId, 10),
        collection,
        tokenId: parseInt(tokenId, 10),
        infuser: account,
        amount: data.amount,
        dailyRate: data.dailyRate,
      });

      history.push(`/infuse/success`);
    }
  });

  return (
    <>
      <h2>Infuse NFT</h2>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <NumberInput name="amount" label="Amount to Infuse" required />
          <NumberInput name="dailyRate" label="Daily Claimable Rate" required />

          <SubmitButton>Infuse</SubmitButton>
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </>
  );
};
