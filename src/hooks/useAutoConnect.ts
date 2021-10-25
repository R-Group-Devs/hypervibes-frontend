import { useState, useEffect } from 'react';
import { useWallet } from 'use-wallet';

export default () => {
  const [tried, setTried] = useState(false);
  const wallet = useWallet();

  useEffect(() => {
    const cachedWallet = localStorage.getItem('__CONNECTED_WALLET');

    if (wallet.status === 'connected' && wallet.connector) {
      localStorage.setItem('__CONNECTED_WALLET', wallet.connector);
      setTried(true);
    }

    if (!tried && wallet.status === 'disconnected' && cachedWallet) {
      wallet.connect(cachedWallet).then(() => setTried(true));
    }

    if (!cachedWallet) {
      setTried(true);
    }

    if (tried && wallet.status === 'disconnected') {
      localStorage.removeItem('__CONNECTED_WALLET');
    }
  }, [wallet, tried]);

  return tried;
};
