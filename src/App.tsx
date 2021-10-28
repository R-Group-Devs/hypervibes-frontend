import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import styled from 'styled-components';
import WalletProvider from './providers/WalletProvider';
import QueryProvider from './providers/QueryProvider';
import NftProvider from './providers/NftProvider';
import PlaceholderPage from './pages/PlaceholderPage';
import ChooseYourPathPage from './pages/ChooseYourPathPage';
import CreateRealmBasicInfoPage from './pages/CreateRealmBasicInfoPage';
import CreateRealmSelectCollectionsPage from './pages/CreateRealmSelectCollectionsPage';
import CreateRealmSetUpInfusionPage from './pages/CreateRealmSetUpInfusionPage';
import CreateRealmAdvancedSettingsPage from './pages/CreateRealmAdvancedSettingsPage';
import CreateRealmSuccessPage from './pages/CreateRealmSuccessPage';
import InfuseNftSelectRealmPage from './pages/InfuseNftSelectRealmPage';
import InfuseNftSelectCollectionPage from './pages/InfuseNftSelectCollectionPage';
import InfuseNftSelectTokenPage from './pages/InfuseNftSelectTokenPage';
import InfuseNftEnterParametersPage from './pages/InfuseNftEnterParametersPage';
import InfuseNftSuccessPage from './pages/InfuseNftSuccessPage';
import ClaimTokensSelectRealmPage from './pages/ClaimTokensSelectRealmPage';
import ClaimTokensSelectCollectionPage from './pages/ClaimTokensSelectCollectionPage';
import ClaimTokensSelectTokenPage from './pages/ClaimTokensSelectTokenPage';
import ClaimTokensEnterParametersPage from './pages/ClaimTokensEnterParametersPage';
import ClaimTokensSuccessPage from './pages/ClaimTokensSuccessPage';
import NftListPage from './pages/NftListPage';
import NotFoundPage from './pages/NotFoundPage';
import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import AppErrorMessage from './components/AppErrorMessage';

const AppContainer = styled.div`
  display: flex;
  margin: 0 auto;
  padding: 9em 0;
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
          <GlobalStyle />

          <ErrorBoundary fallback={<AppErrorMessage />}>
            <AppContainer>
              <Header />

              <Switch>
                <Route exact path="/">
                  <PlaceholderPage />
                </Route>

                <Route path="/app">
                  <ChooseYourPathPage />
                </Route>

                <Redirect exact from="/realm/create" to="/realm/create/basic-info" />

                <Route path="/realm/create/basic-info">
                  <CreateRealmBasicInfoPage />
                </Route>

                <Route path="/realm/create/select-collections">
                  <CreateRealmSelectCollectionsPage />
                </Route>

                <Route path="/realm/create/set-up-infusion">
                  <CreateRealmSetUpInfusionPage />
                </Route>

                <Route path="/realm/create/advanced-settings">
                  <CreateRealmAdvancedSettingsPage />
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

                <Route path="/infuse/realm/:realmId/collection/:collection/select-token">
                  <InfuseNftSelectTokenPage />
                </Route>

                <Route path="/infuse/realm/:realmId/collection/:collection/token/:tokenId">
                  <InfuseNftEnterParametersPage />
                </Route>

                <Route path="/infuse/success">
                  <InfuseNftSuccessPage />
                </Route>

                <Redirect exact from="/claim" to="/claim/select-realm" />

                <Route path="/claim/select-realm">
                  <ClaimTokensSelectRealmPage />
                </Route>

                <Route path="/claim/realm/:realmId/select-collection">
                  <ClaimTokensSelectCollectionPage />
                </Route>

                <Route path="/claim/realm/:realmId/collection/:collection/select-token">
                  <ClaimTokensSelectTokenPage />
                </Route>

                <Route path="/claim/realm/:realmId/collection/:collection/token/:tokenId">
                  <ClaimTokensEnterParametersPage />
                </Route>

                <Route path="/claim/success">
                  <ClaimTokensSuccessPage />
                </Route>

                <Route path="/nfts">
                  <NftListPage />
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
