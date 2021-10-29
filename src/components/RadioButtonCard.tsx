import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

export interface Props {
  name: string;
  id: string;
  label: string;
  children: React.ReactNode;
}

const Container = styled.div``;

const Card = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 310px;
  height: 138px;
  background: #0b0b0b;
  border: ${({ isSelected }) => (isSelected ? '2px solid #bcff67' : '1px solid #fff')};
  box-shadow: ${({ isSelected }) => (isSelected ? '0 0 40px 0 #bcff67' : 'none')};
  border-radius: 20px;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    border: 2px solid #bcff67;
  }
`;

const Label = styled.div`
  margin: 1.5em 1em 0;
`;

export default ({ name, id, label, children }: Props) => {
  const { watch, setValue } = useFormContext();
  const value = watch(name);

  return (
    <Container onClick={() => setValue(name, id)}>
      <Card isSelected={value === id}>{children}</Card>
      <Label>{label}</Label>
    </Container>
  );
};