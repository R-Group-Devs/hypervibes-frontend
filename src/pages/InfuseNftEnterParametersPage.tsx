import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory, useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { BigNumber } from '@ethersproject/bignumber';
import NumberInput from '../components/NumberInput';
import SubmitButton from '../components/SubmitButton';
import { useLazyErc20Contract } from '../hooks/useErc20Contract';
import useErc20TokenDetails from '../hooks/useErc20TokenDetails';
import useErc20Allowance from '../hooks/useErc20Allowance';
import useErc20ApproveAllowance from '../hooks/useErc20ApproveAllowance';
import useRealmDetails from '../hooks/useRealmDetails';
import useInfuseNft from '../hooks/useInfuseNft';

interface FormValues {
  amount: number;
}

interface Params {
  realmId: string;
  collection: string;
  tokenId: string;
}

const ButtonGroup = styled.div`
  display: flex;
  column-gap: 2em;
`;

const TokenApprovalInfo = styled.div`
  margin-top: 2em;
  width: 520px;
`;

export default () => {
  const methods = useForm<FormValues>();
  const { account } = useWallet();
  const history = useHistory();
  const { realmId, collection, tokenId } = useParams<Params>();
  const {
    data: { token },
  } = useRealmDetails(realmId);
  const { infuseNft } = useInfuseNft();
  const getErc20Contract = useLazyErc20Contract();
  const { symbol } = useErc20TokenDetails(token || '');
  const { allowance } = useErc20Allowance(token || '');
  const { approveAllowance } = useErc20ApproveAllowance();
  const [decimals, setDecimals] = useState<BigNumber>();

  const amount = methods.watch('amount');
  const hasApprovedEnoughAllowance = decimals
    ? allowance.gte(BigNumber.from(amount || 0).mul(decimals))
    : true;

  useEffect(() => {
    (async () => {
      if (!decimals && token && getErc20Contract) {
        const decimalExponent = await getErc20Contract(token)?.decimals();
        setDecimals(BigNumber.from(10).pow(decimalExponent));
      }
    })();
  }, [token, decimals, getErc20Contract]);

  const onSubmit = methods.handleSubmit(async data => {
    if (!hasApprovedEnoughAllowance) {
      // TODO: subtract amount from current allowance
      // long-term, how should we handle approvals? infinity seems bad,
      // but maybe give the user an option to set between a min needed for infusion and infinity
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

          <ButtonGroup>
            <SubmitButton disabled={hasApprovedEnoughAllowance}>
              Approve
            </SubmitButton>
            <SubmitButton disabled={!hasApprovedEnoughAllowance}>
              Infuse
            </SubmitButton>
          </ButtonGroup>

          {!hasApprovedEnoughAllowance && (
            <TokenApprovalInfo>
              {allowance.isZero() ? (
                <p>
                  You have not approved the <strong>HyperVIBES</strong> contract
                  to move any of your <strong>{symbol}</strong> tokens.
                </p>
              ) : (
                <p>
                  You have only approved the <strong>HyperVIBES</strong>{' '}
                  contract to move{' '}
                  {allowance.div(BigNumber.from(10).pow(18)).toNumber()} of your{' '}
                  <strong>{symbol}</strong> tokens.
                </p>
              )}
            </TokenApprovalInfo>
          )}
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </>
  );
};
