import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from './styles.scss';

const Dashboard = props => (
  <div className={appStyles}>
    <h1>{props.title}</h1>
  </div>
);

Dashboard.propTypes = {
  title: PropTypes.string,
};

export default Dashboard;
