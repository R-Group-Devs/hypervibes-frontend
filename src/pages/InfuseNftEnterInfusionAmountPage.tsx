import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory, useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { BigNumber } from '@ethersproject/bignumber';
import InfuseNftContainer from '../components/InfuseNftContainer';
import FormHeading from '../components/FormHeading';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import NftCard from '../components/NftCard';
import SubmitButton from '../components/SubmitButton';
import { useLazyErc20Contract } from '../hooks/useErc20Contract';
import useErc20TokenDetails from '../hooks/useErc20TokenDetails';
import useErc20Allowance from '../hooks/useErc20Allowance';
import useErc20ApproveAllowance from '../hooks/useErc20ApproveAllowance';
import useRealmDetails from '../hooks/useRealmDetails';
import useInfuseNft from '../hooks/useInfuseNft';
import heading from '../assets/images/headings/infuse-token.svg';

interface FormValues {
  amount: number;
}

interface Params {
  realmId: string;
  collection: string;
  tokenId: string;
}

const Form = styled.form`
  display: flex;
`;

const CardContainer = styled.div`
  padding-right: 1.75em;
  width: 50%;
`;

const Content = styled.div`
  padding-left: 1.75em;
  width: 50%;
`;

const ButtonGroup = styled.div`
  margin-top: 4em;
  display: flex;
  column-gap: 2em;
`;

const TokenApprovalInfo = styled.div`
  width: 100%;
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
    : false;

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
    <InfuseNftContainer name="Infusion Chamber">
      <FormHeading src={heading} alt="Infuse Token" />

      <FormProvider {...methods}>
        <Form onSubmit={onSubmit}>
          <CardContainer>
            <NftCard name={tokenId} />
          </CardContainer>

          <Content>
            <InputGroup
              label="Amount to infuse"
              description="The total number of XYZ tokens to infuse."
            >
              <NumberInput name="amount" label="Amount" required />
            </InputGroup>

            {!hasApprovedEnoughAllowance && (
              <TokenApprovalInfo>
                {allowance.isZero() ? (
                  <p>
                    You have not approved the <strong>HyperVIBES</strong>{' '}
                    contract to move any of your <strong>{symbol}</strong>{' '}
                    tokens.
                  </p>
                ) : (
                  <p>
                    You have only approved the <strong>HyperVIBES</strong>{' '}
                    contract to move{' '}
                    {allowance.div(BigNumber.from(10).pow(18)).toNumber()} of
                    your <strong>{symbol}</strong> tokens.
                  </p>
                )}
              </TokenApprovalInfo>
            )}
          </Content>
        </Form>

        <ButtonGroup>
          <SubmitButton
            size="lg"
            disabled={hasApprovedEnoughAllowance || !amount}
          >
            Approve
          </SubmitButton>
          <SubmitButton
            size="lg"
            disabled={!hasApprovedEnoughAllowance || !amount}
          >
            Infuse
          </SubmitButton>
        </ButtonGroup>

        <DevTool control={methods.control} />
      </FormProvider>
    </InfuseNftContainer>
  );
};
