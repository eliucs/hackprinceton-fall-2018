import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import NavBar from 'components/NavBar';
import Dashboard from 'components/Dashboard';
import CaptchaStatistics from 'components/CaptchaStatistics';

// TODO: Finish implementing these later
// import MainPage from 'components/MainPage';
// import SignupPage from 'components/SignupPage';

/**
 * Renders the AppRouter stateless functional component.
 */
class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavbar: false,
    };
  }

  // TODO: For now, redirect to /dashboard, implement login and signup system later

  render() {
    return (
      <BrowserRouter>
        <div>
          { this.state.showNavbar && <NavBar /> }
          <Switch>
            <Route
              path="/"
              component={() => <Redirect to="/dashboard" />}
              exact
            />

            <Route
              path="/signup"
              component={() => <Redirect to="/dashboard" />}
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
              path="*"
              component={() => <Redirect to="/" />}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default AppRouter;

// Old routes
// <Route
//   path="/"
//   component={() => <MainPage />}
//   exact
// />

// <Route
//   path="/signup"
//   component={() => <SignupPage />}
//   exact
// />
