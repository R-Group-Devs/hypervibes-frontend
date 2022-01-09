import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import usePortal from 'react-useportal';
import { utils } from 'ethers';
import { BigNumber } from '@ethersproject/bignumber';
import InfuseNftContainer from '../components/InfuseNftContainer';
import FormHeading from '../components/FormHeading';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import NftCard from '../components/NftCard';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import ConnectWalletInline from '../components/ConnectWalletInline';
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
  amount: string;
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

const ViewNftDetailsLink = styled(Link)`
  margin-top: 2em;
  display: inline-block;
`;

export default () => {
  const methods = useForm<FormValues>();
  const { account, networkName } = useWallet();
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const { realmId, collection, tokenId } = useParams<Params>();
  const { data: realmDetails } = useRealmDetails(realmId);
  const { infuseNft } = useInfuseNft();
  const getErc20Contract = useLazyErc20Contract();
  const {
    token,
    minInfusionAmount,
    maxTokenBalance,
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
  const [decimalExponent, setDecimalExponent] = useState<number>();
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const amount = methods.watch('amount');
  const [isPendingApproval, setIsPendingApproval] = useState(false);
  const [isPendingInfusion, setIsPendingInfusion] = useState(false);
  const [hasBeenInfused, setHasBeenInfused] = useState(false);

  const minInfusionAmountBn = decimals
    ? BigNumber.from(minInfusionAmount || 0)
    : BigNumber.from(0);

  const decimalPlaces = 5;
  const decimalMod = useMemo(() => {
    if (!decimalExponent) {
      return 1e13;
    }

    return decimalPlaces >= decimalExponent
      ? 1
      : Number(`1e${decimalExponent - decimalPlaces}`);
  }, [decimalExponent]);

  const minInfusionAmountRemainder = minInfusionAmountBn.mod(decimalMod);
  const minInfusionAmountNumber = utils.formatUnits(
    minInfusionAmountBn.sub(minInfusionAmountRemainder),
    decimalExponent
  );

  const maxTokenBalanceBn = decimals
    ? BigNumber.from(maxTokenBalance || 0)
    : BigNumber.from(0);

  const maxTokenBalanceRemainder = maxTokenBalanceBn.mod(decimalMod);
  const maxTokenBalanceNumber = utils.formatUnits(
    maxTokenBalanceBn.sub(maxTokenBalanceRemainder),
    decimalExponent
  );

  const hasApprovedEnoughAllowance = useMemo(
    () =>
      decimals && amount?.match(/^[+-]?(\d*\.)?\d+$/)
        ? allowance.gte(
            BigNumber.from(utils.parseUnits(amount || '0', decimalExponent))
          )
        : false,
    [amount, allowance, decimals, decimalExponent]
  );

  useEffect(() => {
    (async () => {
      if (!decimals && token && getErc20Contract) {
        const decimalExponent = await getErc20Contract(
          token?.address
        )?.decimals();

        setDecimalExponent(decimalExponent);
        setDecimals(BigNumber.from(10).pow(decimalExponent));
      }
    })();
  }, [token, decimals, getErc20Contract]);

  const onSubmit = methods.handleSubmit(async data => {
    if (!hasApprovedEnoughAllowance) {
      // TODO: subtract amount from current allowance
      // long-term, how should we handle approvals? infinity seems bad,
      // but maybe give the user an option to set between a min needed for infusion and infinity
      const tx = await approveAllowance(token?.address || '', data.amount);

      setIsPendingApproval(true);

      await tx.wait(1);
      setIsPendingApproval(false);
    } else {
      // TODO: how do we handle cases where use is not connected w/ wallet beforehand?
      if (account) {
        const tx = await infuseNft({
          realmId,
          collection,
          tokenId,
          infuser: account,
          amount: utils.parseUnits(data.amount, decimalExponent),
        });

        setIsPendingInfusion(true);

        await tx.wait(1);
        setHasBeenInfused(true);
        setIsPendingInfusion(false);
      }
    }
  });

  if (!realmDetails || !symbol) {
    // TODO: add content loaders
    return (
      <InfuseNftContainer name="Infusion Chamber">
        <FormHeading src={heading} alt="Infuse Token" />

        <ConnectWalletInline message="Connect your wallet to infuse tokens into this NFT." />
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
                    const amountBn = decimalExponent
                      ? BigNumber.from(
                          utils.parseUnits(value || '0', decimalExponent)
                        )
                      : BigNumber.from(0);

                    if (amountBn.lt(minInfusionAmountBn)) {
                      return `Cannot infuse less than the realm's minimum infusion amount (${minInfusionAmountNumber}).`;
                    }

                    if (amountBn.gt(maxTokenBalanceBn)) {
                      return `Cannot infuse more than than the realm's maximum infusible tokens (${maxTokenBalanceNumber}).`;
                    }

                    return true;
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
                methods.trigger();
                let hasErrors = false;

                if (!allowMultiInfuse && lastClaimAtTimestamp) {
                  const errorMessage =
                    'Tokens in this realm cannot be infused more than once.';

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

                const amountBn = BigNumber.from(
                  utils.parseUnits(amount, decimalExponent)
                );
                const amountIsValid =
                  amountBn.gte(minInfusionAmountBn) &&
                  amountBn.lte(maxTokenBalanceBn);

                if (amountIsValid) {
                  setHasBeenInfused(false);
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

              {hasBeenInfused && (
                <ViewNftDetailsLink
                  to={`/${
                    networkName === 'main' ? 'mainnet' : networkName
                  }/tokens/${collection}/${tokenId}`}
                >
                  View NFT details
                </ViewNftDetailsLink>
              )}
            </AmountToInfuseContainer>

            {!hasBeenInfused && (
              <StyledButtonGroup>
                <SubmitButton
                  disabled={
                    hasApprovedEnoughAllowance ||
                    !amount ||
                    isPendingApproval ||
                    isPendingInfusion
                  }
                  arrow={false}
                  onClick={() => onSubmit()}
                >
                  Approve
                </SubmitButton>
                <SubmitButton
                  disabled={
                    !hasApprovedEnoughAllowance ||
                    !amount ||
                    isPendingApproval ||
                    isPendingInfusion
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
