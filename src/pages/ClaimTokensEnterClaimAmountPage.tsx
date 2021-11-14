import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory, useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import ClaimTokensContainer from '../components/ClaimTokensContainer';
import FormHeading from '../components/FormHeading';
import NumberInput from '../components/NumberInput';
import NftCard from '../components/NftCard';
import SubmitButton from '../components/SubmitButton';
import useClaimTokens from '../hooks/useClaimTokens';
import heading from '../assets/images/headings/claim-tokens.svg';

interface FormValues {
  amount: number;
}

interface Params {
  realmId: string;
  collection: string;
  tokenId: string;
}

const Content = styled.form`
  display: flex;
`;

const FormContent = styled.div`
  padding-left: 1.75em;
  width: 50%;
`;

const CardContainer = styled.div`
  padding-right: 1.75em;
  width: 50%;
`;

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
    <ClaimTokensContainer name="Claim Goods">
      <FormHeading src={heading} alt="Select Collection" />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Content>
            <CardContainer>
              <NftCard name={tokenId} />
            </CardContainer>

            <FormContent>
              <NumberInput name="amount" label="Amount to Claim" required />
            </FormContent>
          </Content>

          <SubmitButton size="lg">Claim Tokens</SubmitButton>
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </ClaimTokensContainer>
  );
};
