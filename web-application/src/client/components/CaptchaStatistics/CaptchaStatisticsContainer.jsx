import React from 'react';

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  Container,
  Col,
  Row,
  Table,
  Button,
} from 'reactstrap';
import { Line } from 'react-chartjs-2';
import {
  ComposableMap,
  Geographies,
  Geography,
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import ReactTooltip from 'react-tooltip';

import WORLD_JSON from './world.json';

import {
  card,
  cardTitle,
  cardSuccessFailureRate,
  cardSuccessFailureCounter,
  colorSuccess,
  colorFailure,
  sectionRow,
  containerIpAddresses,
  composableMap,
} from './styles.scss';

function randomData() {
  return Math.floor(Math.random() * 5);
}

// Scale this based on the maximum
const popScale = scaleLinear().domain([0, 10]).range(['#CFD8DC', '#37474F']);

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

const dummyIp = [
  '15.127.38.196',
  '84.34.228.132',
  '59.52.145.31',
  '65.234.135.18',
  '214.49.118.214',
  '99.217.223.115',
  '30.170.197.67',
  '5.89.120.66',
  '225.31.78.15',
  '139.216.19.140',
];

const mapCountryCodeToFreq = {
  RUS: 10,
  USA: 20,
  AUS: 15,
  CAN: 5,
};

function getCountryFreqData(countryCode) {
  return mapCountryCodeToFreq[countryCode] || 0;
}

function getCountryTooltipLabel(name, freq) {
  return `${name}: ${freq}`;
}

class CaptchaStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setTimeout(() => {
      ReactTooltip.rebuild();
    }, 100);
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

        {/* World Map */}
        <Row className={sectionRow}>
          <Col md="2" />
          <Col md="8">
            <div className={card}>
              <div className={cardTitle}>Worldwide Traffic Data</div>

              <ComposableMap
                projectionConfig={{
                  scale: 200,
                  rotation: [-11, 0, 0],
                }}
                width={980}
                height={551}
                className={composableMap}
              >
                <Geographies geography={WORLD_JSON}>
                  {(geographies, projection) => geographies.map((geography, i) => (
                    <Geography
                      key={i}
                      data-tip={getCountryTooltipLabel(
                        geography.properties.name,
                        getCountryFreqData(geography.properties.iso_a3),
                      )}
                      geography={geography}
                      projection={projection}
                      onClick={() => { console.log(geography.properties.iso_a3); }}
                      style={{
                        default: {
                          fill: popScale(getCountryFreqData(geography.properties.iso_a3)),
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        hover: {
                          fill: '#263238',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                        pressed: {
                          fill: '#263238',
                          stroke: '#607D8B',
                          strokeWidth: 0.75,
                          outline: 'none',
                        },
                      }}
                    />
                  ))}
                </Geographies>
              </ComposableMap>
              <ReactTooltip />
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
              <div className={containerIpAddresses}>
                <Table size="sm">
                  <thead>
                    <tr>
                      <th>IP Address</th>
                      <th>Date Clicked</th>
                      <th>Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dummyIp.map((ip, i) => (
                        <tr key={i}>
                          <td>{ip}</td>
                          <td>01-01-2018</td>
                          <td>United States</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
          <Col md="2" />
        </Row>
      </Container>
    );
  }
}

CaptchaStatisticsContainer.propTypes = {};

export default CaptchaStatisticsContainer;
