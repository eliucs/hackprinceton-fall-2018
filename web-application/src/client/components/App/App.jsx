import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from './styles.scss';

const App = props => (
  <div className={appStyles}>
    <h1>{props.title}</h1>
  </div>
);

App.propTypes = {
  title: PropTypes.string,
};

export default App;
