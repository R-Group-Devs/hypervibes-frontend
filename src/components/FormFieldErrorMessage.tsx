import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

interface Props {
  error: FieldError;
}

const Container = styled.div`
  margin-top: 0.5em;
  height: 20px;
  font-size: 12px;
`;

export default ({ error }: Props) => (
  <Container>
    {error && error.type === 'required' && <span>This field is required.</span>}
    {error && error.type === 'maxLength' && <span>This field must be shorter.</span>}
  </Container>
);
