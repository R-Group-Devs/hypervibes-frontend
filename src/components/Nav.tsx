import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import logo from '../assets/images/logo.svg';
import { NETWORKS } from '../constants/contracts';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 42px;
  width: 100%;
`;

const NavigationLink = styled(Link)`
  font-family: '3616 Grammastile', sans-serif;
  font-size: 6px;
  display: inline-block;
  margin-left: 16px;
  margin-right: 16px;
  color: #fff;
`;

const Logo = styled.img`
  position: absolute;
  left: 40px;
`;

// return a network name if we're already within the explore part of the app
const currentExploreNetwork = (pathname: string): string | undefined => {
  const match = pathname.match(/\/(\w+)\//);
  if (!match) {
    return undefined;
  }

  // if it matches a network, we're good
  const [, part] = match;
  if (NETWORKS[part]) {
    return part;
  }

  return undefined;
};

// handle differences from network names from web3 wallet
const exploreNetworkFromWalletNetwork = (
  network: string | null
): string | undefined => {
  if (!network) {
    return undefined;
  } else if (network === 'main') {
    return 'mainnet';
  }

  return network;
};

export default () => {
  const wallet = useWallet();
  const location = useLocation();
  const pageName = location.pathname.split('/')[1];

  if (!pageName) {
    return null;
  }

  const exploreNetwork = currentExploreNetwork(location.pathname);
  const exploreDestination =
    exploreNetwork ??
    exploreNetworkFromWalletNetwork(wallet.networkName) ??
    'mainnet';

  return (
    <Container>
      <Link to="/">
        <Logo src={logo} alt="" />
      </Link>

      <NavigationLink to={`/${exploreDestination}/realms`}>
        Explore
      </NavigationLink>

      <NavigationLink to="/realm/create">Create Realm</NavigationLink>
      <NavigationLink to="/infuse">Infuse</NavigationLink>
      <NavigationLink to="/claim">Claim</NavigationLink>
    </Container>
  );
};
