import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'reactstrap';
import { Line } from 'react-chartjs-2';

import {
  card,
  cardTitle,
  subcomponent,
} from './styles.scss';

const defaultOptions = {
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

/**
 * Renders the TrafficTimeseries stateless functional component.
 *
 * @param {Object} props
 */
const TrafficTimeseries = props => (
  <Container fluid className={subcomponent}>
    <Row>
      <Col md="2" />
      <Col md="8">
        <div className={card}>
          <div className={cardTitle}>{props.title}</div>
          <Line
            data={props.data}
            options={defaultOptions}
          />
        </div>
      </Col>
      <Col md="2" />
    </Row>
  </Container>
);

TrafficTimeseries.propTypes = {
  title: PropTypes.string,
  data: PropTypes.object,
};

export default TrafficTimeseries;
