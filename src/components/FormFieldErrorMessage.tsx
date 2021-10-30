import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface Props {
  error?: FieldError;
  maxLength?: number;
}

const Container = styled.div`
  margin-top: 0.75em;
  height: 20px;
  font-size: 12px;
`;

const Message = styled.span<{ isVisible: boolean }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.2s;
`;

export default ({ error, maxLength }: Props) => (
  <Container>
    <Message isVisible={!!error}>
      {error?.type === 'required' && 'This field is required.'}
      {error?.type === 'maxLength' && `This field must be shorter ${maxLength} characters.`}
      {error?.type === 'minValue' && 'Enter a value higher than zero.'}
      {error?.type === 'address' && 'Enter a valid Ethereum address or ENS name.'}
    </Message>
  </Container>
);
