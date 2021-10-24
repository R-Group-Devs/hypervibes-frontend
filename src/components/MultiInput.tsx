import { useFieldArray, FieldValues, Control, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import Label from './Label';
import Input from './Input';

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

const MultiInput = styled(Input)`
  margin-bottom: 0.5em;
`;

const RemoveButton = styled.span<{ isVisible: boolean }>`
  margin-left: 1em;
  font-size: 14px;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};

  &:hover {
    cursor: pointer;
  }
`;

const AddAnotherButton = styled.span`
  position: relative;
  top: -0.25em;
  display: inline-block;
  font-size: 12px;

  &:hover {
    cursor: pointer;
  }
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
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <>
      <Label name={`${name}.0`}>{label}</Label>

      {fields.map((field, index) => (
        <Container key={field.id}>
          <MultiInput
            type="text"
            id={`${name}.${index}`}
            {...register(`${name}.${index}.value`)}
            {...rest}
          />

          <RemoveButton isVisible={fields.length > 1} onClick={() => remove(index)}>
            Remove
          </RemoveButton>
        </Container>
      ))}

      <AddAnotherButton
        onClick={(e) => {
          e.preventDefault();
          append({ value: '' });
        }}
      >
        Add another...
      </AddAnotherButton>
    </>
  );
};
