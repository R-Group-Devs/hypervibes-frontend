import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import InfuseNftContainer from '../components/InfuseNftContainer';
import FormHeading from '../components/FormHeading';
import InputGroup from '../components/InputGroup';
import NumberInput from '../components/NumberInput';
import ButtonGroup from '../components/ButtonGroup';
import BackButton from '../components/BackButton';
import SubmitButton from '../components/SubmitButton';
import ConnectWalletInline from '../components/ConnectWalletInline';
import FormErrors from '../components/FormErrors';
import { useLazyErc721OwnerOf } from '../hooks/useErc721OwnerOf';
import heading from '../assets/images/headings/select-nft.svg';

interface FormValues {
  tokenId: string;
}

interface Params {
  realmId: string;
  collection: string;
}

export default () => {
  const methods = useForm<FormValues>();
  const history = useHistory();
  const { collection } = useParams<Params>();
  const getErc721OwnerOf = useLazyErc721OwnerOf(collection);
  const wallet = useWallet();
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const onSubmit = methods.handleSubmit(async data => {
    try {
      const ownerOf = await getErc721OwnerOf(data.tokenId);

      if (!ownerOf) {
        throw new Error();
      }
    } catch (e) {
      const errorMessage = 'Enter a valid token ID.';

      if (!formErrors.includes(errorMessage)) {
        setFormErrors([...formErrors, errorMessage]);
      }

      return false;
    }

    history.push(`token/${data.tokenId}`);
  });

  return (
    <InfuseNftContainer name="Infusion Chamber">
      <FormHeading src={heading} alt="Select NFT" />

      <ConnectWalletInline message="Connect your wallet to select an NFT to infuse." />

      {wallet.account && (
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <InputGroup
              label="NFT Token ID"
              description="The token ID of the NFT in the collection."
            >
              <NumberInput name="tokenId" label="Token ID" required />
            </InputGroup>

            <FormErrors errors={formErrors} />

            <ButtonGroup>
              <BackButton path="../../select-collection" />
              <SubmitButton>Next</SubmitButton>
            </ButtonGroup>
          </form>
        </FormProvider>
      )}
    </InfuseNftContainer>
  );
};
