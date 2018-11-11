import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Col,
  Row,
  Table,
} from 'reactstrap';

import {
  card,
  cardTitle,
  subcomponent,
} from './styles.scss';

/**
 * Renders the ExistingCaptchaListings stateless functional component.
 *
 * @param {Object} props
 */
const ExistingCaptchaListings = props => (
  <Container fluid className={subcomponent}>
    <Row>
      <Col md="2" />
      <Col md="8">
        <div className={card}>
          <div className={cardTitle}>{props.title}</div>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {
                props.data.map((captchaData, i) => (
                  <tr key={i}>
                    <td>{captchaData.id}</td>
                    <td>{captchaData.dateCreated}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
      </Col>
      <Col md="2" />
    </Row>
  </Container>
);

ExistingCaptchaListings.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

export default ExistingCaptchaListings;
