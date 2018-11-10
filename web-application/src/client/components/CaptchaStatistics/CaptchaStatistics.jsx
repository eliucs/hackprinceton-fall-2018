import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from './styles.scss';

const CaptchaStatistics = props => (
  <div className={appStyles}>
    <h1>{props.title}</h1>
  </div>
);

CaptchaStatistics.propTypes = {
  title: PropTypes.string,
};

export default CaptchaStatistics;
