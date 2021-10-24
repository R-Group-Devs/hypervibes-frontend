import { useFormContext } from 'react-hook-form';
import { get } from 'lodash';
import Label from './Label';
import Input from './Input';
import FormFieldErrorMessage from './FormFieldErrorMessage';

interface Props {
  name: string;
  label?: string;
  required?: boolean;
  maxLength?: number;
  validate?: Record<string, (value: string) => boolean>;
}

export default ({ name, label, required = false, maxLength, validate, ...rest }: Props) => {
  const { register, formState } = useFormContext();

  return (
    <div>
      {label && (
        <Label name={name} isRequired={required}>
          {label}
        </Label>
      )}

      <Input
        type="text"
        id={name}
        hasError={get(formState.errors, name)}
        {...register(name, { required, maxLength, validate })}
        {...rest}
      />

      <FormFieldErrorMessage error={get(formState.errors, name)} maxLength={maxLength} />
    </div>
  );
};
