import { useForm, FormProvider } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import InfuseNftContainer from '../components/InfuseNftContainer';
import FormHeading from '../components/FormHeading';
import NumberInput from '../components/TextInput';
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
    <InfuseNftContainer name="Infusion Chamber">
      <FormHeading src={heading} alt="Select NFT" />

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <NumberInput name="tokenId" label="Token ID" required />

          <SubmitButton>Next</SubmitButton>
        </form>
      </FormProvider>
    </InfuseNftContainer>
  );
};
