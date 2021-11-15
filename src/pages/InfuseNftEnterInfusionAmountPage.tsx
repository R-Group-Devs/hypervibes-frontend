import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import usePortal from 'react-useportal';
import { BigNumber } from '@ethersproject/bignumber';
import InfuseNftContainer from '../components/InfuseNftContainer';
import FormHeading from '../components/FormHeading';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import NftCard from '../components/NftCard';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import FormErrors from '../components/FormErrors';
import Modal, { ModalHeading, ModalContent } from '../components/Modal';
import { useLazyErc20Contract } from '../hooks/useErc20Contract';
import useErc20TokenDetails from '../hooks/useErc20TokenDetails';
import useErc20Allowance from '../hooks/useErc20Allowance';
import useErc20ApproveAllowance from '../hooks/useErc20ApproveAllowance';
import useErc721OwnerOf from '../hooks/useErc721OwnerOf';
import useRealmDetails from '../hooks/useRealmDetails';
import useNftDetails from '../hooks/useNftDetails';
import useInfuseNft from '../hooks/useInfuseNft';
import useMetadata from '../hooks/useMetadata';
import heading from '../assets/images/headings/infuse-token.svg';

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

const StyledButtonGroup = styled(ButtonGroup)`
  margin-bottom: 1em;
`;

const AmountToInfuseContainer = styled.div`
  margin: 90px auto 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const AmountToInfuseLabel = styled.div`
  font-size: 18px;
  line-height: 24px;
