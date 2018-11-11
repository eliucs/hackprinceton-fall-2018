import React from 'react';
import PropTypes from 'prop-types';
import { appStyles } from './styles.scss';

const MainPage = props => (
  <div className={appStyles}>
  </div>
);

MainPage.propTypes = {
  title: PropTypes.string,
};

export default MainPage;
