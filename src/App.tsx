import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import WalletProvider from './providers/WalletProvider';
import NftProvider from './providers/NftProvider';
import PlaceholderPage from './pages/PlaceholderPage';
import CreateRealmBasicInfoPage from './pages/CreateRealmBasicInfoPage';
import CreateRealmSelectCollectionsPage from './pages/CreateRealmSelectCollectionsPage';
import CreateRealmSetUpInfusionPage from './pages/CreateRealmSetUpInfusionPage';
import CreateRealmAdvancedSettingsPage from './pages/CreateRealmAdvancedSettingsPage';
import CreateRealmSuccessPage from './pages/CreateRealmSuccessPage';
import NftListPage from './pages/NftListPage';
import NotFoundPage from './pages/NotFoundPage';
import GlobalStyle from './components/GlobalStyle';
import Header from './components/Header';
import AppErrorMessage from './components/AppErrorMessage';

export default () => (
  <WalletProvider>
    <NftProvider>
      <Router>
        <GlobalStyle />

        <ErrorBoundary fallback={<AppErrorMessage />}>
          <Header />

          <Switch>
            <Route exact path="/">
              <PlaceholderPage />
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

            <Route path="/nfts">
              <NftListPage />
            </Route>

            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </ErrorBoundary>
      </Router>
    </NftProvider>
  </WalletProvider>
);
