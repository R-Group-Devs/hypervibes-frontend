import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import NftProvider from './providers/NftProvider';
import PlaceholderPage from './pages/PlaceholderPage';
import CreateTenantBasicInfoPage from './pages/CreateTenantBasicInfoPage';
import CreateTenantSelectCollectionsPage from './pages/CreateTenantSelectCollectionsPage';
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

          <Route path="/tenant/create/basic-info">
            <CreateTenantBasicInfoPage />
          </Route>

          <Route path="/tenant/create/select-collections">
            <CreateTenantSelectCollectionsPage />
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
