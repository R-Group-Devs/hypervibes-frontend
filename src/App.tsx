import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import NftProvider from './providers/NftProvider';
import PlaceholderPage from './pages/PlaceholderPage';
import CreateTenantPage from './pages/CreateTenantPage';
import NftListPage from './pages/NftListPage';
import NotFoundPage from './pages/NotFoundPage';
import GlobalStyle from './components/GlobalStyle';
import AppErrorMessage from './components/AppErrorMessage';

const App = () => (
  <NftProvider>
    <Router>
      <GlobalStyle />
      <ErrorBoundary fallback={<AppErrorMessage />}>
        <Switch>
          <Route exact path="/">
            <PlaceholderPage />
          </Route>

          <Route path="/tenant/create">
            <CreateTenantPage />
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

export default App;
