import { useFormContext, useFieldArray } from 'react-hook-form';
import Label from './Label';
import Input from './Input';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label: string;
  required?: boolean;
}

export default ({ name, label, required = false, ...rest }: Props) => {
  const { register, formState } = useFormContext();

  return (
    <div>
      <Label name={name} isRequired={required}>
        {label}
      </Label>

      <Input
        type="number"
        id={name}
        hasError={formState.errors[name]}
        {...register(name, { required, valueAsNumber: true })}
        {...rest}
      />

      <FormFieldErrorMessage error={formState.errors[name]} />
    </div>
  );
};
