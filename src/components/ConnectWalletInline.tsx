import styled from 'styled-components';
import { useWallet } from 'use-wallet';
import ConnectWallet from '../components/ConnectWallet';
import useAutoConnect from '../hooks/useAutoConnect';

interface Props {
  message?: string;
}

const Message = styled.p`
  margin-top: 2em;
`;

const StyledConnectWallet = styled(ConnectWallet)`
  position: static;
  margin-top: 1em;
`;

export default ({ message }: Props) => {
  const wallet = useWallet();
  const triedAutoConnect = useAutoConnect();

  return (
    <>
      {!wallet.account && triedAutoConnect && (
        <>
          {message && <Message>{message}</Message>}
          <StyledConnectWallet />
        </>
      )}
    </>
  );
};
