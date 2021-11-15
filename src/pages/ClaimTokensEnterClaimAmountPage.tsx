import { useState } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import usePortal from 'react-useportal';
import ClaimTokensContainer from '../components/ClaimTokensContainer';
import FormHeading from '../components/FormHeading';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import ButtonGroup from '../components/ButtonGroup';
import Button from '../components/Button';
import NftCard from '../components/NftCard';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import FormErrors from '../components/FormErrors';
import Modal, { ModalHeading, ModalContent } from '../components/Modal';
import useClaimTokens from '../hooks/useClaimTokens';
import useErc721IsApproved from '../hooks/useErc721IsApproved';
import useErc20TokenDetails from '../hooks/useErc20TokenDetails';
import useErc20Decimals from '../hooks/useErc20Decimals';
import useRealmDetails from '../hooks/useRealmDetails';
import useNftDetails from '../hooks/useNftDetails';
import useMetadata from '../hooks/useMetadata';
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

const TransactionStatus = styled.div`
  margin: 60px auto 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  line-height: 24px;
`;

const AmountToClaimLabel = styled.div`
  font-size: 18px;
  line-height: 24px;
`;

const AmountToClaimAmount = styled.div`
  margin-top: 24px;
  margin-bottom: 20px;
  font-size: 32px;
  font-weight: 400;
  color: #bcff67;
`;

const TokenSymbol = styled.span`
  font-weight: 300;
`;

export default () => {
  const methods = useForm<FormValues>();
  const { account } = useWallet();
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const { realmId, collection, tokenId } = useParams<Params>();
  const { claimTokens } = useClaimTokens();
  const amount = methods.watch('amount');
  const isApproved = useErc721IsApproved(collection, tokenId, account);
  const {
    data: { minClaimAmount, allowPublicClaiming, claimers },
  } = useRealmDetails(realmId);
  const {
    data: { lastClaimAtTimestamp, tokenUri },
  } = useNftDetails(realmId, collection, tokenId);
  const { metadata, isLoading: isLoadingMetadata } = useMetadata(tokenUri);
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

  const [isPending, setIsPending] = useState(false);
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
      console.log('claim');
      const tx = await claimTokens({
        realmId: parseInt(realmId, 10),
        collection,
        tokenId: parseInt(tokenId, 10),
        amount: data.amount,
      });

      setIsPending(true);
      openPortal({ currentTarget: { contains: () => false } });

      await tx.wait(1);
      setIsPending(false);

      setTimeout(() => {
        closePortal();
      }, 3000);
    }
  });

  return (
    <ClaimTokensContainer name="Claim Goods">
      <FormHeading src={heading} alt="Claim Tokens" />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Content>
            <CardContainer>
              {!isLoadingMetadata && tokenUri && (
                <NftCard
                  name={metadata?.name || tokenId}
                  image={metadata?.image}
                />
              )}
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
                    minClaimAmount >= currentMinedTokens
                      ? `Cannot claim less than realm minimum (${minClaimAmountNumber}).`
                      : `Enter an amount between ${minClaimAmountNumber} (realm minimum) and ${currentMinedTokensNumber} (total available to claim).`
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

          <FormErrors errors={formErrors} />

          <ButtonGroup>
            <BackButton path="../../../select-token" />
            <SubmitButton>Claim</SubmitButton>
          </ButtonGroup>
        </form>
      </FormProvider>

      <Portal>
        <Modal isOpen={isOpen} close={closePortal}>
          <ModalHeading>Claim Tokens</ModalHeading>
          <ModalContent>
            <TransactionStatus>
              {isPending ? (
                <AmountToClaimLabel>Claiming...</AmountToClaimLabel>
              ) : (
                <AmountToClaimLabel>Claimed</AmountToClaimLabel>
              )}

              <AmountToClaimAmount>
                {amount} <TokenSymbol>${symbol}</TokenSymbol>
              </AmountToClaimAmount>
            </TransactionStatus>
          </ModalContent>
        </Modal>
      </Portal>
    </ClaimTokensContainer>
  );
};