`;

const AmountToInfuseAmount = styled.div`
  margin-top: 10px;
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
  const { data: realmDetails } = useRealmDetails(realmId);
  const { infuseNft } = useInfuseNft();
  const getErc20Contract = useLazyErc20Contract();
  const {
    token,
    minInfusionAmount,
    requireNftIsOwned,
    allowAllCollections,
    allowPublicInfusion,
    allowMultiInfuse,
    infusers,
    collections,
  } = realmDetails;
  const {
    data: { lastClaimAtTimestamp, tokenUri },
  } = useNftDetails(realmId, collection, tokenId);
  const { symbol } = useErc20TokenDetails(token?.address || '');
  const { allowance } = useErc20Allowance(token?.address || '');
  const { approveAllowance } = useErc20ApproveAllowance();
  const ownerOf = useErc721OwnerOf(collection, tokenId);
  const isNftOwnedByInfuser = ownerOf == account;
  const { metadata, isLoading: isLoadingMetadata } = useMetadata(tokenUri);

  const [decimals, setDecimals] = useState<BigNumber>();
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const amount = methods.watch('amount');
  const [isPendingApproval, setIsPendingApproval] = useState(false);
  const [isPendingInfusion, setIsPendingInfusion] = useState(false);
  const [hasBeenInfused, setHasBeenInfused] = useState(false);

  const minInfusionAmountBn = decimals
    ? BigNumber.from(minInfusionAmount || 0)
    : BigNumber.from(0);
  const minInfusionAmountInt = decimals
    ? minInfusionAmountBn.div(decimals).toString()
    : BigNumber.from(0);

  const hasApprovedEnoughAllowance = decimals
    ? allowance.gte(BigNumber.from(amount || 0).mul(decimals))
    : false;

  useEffect(() => {
    (async () => {
      if (!decimals && token && getErc20Contract) {
        const decimalExponent = await getErc20Contract(
          token?.address
        )?.decimals();
        setDecimals(BigNumber.from(10).pow(decimalExponent));
      }
    })();
  }, [token, decimals, getErc20Contract]);

  const onSubmit = methods.handleSubmit(async data => {
    if (!hasApprovedEnoughAllowance) {
      // TODO: subtract amount from current allowance
      // long-term, how should we handle approvals? infinity seems bad,
      // but maybe give the user an option to set between a min needed for infusion and infinity
      const tx = await approveAllowance(token?.address || '', amount);

      setIsPendingApproval(true);

      await tx.wait(1);
      setIsPendingApproval(false);
    } else {
      // TODO: how do we handle cases where use is not connected w/ wallet beforehand?
      if (account) {
        const tx = await infuseNft({
          realmId: parseInt(realmId, 10),
          collection,
          tokenId: parseInt(tokenId, 10),
          infuser: account,
          amount: data.amount,
        });

        setIsPendingInfusion(true);

        await tx.wait(1);
        setIsPendingInfusion(false);
        setHasBeenInfused(true);

        setTimeout(() => {
          closePortal();
        }, 3000);

        setTimeout(() => {
          setHasBeenInfused(false);
        }, 5000);
      }
    }
  });

  if (!realmDetails || !symbol) {
    // TODO: add content loaders
    return (
      <InfuseNftContainer name="Infusion Chamber">
        <FormHeading src={heading} alt="Infuse Token" />
      </InfuseNftContainer>
    );
  }

  return (
    <InfuseNftContainer name="Infusion Chamber">
      <FormHeading src={heading} alt="Infuse Token" />

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
                label="Amount to infuse"
                description={`The total number of ${symbol} tokens to infuse.`}
              >
                <NumberInput
                  name="amount"
                  label="Amount"
                  required
                  onChange={() => methods.clearErrors('amount')}
                  validate={value => {
                    const amountBn = decimals
                      ? BigNumber.from(value || 0).mul(decimals)
                      : BigNumber.from(0);
                    return (
                      amountBn.gte(minInfusionAmountBn) ||
                      `Cannot be less than the realm's minimum infusion amount (${minInfusionAmountInt}).`
                    );
                  }}
                />
              </InputGroup>
            </FormContent>
          </Content>

          <FormErrors errors={formErrors} />

          <ButtonGroup>
            <BackButton path={'../select-token'} />
            <SubmitButton
              onClick={e => {
                e.preventDefault();
                let hasErrors = false;

                if (!allowMultiInfuse && lastClaimAtTimestamp) {
                  const errorMessage =
                    'Token cannot be infused more than once.';

                  if (!formErrors.includes(errorMessage)) {
                    setFormErrors([...formErrors, errorMessage]);
                  }

                  hasErrors = true;
                }

                if (requireNftIsOwned && !isNftOwnedByInfuser) {
                  const errorMessage =
                    'You must own this NFT to infuse it with tokens.';

                  if (!formErrors.includes(errorMessage)) {
                    setFormErrors([...formErrors, errorMessage]);
                  }

                  hasErrors = true;
                }

                if (
                  !allowPublicInfusion &&
                  !infusers?.includes(account?.toLowerCase() || '')
                ) {
                  const errorMessage =
                    'You lack infuse permissions within this realm. Try another.';

                  if (!formErrors.includes(errorMessage)) {
                    setFormErrors([...formErrors, errorMessage]);
                  }

                  hasErrors = true;
                }

                if (
                  !allowAllCollections &&
                  !collections?.includes(collection.toLowerCase())
                ) {
                  const errorMessage =
                    'NFTs in this collections cannot be infused within this realm. Try another.';
                  if (!formErrors.includes(errorMessage)) {
                    setFormErrors([...formErrors, errorMessage]);
                  }

                  hasErrors = true;
                }

                if (hasErrors) {
                  return false;
                }

                if (amount) {
                  openPortal({ currentTarget: { contains: () => false } });
                } else {
                  methods.setError('amount', {
                    type: 'required',
                  });
                }
              }}
            >
              Next
            </SubmitButton>
          </ButtonGroup>
        </form>
      </FormProvider>

      <Portal>
        <Modal isOpen={isOpen} close={closePortal}>
          <ModalHeading>Infuse Tokens</ModalHeading>
          <ModalContent>
            <AmountToInfuseContainer>
              <AmountToInfuseLabel>
                {isPendingApproval
                  ? 'Approving...'
                  : isPendingInfusion
                  ? 'Infusing...'
                  : hasBeenInfused
                  ? 'Infused'
                  : 'Infuse'}
              </AmountToInfuseLabel>
              <AmountToInfuseAmount>
                {amount} <TokenSymbol>${symbol}</TokenSymbol>
              </AmountToInfuseAmount>
            </AmountToInfuseContainer>

            {!hasBeenInfused && (
              <StyledButtonGroup>
                <SubmitButton
                  disabled={
                    hasApprovedEnoughAllowance || !amount || isPendingApproval
                  }
                  arrow={false}
                  onClick={() => onSubmit()}
                >
                  Approve
                </SubmitButton>
                <SubmitButton
                  disabled={
                    !hasApprovedEnoughAllowance || !amount || isPendingInfusion
                  }
                  arrow={false}
                  onClick={() => onSubmit()}
                >
                  Infuse
                </SubmitButton>
              </StyledButtonGroup>
            )}
          </ModalContent>
        </Modal>
      </Portal>
    </InfuseNftContainer>
  );
};
