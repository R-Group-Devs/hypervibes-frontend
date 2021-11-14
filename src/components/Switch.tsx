import styled from 'styled-components';
import { useFormContext } from 'react-hook-form';

export interface Props {
  name: string;
  id: string;
  label: string;
}

const Container = styled.div``;

const Option = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5em;
  width: 264px;
  height: 64px;
  font-size: 20px;
  font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};
  background: ${({ isSelected }) =>
    isSelected
      ? 'linear-gradient(rgba(188, 255, 103, 0.8), rgba(23, 255, 227, 0.8)) 40%'
      : 'none'};
  text-transform: uppercase;
  border: ${({ isSelected }) =>
    isSelected ? '2px solid transparent' : '2px solid #fff'};
  border-radius: 10px;

  &:hover {
    border: ${({ isSelected }) =>
      isSelected ? '2px solid transparent' : '2px solid #17ffe3'};
    transition: all 0.2s;
    cursor: pointer;
  }
`;

export default ({ name, id, label }: Props) => {
  const { watch, setValue } = useFormContext();
  const value = watch(name);

  return (
    <Container onClick={() => setValue(name, id)}>
      <Option isSelected={value === id}>{label}</Option>
    </Container>
  );
};
