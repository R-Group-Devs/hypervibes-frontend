import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface Props {
  error: FieldError;
  maxLength?: number;
}

const Container = styled.div`
  margin-top: 0.5em;
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
      {error && error.type === 'required' && <span>This field is required.</span>}
      {error && error.type === 'maxLength' && (
        <span>This field must be shorter {maxLength} characters.</span>
      )}
    </Message>
  </Container>
);
