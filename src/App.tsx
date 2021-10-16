import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import PlaceholderPage from './pages/PlaceholderPage';
import CreateTenantPage from './pages/CreateTenantPage';
import NotFoundPage from './pages/NotFoundPage';
import GlobalStyle from './components/GlobalStyle';
import AppErrorMessage from './components/AppErrorMessage';

const App = () => (
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

        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </ErrorBoundary>
  </Router>
);

export default App;
