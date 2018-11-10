import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from './styles.scss';

const SignupPage = props => (
  <div className={appStyles}>
    <h1>{props.title}</h1>
  </div>
);

SignupPage.propTypes = {
  title: PropTypes.string,
};

export default SignupPage;
