import React from 'react';
import { Container } from 'reactstrap';
import uuid from 'uuid';

import NavBar from 'components/NavBar';
import CreateCaptcha from './CreateCaptcha';
import ExistingCaptchaListings from './ExistingCaptchaListings';

import {
  containerDashboard,
} from './styles.scss';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // Make request to server for the data:
    fetch('/captcha-listing')
      .then(result => result.json())
      .then(data => {
        this.setState({ data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleCreateNewCaptcha = () => {
    console.log('create new captcha');
  };

  render() {
    return (
      <div>
        <NavBar />
        <Container fluid className={containerDashboard}>
          <CreateCaptcha
            title="Create new audioCAPTCHA"
            handleCreateNewCaptcha={this.handleCreateNewCaptcha}
          />

          <ExistingCaptchaListings
            title="My Existing audioCAPTCHA"
            data={this.state.data}
          />
        </Container>
      </div>
    );
  }
}

export default Dashboard;
