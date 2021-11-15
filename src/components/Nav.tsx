import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import logo from '../assets/images/logo.svg';

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

export default () => {
  const wallet = useWallet();
  const location = useLocation();
  const pageName = location.pathname.split('/')[1];

  if (!pageName || pageName === 'app') {
    return null;
  }

  return (
    <Container>
      <Link to="/app">
        <Logo src={logo} alt="" />
      </Link>

      <NavigationLink to={`/${wallet.networkName ?? 'mainnet'}/realms`}>
        Explore
      </NavigationLink>

      <NavigationLink to="/realm/create">Create Realm</NavigationLink>
      <NavigationLink to="/infuse">Infuse</NavigationLink>
      <NavigationLink to="/claim">Claim</NavigationLink>
    </Container>
  );
};
