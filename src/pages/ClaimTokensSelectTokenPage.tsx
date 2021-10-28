import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import TextInput from '../components/TextInput';
import SubmitButton from '../components/SubmitButton';

interface FormValues {
  tokenId: string;
}

export default () => {
  const methods = useForm<FormValues>();
  const history = useHistory();

  const onSubmit = methods.handleSubmit((data) => {
    history.push(`token/${data.tokenId}`);
  });

  return (
    <>
      <h2>Select Token</h2>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <TextInput name="tokenId" label="Token ID" required />

          <SubmitButton>Next</SubmitButton>
        </form>

        <DevTool control={methods.control} />
      </FormProvider>
    </>
  );
};
