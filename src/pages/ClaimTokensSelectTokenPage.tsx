import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import ClaimTokensContainer from '../components/ClaimTokensContainer';
import FormHeading from '../components/FormHeading';
import TextInput from '../components/TextInput';
import SubmitButton from '../components/SubmitButton';
import heading from '../assets/images/headings/select-nft.svg';

interface FormValues {
  tokenId: string;
}

export default () => {
  const methods = useForm<FormValues>();
  const history = useHistory();

  const onSubmit = methods.handleSubmit(data => {
    history.push(`token/${data.tokenId}`);
  });

  return (
    <ClaimTokensContainer name="Claim Goods">
      <FormHeading src={heading} alt="Select NFT" />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <TextInput name="tokenId" label="Token ID" required />

          <SubmitButton>Next</SubmitButton>
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </ClaimTokensContainer>
  );
};
