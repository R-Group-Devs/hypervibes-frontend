import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import usePortal from 'react-useportal';
import { utils } from 'ethers';
import useCreateRealmWizard, {
  RealmWizardValues,
} from '../hooks/useCreateRealmWizard';
import CreateRealmContainer from '../components/CreateRealmContainer';
import FormHeading from '../components/FormHeading';
import RadioGroup from '../components/RadioGroup';
import RadioButtonCard from '../components/RadioButtonCard';
import InputGroup from '../components/InputGroup';
import MultiAddressInput from '../components/MultiAddressInput';
import NumberInput from '../components/NumberInput';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import Modal, { ModalHeading, ModalContent } from '../components/Modal';
import WalletModal from '../components/WalletModal';
import { CREATE_REALM_STEPS } from '../constants/formSteps';
import heading from '../assets/images/headings/set-up-claiming.svg';
import allowAnyClaimerImage from '../assets/images/allow-any-claimer.png';
import allowAnyClaimerSelectedImage from '../assets/images/allow-any-claimer-selected.png';
import allowSpecificClaimersImage from '../assets/images/allow-specific-addresses.png';
import allowSpecificClaimersSelectedImage from '../assets/images/allow-specific-addresses-selected.png';

const Container = styled.div``;

const ClaimerOptionImage = styled.div`
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 0.2s;
`;

const AllowAnyClaimer = styled(ClaimerOptionImage)<{ isSelected: boolean }>`
  background-size: 78%;

  background-image: ${({ isSelected }) =>
    isSelected
      ? `url(${allowAnyClaimerSelectedImage})`
      : `url(${allowAnyClaimerImage})`};

  &:hover {
    background-image: url(${allowAnyClaimerSelectedImage});
  }
`;

const AllowSpecificClaimers = styled(ClaimerOptionImage)<{
  isSelected: boolean;
}>`
  background-size: 41%;

  background-image: ${({ isSelected }) =>
    isSelected
      ? `url(${allowSpecificClaimersSelectedImage})`
      : `url(${allowSpecificClaimersImage})`};

  &:hover {
    background-image: url(${allowSpecificClaimersSelectedImage});
  }
`;

const CreateRealmModalContainer = styled.div`
  margin: 90px auto 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CreateRealmLabel = styled.div`
  font-size: 18px;
  line-height: 24px;
`;

const CreateRealmName = styled.div`
  margin-top: 10px;
  font-size: 32px;
  font-weight: 400;
  color: #bcff67;
`;

export default () => {
  const { realm, updateRealm, createRealm, resetRealm } =
    useCreateRealmWizard();
  const history = useHistory();
  const methods = useForm<RealmWizardValues>({ defaultValues: realm });
  const wallet = useWallet();
  const {
    openPortal: openConfirmPortal,
    closePortal: closeConfirmPortal,
    isOpen: isConfirmPortalOpen,
    Portal: ConfirmPortal,
  } = usePortal();
  const {
    openPortal: openConnectWalletPortal,
    closePortal: closeConnectWalletPortal,
    isOpen: isConnectWalletPortalOpen,
    Portal: ConnectWalletPortal,
  } = usePortal();
  const allowPublicClaiming = methods.watch('allowPublicClaiming');
  const [isPending, setIsPending] = useState(false);
  const [neededWalletConnection, setNeededWalletConnection] = useState(false);

  const onSubmit = methods.handleSubmit(async data => {
    if (!wallet.account) {
      setNeededWalletConnection(true);
      openConnectWalletPortal();
      return false;
    }

    updateRealm(data);

    // TODO - move this logic to a `useEffect` block that fires on `realm` dependency change
    // check if all `realm` data is valid
    // if invalid, highlight wizard steps which contain invalid inputs
    // if valid, persist `realm` to contract
    const tx = await createRealm({ ...realm, ...data });

    setIsPending(true);
    openConfirmPortal({ currentTarget: { contains: () => false } });

    await tx.wait(1);
    setIsPending(false);

    setTimeout(() => {
      closeConfirmPortal();
      history.push('/infuse');
      resetRealm();
    }, 3000);
  });

  useEffect(() => {
    if (wallet.status === 'connected') {
      closeConnectWalletPortal();

      if (neededWalletConnection) {
        setNeededWalletConnection(false);
        onSubmit();
      }
    }
  }, [
    wallet.status,
    neededWalletConnection,
    setNeededWalletConnection,
    closeConnectWalletPortal,
    onSubmit,
  ]);

  return (
    <Container>
      <FormProvider {...methods}>
        <CreateRealmContainer
          name="Create Realm"
          steps={CREATE_REALM_STEPS}
          activeStep={4}
        >
          <FormHeading src={heading} alt="Set up Claiming" />
          <form onSubmit={onSubmit}>
            <RadioGroup name="allowPublicClaiming" label="">
              <RadioButtonCard
                name="allowPublicClaiming"
                id="yes"
                label="Allow anyone to claim"
              >
                <AllowAnyClaimer isSelected={allowPublicClaiming === 'yes'} />
              </RadioButtonCard>

              <RadioButtonCard
                name="allowPublicClaiming"
                id="no"
                label="Only allow specific addresses to claim"
              >
                <AllowSpecificClaimers
                  isSelected={allowPublicClaiming === 'no'}
                />
              </RadioButtonCard>
            </RadioGroup>

            {allowPublicClaiming === 'no' && (
              <MultiAddressInput
                name="allowedClaimers"
                label="Allowed claimers"
                addMoreText="Add more claimers"
                required
              />
            )}

            <InputGroup
              label="Claimable Token Rate"
              description="The daily rate that infused tokens are made claimable by the NFT holder."
            >
              <NumberInput
                name="claimableTokenRate"
                label="Daily Rate"
                required
              />
            </InputGroup>

            <InputGroup
              label="Minimum Claimable Token Amount"
              description="The minimum number of tokens that can be claimed at one time by an NFT holder."
            >
              <NumberInput
                name="minClaimAmount"
                label="Minimum"
                required
                validate={value =>
                  utils
                    .parseUnits(value)
                    .lte(utils.parseUnits(realm?.maxInfusibleTokens || '0')) ||
                  'Cannot be greater than maximum infusible tokens defined in the Set up Infusion step.'
                }
              />
            </InputGroup>

            <ButtonGroup>
              <BackButton path="set-up-infusion" />
              <SubmitButton>Create Realm</SubmitButton>
            </ButtonGroup>
          </form>
        </CreateRealmContainer>
      </FormProvider>

      <ConfirmPortal>
        <Modal isOpen={isConfirmPortalOpen} close={closeConfirmPortal}>
          <ModalHeading>Create Realm</ModalHeading>
          <ModalContent>
            <CreateRealmModalContainer>
              <CreateRealmLabel>
                {isPending ? 'Creating realm...' : 'Created realm'}
              </CreateRealmLabel>

              <CreateRealmName>{realm.name}</CreateRealmName>
            </CreateRealmModalContainer>
          </ModalContent>
        </Modal>
      </ConfirmPortal>

      <ConnectWalletPortal>
        <WalletModal
          isOpen={isConnectWalletPortalOpen}
          close={closeConnectWalletPortal}
        />
      </ConnectWalletPortal>
    </Container>
  );
};
