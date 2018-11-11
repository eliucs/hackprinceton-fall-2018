import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Col,
  Table,
  Row,
} from 'reactstrap';

import {
  card,
  cardTitle,
  containerIpAddresses,
  subcomponent,
} from './styles.scss';

/**
 * Renders the IPAddressListings stateless functional component.
 *
 * @param {Object} props
 */
const IPAddressListings = props => {
  let { data } = props;
  if (props.maxDataLimit && data.length > props.maxDataLimit) {
    data = data.slice(0, props.maxDataLimit);
  }

  return (
    <Container fluid className={subcomponent}>
      <Row>
        <Col md="2" />
        <Col md="8">
          <div className={card}>
            <div className={cardTitle}>{props.title}</div>
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
                    data.map((ipData, i) => (
                      <tr key={i}>
                        <td>{ipData.ip}</td>
                        <td>{ipData.date}</td>
                        <td>{ipData.countryName}</td>
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
};

IPAddressListings.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
  maxDataLimit: PropTypes.number,
};

export default IPAddressListings;
