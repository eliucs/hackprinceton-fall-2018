import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Container, Col, Row } from 'reactstrap';
import { Line } from 'react-chartjs-2';

import {
  card,
  cardTitle,
  cardSuccessFailureRate,
  cardSuccessFailureCounter,
  colorSuccess,
  colorFailure,
  sectionRow,
} from './styles.scss';

function randomData() {
  return Math.floor(Math.random() * 5);
}

const dummyData = {
  labels: [
    '01-01-2018',
    '01-02-2018',
    '01-03-2018',
    '01-04-2018',
    '01-05-2018',
    '01-06-2018',
    '01-07-2018',
  ],
  datasets: [
    {
      label: 'Traffic',
      data: [
        randomData(),
        randomData(),
        randomData(),
        randomData(),
        randomData(),
        randomData(),
        randomData(),
      ],
      borderColor: '#01579B',
      backgroundColor: '#0288D1',
    },
  ],
};

const dummyOptions = {
  responsive: true,
  tooltips: {
    mode: 'label',
  },
  scales: {
    xAxes: [
      {
        display: true,
        scaleLabel: {
          show: true,
          labelString: 'Day',
        },
      },
    ],
    yAxes: [
      {
        display: true,
        scaleLabel: {
          show: true,
          labelString: 'Clicks',
        },
      },
    ],
  },
};

const CaptchaStatistics = props => (
  <Container fluid>
    {/* Success/Failure Rate */}
    <Row className={sectionRow}>
      <Col md="2" />
      <Col md="4">
        <div className={card}>
          <div className={cardTitle}>Success Rate</div>
          <div className={classnames(cardSuccessFailureRate, colorSuccess)}>50%</div>
          <div className={cardSuccessFailureCounter}>From 50/100 attempts</div>
        </div>
      </Col>
      <Col md="4">
        <div className={card}>
          <div className={cardTitle}>Failure Rate</div>
          <div className={classnames(cardSuccessFailureRate, colorFailure)}>50%</div>
          <div className={cardSuccessFailureCounter}>From 50/100 attempts</div>
        </div>
      </Col>
      <Col md="2" />
    </Row>

    {/* Traffic Timeseries */}
    <Row className={sectionRow}>
      <Col md="2" />
      <Col md="8">
        <div className={card}>
          <div className={cardTitle}>Traffic Over Time</div>
          <Line
            data={dummyData}
            options={dummyOptions}
          />
        </div>
      </Col>
      <Col md="2" />
    </Row>

    {/* World Map */}
    <Row className={sectionRow}>
      <Col md="2" />
      <Col md="8">
        <div className={card}>
          <div className={cardTitle}>Worldwide Traffic Data</div>
        </div>
      </Col>
      <Col md="2" />
    </Row>

    {/* IP Address Listings */}
    <Row className={sectionRow}>
      <Col md="2" />
      <Col md="8">
        <div className={card}>
          <div className={cardTitle}>Traffic by IP Address</div>
        </div>
      </Col>
      <Col md="2" />
    </Row>
  </Container>
);

CaptchaStatistics.propTypes = {};

export default CaptchaStatistics;

// TODO: back button
// <Row>
// <Col md="2" />
// <Col md="8">
//   Back
// </Col>
// <Col md="2" />
// </Row>
