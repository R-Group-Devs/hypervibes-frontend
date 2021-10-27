import { useFormContext, useFieldArray } from 'react-hook-form';
import styled from 'styled-components';
import Label from './Label';
import AddressInput from './AddressInput';

interface Props {
  name: string;
  label: string;
  required?: boolean;
  maxLength?: number;
}

const Container = styled.div`
  display: flex;
`;

const StyledLabel = styled(Label)`
  display: inline-block;
`;

const Input = styled(AddressInput)`
  margin-bottom: 0.5em;
`;

const AddAnotherButton = styled.button`
  margin-left: 1em;
  padding: 0;
  display: inline-block;
  background: none;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #fff;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const RemoveButton = styled.button<{ isVisible: boolean }>`
  margin-top: 1.4em;
  margin-left: 1em;
  padding: 0;
  align-self: flex-start;
  font-size: 14px;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  background: none;
  font-family: 'Courier New', monospace;
  color: #fff;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export default ({ name, label, required, maxLength, ...rest }: Props) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <>
      <StyledLabel name={`${name}.0.value`}>{label}</StyledLabel>

      <AddAnotherButton
        onClick={(e) => {
          e.preventDefault();
          append({ value: '' });
        }}
      >
        Add another...
      </AddAnotherButton>

      {fields.map((field, index) => (
        <Container key={field.id}>
          <Input name={`${name}.${index}.value` as const} required={required} {...rest} />

          <RemoveButton isVisible={fields.length > 1} onClick={() => remove(index)}>
            Remove
          </RemoveButton>
        </Container>
      ))}
    </>
  );
};
