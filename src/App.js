/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import routes from './config/routes';
import { isUserAuthenticated, isPenjagaParkirToken } from './utils/cookie';
import { Header } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (isUserAuthenticated()) {
          return <Component />;
        }
        return <Redirect to="/loginmember" />;
      }}
    />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Header isPenjaga={isPenjagaParkirToken()} show={isUserAuthenticated()} />
      <Switch>
        {routes.map((route) => {
          if (route.isPublic) {
            return (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
              />
            );
          }
          return (
            <PrivateRoute
              path={route.path}
              component={route.component}
              key={route.path}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
