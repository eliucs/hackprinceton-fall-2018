import React from 'react';
import { Container } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import _ from 'lodash';
import moment from 'moment';

import NavBar from 'components/NavBar';
import BackButton from './BackButton';
import SuccessFailureRatesDisplay from './SuccessFailureRatesDisplay';
import TrafficTimeseries from './TrafficTimeseries';
import WorldwideTrafficData from './WorldwideTrafficData';
import IPAddressListings from './IPAddressListings';

import {
  containerCaptchaStatistics,
} from './styles.scss';

/**
 * Returns the mapping of country code to frequency.
 *
 * @param {Array} traffic
 */
const getMapCountryToFrequency = traffic => {
  const result = {};
  traffic.forEach(item => {
    result[item.countryCode] = (result[item.countryCode] || 0) + 1;
  });
  return result;
};

/**
 * Returns array with IP data.
 *
 * @param {Array} traffic
 */
const getIpData = traffic => (
  traffic.map(item => ({
    ...item,
    date: moment(item.date).format('MMMM DD, YYYY'),
  }))
);

/**
 * Returns an array of dates of the past 7 days.
 */
const getPastWeekDates = () => {
  const result = [];
  let currTime = moment();
  for (let i = 0; i < 7; i++) {
    result.push(currTime.format('MM-DD-YYYY'));
    currTime = currTime.subtract('1', 'day');
  }
  return result;
};

/**
 * Gets the time series data from the traffic log.
 *
 * @param {Object} traffic
 */
const getTimeSeriesData = traffic => {
  const labels = getPastWeekDates();
  const mapDatesToFreq = {};
  traffic.forEach(item => {
    const date = moment(item.date).format('MM-DD-YYYY');
    mapDatesToFreq[date] = (mapDatesToFreq[date] || 0) + 1;
  });
  const data = labels.map(date => (mapDatesToFreq[date] || 0));

  return {
    labels,
    datasets: [
      {
        label: 'Traffic',
        data,
        borderColor: '#29B6F6',
        backgroundColor: '#B3E5FC',
      },
    ],
  };
};

class CaptchaStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goBack: false,
      error: false,
      numSuccess: 0,
      numFailure: 0,
      mapCountryToFreq: {},
      ipData: [],
      timeSeriesData: {},
    };
  }

  componentDidMount() {
    // Make requests to get the data from Firebase
    const { captchaId } = this.props.match.params;
    fetch(`/captcha/${captchaId}`)
      .then(result => result.json())
      .then(result => {
        if (_.isEmpty(result)) {
          this.setState({ error: true });
        } else {
          const { numSuccess, numFailure, traffic } = result;

          this.setState({
            numSuccess,
            numFailure,
            mapCountryToFreq: getMapCountryToFrequency(traffic),
            ipData: getIpData(traffic),
            timeSeriesData: getTimeSeriesData(traffic),
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleBackClick = () => {
    this.setState({ goBack: true });
  };

  render() {
    if (this.state.goBack || this.state.error) {
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
            numSuccess={this.state.numSuccess}
            numFailure={this.state.numFailure}
          />

          <TrafficTimeseries
            title="Traffic Over Time"
            data={this.state.timeSeriesData}
          />

          {
            !_.isEmpty(this.state.mapCountryToFreq)
            && (
              <WorldwideTrafficData
                title="Worldwide Traffic Data"
                mapCountryToFreq={this.state.mapCountryToFreq}
              />
            )
          }

          <IPAddressListings
            title="Traffic by IP Address"
            data={this.state.ipData}
            maxDataLimit={100}
          />
        </Container>
      </div>
    );
  }
}

export default withRouter(CaptchaStatistics);
