import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  Container,
  Col,
  Row,
  Button,
} from 'reactstrap';
import { Line } from 'react-chartjs-2';

import WorldwideTrafficData from './WorldwideTrafficData';
import IPAddressListings from './IPAddressListings';

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
      borderColor: '#29B6F6',
      backgroundColor: '#B3E5FC',
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

const dummyIpData = [
  {
    ip: '15.127.38.196',
    date: '01-01-2018',
    countryName: 'United States',
  },
  {
    ip: '15.127.38.196',
    date: '01-01-2018',
    countryName: 'United States',
  },
  {
    ip: '15.127.38.196',
    date: '01-01-2018',
    countryName: 'United States',
  },
];

const mapCountryToFreq = {
  USA: 20,
  CAN: 15,
  AUS: 10,
  RUS: 5,
  CHN: 2,
};

class CaptchaStatisticsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="2" />
          <Col md="8">
            <Button color="primary">Back</Button>
          </Col>
          <Col md="2" />
        </Row>

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

        <WorldwideTrafficData
          title="Worldwide Traffic Data"
          mapCountryToFreq={mapCountryToFreq}
        />

        <IPAddressListings
          title="Traffic by IP Address"
          data={dummyIpData}
          maxDataLimit={100}
        />
      </Container>
    );
  }
}

CaptchaStatisticsContainer.propTypes = {};

export default CaptchaStatisticsContainer;
