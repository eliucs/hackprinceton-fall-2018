import React from 'react';
import { Container } from 'reactstrap';
import uuid from 'uuid';

import CreateCaptcha from './CreateCaptcha';
import ExistingCaptchaListings from './ExistingCaptchaListings';

const dummyCaptchaData = [
  {
    id: uuid(),
    dateCreated: '01-01-2018',
  },
  {
    id: uuid(),
    dateCreated: '01-02-2018',
  },
  {
    id: uuid(),
    dateCreated: '01-03-2018',
  },
  {
    id: uuid(),
    dateCreated: '01-04-2018',
  },
  {
    id: uuid(),
    dateCreated: '01-05-2018',
  },
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleCreateNewCaptcha = () => {
    console.log('create new captcha');
  };

  render() {
    return (
      <Container fluid>
        <CreateCaptcha
          title="Create new audioCAPTCHA"
          handleCreateNewCaptcha={this.handleCreateNewCaptcha}
        />

        <ExistingCaptchaListings
          title="My Existing audioCAPTCHA"
          data={dummyCaptchaData}
        />
      </Container>
    );
  }
}

export default Dashboard;
