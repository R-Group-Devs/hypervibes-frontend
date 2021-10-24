import { UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';
import Label from './Label';

interface Props {
  name: string;
  id: string;
  label: string;
  required?: boolean;
  maxLength?: number;
  register: UseFormReturn['register'];
}

const Container = styled.div``;

const StyledLabel = styled(Label)`
  display: inline-block;
`;

const RadioButton = styled.input`
  display: inline-block;
`;

export default ({ register, id, name, label, required = false, ...rest }: Props) => (
  <Container>
    <RadioButton
      type="radio"
      id={`${name}-${id}`}
      value={id}
      {...register(name, { required })}
      {...rest}
    />
    <StyledLabel name={`${name}-${id}`}>{label}</StyledLabel>
  </Container>
);
