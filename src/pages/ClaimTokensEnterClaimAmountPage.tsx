import { useState } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import ClaimTokensContainer from '../components/ClaimTokensContainer';
import FormHeading from '../components/FormHeading';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import Button from '../components/Button';
import NftCard from '../components/NftCard';
import SubmitButton from '../components/SubmitButton';
import useClaimTokens from '../hooks/useClaimTokens';
import useErc721IsApproved from '../hooks/useErc721IsApproved';
import useErc20TokenDetails from '../hooks/useErc20TokenDetails';
import useErc20Decimals from '../hooks/useErc20Decimals';
import useRealmDetails from '../hooks/useRealmDetails';
import useNftDetails from '../hooks/useNftDetails';
import useCurrentMinedTokens from '../hooks/useCurrentMinedTokens';
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
  position: relative;
  padding-left: 1.75em;
  width: 50%;
  max-width: 270px;
`;

const CardContainer = styled.div`
  padding-right: 1.75em;
  width: 50%;
`;

const AmountInput = styled(NumberInput)`
  padding-right: 3.5em;
`;

const MaxButton = styled(Button)`
  position: absolute;
  margin-top: 3em;
  right: 2em;
  padding: 0.25em 1.5em;
  height: 30px;
  background: #000;
  font-size: 6px;
  line-height: 14px;
  border: 1px solid #fff;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover:not([disabled]) {
    background: #fff;
    color: #000;
  }
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
    data: { minClaimAmount, allowPublicClaiming, claimers },
  } = useRealmDetails(realmId);
  const {
    data: { lastClaimAtTimestamp },
  } = useNftDetails(realmId, collection, tokenId);
  const { symbol } = useErc20TokenDetails(collection);
  const decimals = useErc20Decimals(collection);
  const currentMinedTokens = useCurrentMinedTokens(
    realmId,
    collection,
    tokenId
  );

  const minClaimAmountNumber = parseFloat(
    minClaimAmount?.div(decimals).toString()
  );
  const currentMinedTokensNumber = parseFloat(
    currentMinedTokens?.div(decimals).toString()
  );

  const [formErrors, setFormErrors] = useState<string[]>([]);

  const onSubmit = methods.handleSubmit(async data => {
    let hasErrors = false;

    if (
      !isApproved ||
      (!claimers?.includes(account?.toLowerCase() || '') &&
        !allowPublicClaiming)
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
                description={`The total number of ${symbol} tokens to claim.`}
              >
                <AmountInput
                  name="amount"
                  label={`Amount (Max: ${currentMinedTokensNumber})`}
                  required
                  min={0.00001}
                  validate={value =>
                    (value >= minClaimAmountNumber &&
                      value <= currentMinedTokensNumber) ||
                    `Enter an amount between ${minClaimAmountNumber} (realm minimum) and ${currentMinedTokensNumber} (total available to claim).`
                  }
                />

                <MaxButton
                  onClick={e => {
                    e.preventDefault();
                    methods.setValue('amount', currentMinedTokensNumber);
                  }}
                >
                  Max
                </MaxButton>
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

          <SubmitButton>Claim</SubmitButton>
        </form>
      </FormProvider>
    </ClaimTokensContainer>
  );
};
