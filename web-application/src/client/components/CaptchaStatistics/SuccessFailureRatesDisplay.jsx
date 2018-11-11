import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Container, Col, Row } from 'reactstrap';

import {
  card,
  cardSuccessFailureCounter,
  cardSuccessFailureRate,
  cardTitle,
  colorFailure,
  colorSuccess,
  subcomponent,
} from './styles.scss';

/**
 * Gets the percentage from the fraction num / den.
 *
 * @param {number} num
 * @param {number} den
 */
const getPercentage = (num, den) => `${(den > 0 ? Math.floor(num / den * 100) : 0)}%`;

/**
 * Renders the SuccessFailureRatesDisplay stateless functional component.
 *
 * @param {Object} props
 */
const SuccessFailureRatesDisplay = props => {
  const { numSuccess, numFailure } = props;
  const numTotal = numSuccess + numFailure;
  return (
    <Container fluid className={subcomponent}>
      <Row>
        <Col md="2" />
        <Col md="4">
          <div className={card}>
            <div className={cardTitle}>{props.titleSuccess}</div>
            <div className={classnames(cardSuccessFailureRate, colorSuccess)}>
              { getPercentage(numSuccess, numTotal) }
            </div>
            <div className={cardSuccessFailureCounter}>
              {`From ${numSuccess}/${numTotal} attempts`}
            </div>
          </div>
        </Col>
        <Col md="4">
          <div className={card}>
            <div className={cardTitle}>{props.titleFailure}</div>
            <div className={classnames(cardSuccessFailureRate, colorFailure)}>
              { getPercentage(numFailure, numTotal) }
            </div>
            <div className={cardSuccessFailureCounter}>
              {`From ${numFailure}/${numTotal} attempts`}
            </div>
          </div>
        </Col>
        <Col md="2" />
      </Row>
    </Container>
  );
};

SuccessFailureRatesDisplay.propTypes = {
  numSuccess: PropTypes.number,
  numFailure: PropTypes.number,
  titleSuccess: PropTypes.string,
  titleFailure: PropTypes.string,
};

export default SuccessFailureRatesDisplay;
