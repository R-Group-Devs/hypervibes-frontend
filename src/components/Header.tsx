import styled from 'styled-components';
import Nav from './Nav';
import ConnectWallet from './ConnectWallet';

const Container = styled.div``;

export default () => {
  return (
    <Container>
      <Nav />
      <ConnectWallet />
    </Container>
  );
};
