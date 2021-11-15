import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';
import WalletProvider from './providers/WalletProvider';
import QueryProvider from './providers/QueryProvider';
import NftProvider from './providers/NftProvider';
import ScrollToTop from './components/ScrollToTop';
import PlaceholderPage from './pages/PlaceholderPage';
import ChooseYourPathPage from './pages/ChooseYourPathPage';
import CreateRealmBasicInfoPage from './pages/CreateRealmBasicInfoPage';
import CreateRealmSelectCollectionsPage from './pages/CreateRealmSelectCollectionsPage';
import CreateRealmSetUpInfusionPage from './pages/CreateRealmSetUpInfusionPage';
import CreateRealmSetUpClaimingPage from './pages/CreateRealmSetUpClaimingPage';
import CreateRealmSuccessPage from './pages/CreateRealmSuccessPage';
import InfuseNftSelectRealmPage from './pages/InfuseNftSelectRealmPage';
import InfuseNftSelectCollectionPage from './pages/InfuseNftSelectCollectionPage';
import InfuseNftSelectTokenPage from './pages/InfuseNftSelectTokenPage';
import InfuseNftInputTokenPage from './pages/InfuseNftInputTokenPage';
import InfuseNftEnterInfusionAmountPage from './pages/InfuseNftEnterInfusionAmountPage';
import ClaimTokensSelectRealmPage from './pages/ClaimTokensSelectRealmPage';
import ClaimTokensSelectTokenPage from './pages/ClaimTokensSelectTokenPage';
import ClaimTokensEnterClaimAmountPage from './pages/ClaimTokensEnterClaimAmountPage';
import NftListPage from './pages/NftListPage';
import NotFoundPage from './pages/NotFoundPage';
import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import SocialLinks from './components/SocialLinks';
import AppErrorMessage from './components/AppErrorMessage';
import BrowseRealmsPage from './pages/BrowseRealmsPage';
import BrowseNftsPage from './pages/BrowseNftsPage';
import NftDetailPage from './pages/NftDetailPage';

const AppContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 10em 0;
  max-width: 1200px;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

export default () => (
  <WalletProvider>
    <QueryProvider>
      <NftProvider>
        <Router>
          <ScrollToTop />
          <GlobalStyle />

          <ErrorBoundary fallback={<AppErrorMessage />}>
            <AppContainer>
              <Header />
              <SocialLinks />

              <Switch>
                <Redirect exact from="/app" to="/" />

                <Route exact path="/">
                  <ChooseYourPathPage />
                </Route>

                <Redirect
                  exact
                  from="/realm/create"
                  to="/realm/create/basic-info"
                />

                <Route path="/realm/create/basic-info">
                  <CreateRealmBasicInfoPage />
                </Route>

                <Route path="/realm/create/select-collections">
                  <CreateRealmSelectCollectionsPage />
                </Route>

                <Route path="/realm/create/set-up-infusion">
                  <CreateRealmSetUpInfusionPage />
                </Route>

                <Route path="/realm/create/set-up-claiming">
                  <CreateRealmSetUpClaimingPage />
                </Route>

                <Route path="/realm/create/success">
                  <CreateRealmSuccessPage />
                </Route>

                <Redirect exact from="/infuse" to="/infuse/select-realm" />

                <Route path="/infuse/select-realm">
                  <InfuseNftSelectRealmPage />
                </Route>

                <Route path="/infuse/realm/:realmId/select-collection">
                  <InfuseNftSelectCollectionPage />
                </Route>

                <Route path="/infuse/realm/:realmId/token/:tokenId">
                  <InfuseNftSelectTokenPage />
                </Route>

                <Route path="/infuse/realm/:realmId/collection/:collection/select-token">
                  <InfuseNftInputTokenPage />
                </Route>

                <Route path="/infuse/realm/:realmId/collection/:collection/token/:tokenId">
                  <InfuseNftEnterInfusionAmountPage />
                </Route>

                <Redirect exact from="/claim" to="/claim/select-realm" />

                <Route path="/claim/select-realm">
                  <ClaimTokensSelectRealmPage />
                </Route>

                <Route path="/claim/realm/:realmId/select-token">
                  <ClaimTokensSelectTokenPage />
                </Route>

                <Route path="/claim/realm/:realmId/collection/:collection/token/:tokenId">
                  <ClaimTokensEnterClaimAmountPage />
                </Route>

                <Route path="/nfts">
                  <NftListPage />
                </Route>

                <Route exact path="/:network/realms">
                  <BrowseRealmsPage />
                </Route>

                <Route exact path="/:network/realms/:realmId/nfts">
                  <BrowseNftsPage />
                </Route>

                <Route exact path="/:network/tokens/:collection/:tokenId">
                  <NftDetailPage />
                </Route>

                <Route path="*">
                  <NotFoundPage />
                </Route>
              </Switch>
            </AppContainer>
          </ErrorBoundary>
        </Router>
      </NftProvider>
    </QueryProvider>
  </WalletProvider>
);
