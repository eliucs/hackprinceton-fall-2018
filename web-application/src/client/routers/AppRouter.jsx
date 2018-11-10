import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import App from 'components/App';

/**
 * Renders the AppRouter stateless functional component.
 */
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route
          path="/"
          component={() => <App title="Test Title" />}
          exact
        />

        <Route
          path="*"
          component={() => <Redirect to="/" />}
        />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
