import { useFieldArray, FieldValues, Control, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import Label from './Label';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  maxLength?: number;
  register: UseFormReturn['register'];
  control: Control<FieldValues>;
  errors: UseFormReturn['formState']['errors'];
}

const Input = styled.input`
  display: block;
`;

export default ({
  register,
  control,
  name,
  label,
  required,
  maxLength,
  errors,
  ...rest
}: Props) => {
  const { fields, append } = useFieldArray({ control, name });

  return (
    <>
      <Label name={`${name}.0`}>{label}</Label>

      {fields.map((field, index) => (
        <Input
          type="text"
          key={field.id}
          id={`${name}.${index}`}
          {...register(`${name}.${index}.value`)}
          {...rest}
        />
      ))}

      <button
        onClick={(e) => {
          e.preventDefault();
          append({ value: '' });
        }}
      >
        Add another...
      </button>
    </>
  );
};
