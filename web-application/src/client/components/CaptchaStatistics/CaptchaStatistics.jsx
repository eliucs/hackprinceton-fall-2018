import React from 'react';
import { Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';

import NavBar from 'components/NavBar';
import BackButton from './BackButton';
import SuccessFailureRatesDisplay from './SuccessFailureRatesDisplay';
import TrafficTimeseries from './TrafficTimeseries';
import WorldwideTrafficData from './WorldwideTrafficData';
import IPAddressListings from './IPAddressListings';

import {
  containerCaptchaStatistics,
} from './styles.scss';

function randomData() {
  return Math.floor(Math.random() * 5);
}

const dummyTimeseriesData = {
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

const dummySuccess = 0;
const dummyFailure = 0;

class CaptchaStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goBack: false,
    };
  }

  componentDidMount() {
    // Make requests to get the data from Firebase
  }

  handleBackClick = () => {
    this.setState({ goBack: true });
  };

  render() {
    if (this.state.goBack) {
      return (
        <Redirect to="/dashboard" />
      );
    }

    return (
      <div>
        <NavBar />
        <Container fluid className={containerCaptchaStatistics}>
          <BackButton
            handleBackClick={this.handleBackClick}
          />

          <SuccessFailureRatesDisplay
            titleSuccess="Success Rate"
            titleFailure="Failure Rate"
            numSuccess={dummySuccess}
            numFailure={dummyFailure}
          />

          <TrafficTimeseries
            title="Traffic Over Time"
            data={dummyTimeseriesData}
          />

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
      </div>
    );
  }
}

export default CaptchaStatistics;
