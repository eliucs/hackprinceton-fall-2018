import React from 'react';
import PropTypes from 'prop-types';
import { sectionHeader } from './styles.scss';

import { Button, Container, Col, Row } from 'reactstrap';

const Dashboard = props => (
  <Container>
    <Row>
      <Col md="2" />
      <Col md="8">
        <div className={sectionHeader}>Create new audioCAPTCHA</div>
        <Button color="primary">+ Create New</Button>
      </Col>
      <Col md="2" />
    </Row>

    <Row>
      <Col md="2" />
      <Col md="8">
        <div className={sectionHeader}>My Existing audioCAPTCHA</div>
      </Col>
      <Col md="2" />
    </Row>
  </Container>
);

Dashboard.propTypes = {
  title: PropTypes.string,
};

export default Dashboard;
