import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';

const Container = styled.div``;

export default () => {
  const history = useHistory();

  if (history.location.pathname === '/') {
    return null;
  }

  return (
    <Container>
      <ConnectWallet />
    </Container>
  );
};
