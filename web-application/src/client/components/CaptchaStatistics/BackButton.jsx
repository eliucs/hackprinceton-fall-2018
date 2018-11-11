import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Col,
  Row,
} from 'reactstrap';

import { subcomponent } from './styles.scss';

/**
 * Renders the BackButton stateless functional component.
 *
 * @param {Object} props
 */
const BackButton = props => (
  <Container fluid className={subcomponent}>
    <Row>
      <Col md="2" />
      <Col md="8">
        <Button
          color="primary"
          onClick={props.handleBackClick}
        >
          Back
        </Button>
      </Col>
      <Col md="2" />
    </Row>
  </Container>
);

BackButton.propTypes = {
  handleBackClick: PropTypes.func,
};

export default BackButton;
