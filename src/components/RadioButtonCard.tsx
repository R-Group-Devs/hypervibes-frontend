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
  margin-right: 2em;
  width: 310px;
  height: 138px;
  background: #0b0b0b;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ isSelected }) => (isSelected ? '#bcff67' : '#fff')};
  outline-width: 1px;
  outline-style: solid;
  outline-color: ${({ isSelected }) =>
    isSelected ? '#bcff67' : 'transparent'};
  box-shadow: ${({ isSelected }) =>
    isSelected ? '0 0 40px 0 #bcff67' : 'none'};
  border-radius: 20px;
  transition: all 0.2s;

  &:hover {
    border-color: #bcff67;
    outline-color: #bcff67;
    cursor: pointer;
  }
`;

const Label = styled.div`
  margin: 1.5em 1em 0;
`;

export default ({ name, id, label, children }: Props) => {
  const { watch, setValue } = useFormContext();
  const value = watch(name);

  return (
    <Container>
      <Card isSelected={value === id} onClick={() => setValue(name, id)}>
        {children}
      </Card>
      <Label>{label}</Label>
    </Container>
  );
};
