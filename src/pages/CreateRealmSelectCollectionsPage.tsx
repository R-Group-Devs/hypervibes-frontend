import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useHistory } from 'react-router-dom';
import useCreateRealmWizard, { Realm } from '../hooks/useCreateRealmWizard';
import RadioGroup from '../components/RadioGroup';
import RadioButton from '../components/RadioButton';
import MultiAddressInput from '../components/MultiAddressInput';
import SubmitButton from '../components/SubmitButton';

export default () => {
  const { realm, updateRealm } = useCreateRealmWizard();
  const methods = useForm<Realm>({ defaultValues: realm });
  const allowAllCollections = methods.watch('allowAllCollections');
  const history = useHistory();

  const onSubmit = methods.handleSubmit((data) => {
    updateRealm(data);
    history.push('set-up-infusion');
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <RadioGroup name="allowAllCollections" label="Select Collections">
          <RadioButton
            name="allowAllCollections"
            id="yes"
            label="Allow any collection to be infused"
            required
          />
          <RadioButton
            name="allowAllCollections"
            id="no"
            label="Only allow specific collections to be infused"
            required
          />
        </RadioGroup>

        {allowAllCollections === 'no' && (
          <MultiAddressInput name="allowedCollections" label="Allowed collections" required />
        )}

        <SubmitButton>Next</SubmitButton>
      </form>

      <DevTool control={methods.control} />
    </FormProvider>
  );
};
