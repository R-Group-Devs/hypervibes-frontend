import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory, useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { BigNumber } from '@ethersproject/bignumber';
import NumberInput from '../components/NumberInput';
import SubmitButton from '../components/SubmitButton';
import useErc20Allowance from '../hooks/useErc20Allowance';
import useErc20ApproveAllowance from '../hooks/useErc20ApproveAllowance';
import useRealmDetails from '../hooks/useRealmDetails';
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
  const {
    data: { token },
  } = useRealmDetails(realmId);
  const { infuseNft } = useInfuseNft();
  const { allowance } = useErc20Allowance(token || '');
  const { approveAllowance } = useErc20ApproveAllowance();
  const amount = methods.watch('amount');

  // TODO: get decimals from collection ERC-20
  const hasApprovedEnoughAllowance = allowance.gte(BigNumber.from(amount || 0).pow(18));

  const onSubmit = methods.handleSubmit(async (data) => {
    if (!hasApprovedEnoughAllowance) {
      await approveAllowance(token || '', amount);
    } else {
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
    }
  });

  return (
    <>
      <h2>Infuse NFT</h2>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <NumberInput name="amount" label="Amount to Infuse" required />
          <NumberInput name="dailyRate" label="Daily Claimable Rate" required />

          <SubmitButton>{hasApprovedEnoughAllowance ? 'Infuse' : 'Approve'}</SubmitButton>
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </>
  );
};
