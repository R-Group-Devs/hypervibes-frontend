import { useParams } from 'react-router';
import styled from 'styled-components';

interface Params {
  network: string;
}

const Container = styled.div``;

export default () => {
  const { network } = useParams<Params>();
  return (
    <Container>
      <p>browse realms - {network}</p>
    </Container>
  );
};
