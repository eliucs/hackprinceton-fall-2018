import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import NavBar from 'components/NavBar';
import MainPage from 'components/MainPage';
import Dashboard from 'components/Dashboard';
import CaptchaStatistics from 'components/CaptchaStatistics';
import SignupPage from 'components/SignupPage';

/**
 * Renders the AppRouter stateless functional component.
 */
const AppRouter = () => (
  <BrowserRouter>
    <div>
      <NavBar />
      <Switch>
        <Route
          path="/"
          component={() => <MainPage title="main page" />}
          exact
        />

        <Route
          path="/dashboard"
          component={() => <Dashboard />}
          exact
        />

        <Route
          path="/dashboard/:captchaId"
          component={() => <CaptchaStatistics />}
          exact
        />

        <Route
          path="/signup"
          component={() => <SignupPage title="signup" />}
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
