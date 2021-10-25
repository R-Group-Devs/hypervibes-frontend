import ConnectWallet from './ConnectWallet';
import { useHistory } from 'react-router-dom';

export default () => {
  const history = useHistory();

  if (history.location.pathname === '/') {
    return null;
  }

  return <ConnectWallet />;
};
