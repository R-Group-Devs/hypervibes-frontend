import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PlaceholderPage from './pages/PlaceholderPage';
import CreateTenantPage from './pages/CreateTenantPage';
import NotFoundPage from './pages/NotFoundPage';
import GlobalStyle from './components/GlobalStyle';

const App = () => (
  <>
    <Router>
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
    </Router>

    <GlobalStyle />
  </>
);

export default App;
