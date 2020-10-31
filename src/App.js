import React from 'react';
import Home from './components/Home';
import Store from './components/Store';
import Login from './components/Login';

import Container from '@material-ui/core/Container';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const routes = [
  {
    name: 'Home',
    path: '/home',
    exact: true,
    component: <Home />,
  },
  {
    name: 'Login',
    path: '/',
    exact: true,
    component: <Login />,
  },
];

const App = () => {
  return (
    <div>
      <Store>
        <Router>
          <Container style={{ marginTop: '5rem' }}>
            <Switch>
              {routes.map((route) => (
                <Route
                  key={route.name}
                  path={route.path}
                  exact={route.exact}
                  render={() => route.component}
                />
              ))}
            </Switch>
          </Container>
        </Router>
      </Store>
    </div>
  );
};

export default App;
