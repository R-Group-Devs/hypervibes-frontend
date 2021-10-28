import { useFormContext, useFieldArray } from 'react-hook-form';
import styled from 'styled-components';
import Label from './Label';
import AddressInput from './AddressInput';
import plusIcon from '../assets/images/icons/plus.svg';

interface Props {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  maxLength?: number;
}

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const StyledLabel = styled(Label)`
  display: inline-block;
`;

const Description = styled.p`
  margin: 0 0 0.5em;
  font-size: 14px;
  font-weight: 300;
`;

const Input = styled(AddressInput)`
  margin-bottom: 0.5em;
`;

const AddAnotherButton = styled.button`
  padding: 0;
  display: flex;
  align-items: center;
  background: none;
  font-size: 14px;
  color: #fff;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

const PlusIcon = styled.img`
  margin-right: 1em;
`;

const RemoveButton = styled.button<{ isVisible: boolean }>`
  position: absolute;
  top: -1.55em;
  right: 0;
  margin-top: 1.4em;
  margin-left: 1em;
  padding: 1em 0 0 2em;
  align-self: flex-start;
  font-size: 14px;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  background: #000;
  color: #fff;
  border: none;

  &:hover {
    cursor: pointer;
  }
`;

export default ({ name, label, description, required, maxLength, ...rest }: Props) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <>
      <StyledLabel name={`${name}.0.value`}>{label}</StyledLabel>
      <Description>{description}</Description>

      {fields.map((field, index) => (
        <Container key={field.id}>
          <Input name={`${name}.${index}.value` as const} required={required} {...rest} />

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
        <PlusIcon src={plusIcon} alt="+" />
        <span>Add more admins</span>
      </AddAnotherButton>
    </>
  );
};
