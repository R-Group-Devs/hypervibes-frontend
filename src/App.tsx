import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import NftProvider from './providers/NftProvider';
import PlaceholderPage from './pages/PlaceholderPage';
import CreateTenantBasicInfoPage from './pages/CreateTenantBasicInfoPage';
import CreateTenantSelectCollectionsPage from './pages/CreateTenantSelectCollectionsPage';
import CreateTenantSetUpInfusionPage from './pages/CreateTenantSetUpInfusionPage';
import CreateTenantAdvancedSettingsPage from './pages/CreateTenantAdvancedSettingsPage';
import CreateTenantSuccessPage from './pages/CreateTenantSuccessPage';
import NftListPage from './pages/NftListPage';
import NotFoundPage from './pages/NotFoundPage';
import GlobalStyle from './components/GlobalStyle';
import AppErrorMessage from './components/AppErrorMessage';

export default () => (
  <NftProvider>
    <Router>
      <GlobalStyle />
      <ErrorBoundary fallback={<AppErrorMessage />}>
        <Switch>
          <Route exact path="/">
            <PlaceholderPage />
          </Route>

          <Redirect exact from="/tenant/create" to="/tenant/create/basic-info" />

          <Route path="/tenant/create/basic-info">
            <CreateTenantBasicInfoPage />
          </Route>

          <Route path="/tenant/create/select-collections">
            <CreateTenantSelectCollectionsPage />
          </Route>

          <Route path="/tenant/create/set-up-infusion">
            <CreateTenantSetUpInfusionPage />
          </Route>

          <Route path="/tenant/create/advanced-settings">
            <CreateTenantAdvancedSettingsPage />
          </Route>

          <Route path="/tenant/create/success">
            <CreateTenantSuccessPage />
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
);
