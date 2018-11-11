import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Container,
  Col,
  Row,
} from 'reactstrap';

import {
  card,
  cardTitle,
  subcomponent,
} from './styles.scss';

// TODO: Should open a modal

const CreateCaptcha = props => (
  <Container fluid className={subcomponent}>
    <Row>
      <Col md="2" />
      <Col md="8">
        <div className={card}>
          <div className={cardTitle}>{props.title}</div>
          <Button color="primary" onClick={props.handleCreateNewCaptcha}>+ Create New</Button>
        </div>
      </Col>
      <Col md="2" />
    </Row>
  </Container>
);

CreateCaptcha.propTypes = {
  title: PropTypes.string,
  handleCreateNewCaptcha: PropTypes.func,
};

export default CreateCaptcha;
