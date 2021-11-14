import { useState } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory, useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import ClaimTokensContainer from '../components/ClaimTokensContainer';
import FormHeading from '../components/FormHeading';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import NftCard from '../components/NftCard';
import SubmitButton from '../components/SubmitButton';
import useClaimTokens from '../hooks/useClaimTokens';
import useErc721IsApproved from '../hooks/useErc721IsApproved';
import useErc20Decimals from '../hooks/useErc20Decimals';
import useRealmDetails from '../hooks/useRealmDetails';
import useNftDetails from '../hooks/useNftDetails';
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

const FormErrors = styled.ul`
  margin-top: 2em;
  margin-bottom: 3em;
`;

export default () => {
  const methods = useForm<FormValues>();
  const { account } = useWallet();
  const history = useHistory();
  const { realmId, collection, tokenId } = useParams<Params>();
  const { claimTokens } = useClaimTokens();
  const isApproved = useErc721IsApproved(collection, tokenId, account);
  const {
    data: { allowPublicClaiming, claimers },
  } = useRealmDetails(realmId);
  const {
    data: { claimableAmount, lastClaimAtTimestamp },
  } = useNftDetails(collection, tokenId);
  const decimals = useErc20Decimals(collection);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const claimableAmountNumber = claimableAmount.div(decimals).toString();

  const onSubmit = methods.handleSubmit(async data => {
    let hasErrors = false;

    if (
      !isApproved ||
      (!claimers?.includes(account || '') && !allowPublicClaiming)
    ) {
      setFormErrors([
        ...formErrors,
        'You lack claim permissions in this realm for this NFT. Try another.',
      ]);

      hasErrors = true;
    }

    if (!lastClaimAtTimestamp) {
      setFormErrors([
        ...formErrors,
        'This NFT is not infused with any tokens.',
      ]);

      hasErrors = true;
    }

    if (hasErrors) {
      return false;
    }

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
      <FormHeading src={heading} alt="Claim Tokens" />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Content>
            <CardContainer>
              <NftCard name={tokenId} />
            </CardContainer>

            <FormContent>
              <InputGroup
                label="Amount to claim"
                description="The total number of XYZ tokens to claim."
              >
                <NumberInput
                  name="amount"
                  label={`Amount (Max: ${claimableAmountNumber})`}
                  required
                  min={0.00001}
                  validate={value =>
                    value <= parseFloat(claimableAmountNumber) ||
                    'You cannot claim more than the maximum.'
                  }
                />
              </InputGroup>
            </FormContent>
          </Content>

          {formErrors.length > 0 && (
            <FormErrors>
              {formErrors.map(formError => (
                <li key={formError}>{formError}</li>
              ))}
            </FormErrors>
          )}

          <SubmitButton size="lg">Claim Tokens</SubmitButton>
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </ClaimTokensContainer>
  );
};
