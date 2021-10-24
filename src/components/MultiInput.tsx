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

const Container = styled.div``;

const Input = styled.input``;

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
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <>
      <Label name={`${name}.0`}>{label}</Label>

      {fields.map((field, index) => (
        <Container key={field.id}>
          <Input
            type="text"
            id={`${name}.${index}`}
            {...register(`${name}.${index}.value`)}
            {...rest}
          />
          <span onClick={() => remove(index)}>Remove</span>
        </Container>
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
