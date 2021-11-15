import styled from 'styled-components';

interface Props {
  errors: string[];
}

const Container = styled.ul`
  margin-top: 2em;
  margin-bottom: 3em;
  padding: 1em 3em;
  border: 1px solid #ff6b6b;
  color: #ff6b6b;
`;

const FormError = styled.li``;

export default ({ errors }: Props) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <Container>
      {errors.map(error => (
        <FormError key={error}>{error}</FormError>
      ))}
    </Container>
  );
};
