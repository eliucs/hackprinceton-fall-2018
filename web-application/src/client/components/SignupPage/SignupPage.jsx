import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import {
  btnSignup,
  card,
  cardTitle,
  childMainPage,
  invalid,
  parentMainPage,
  linkLogin,
} from './styles.scss';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  onFieldChange = (type, e) => {
    const text = e.target.value;
    if (type === 'email') {
      const email = text.trim();
      this.setState({ email });
    } else {
      this.setState({ password: text });
    }
  };

  handleSignup = () => {
    this.setState({ error: '' });
    // Make request to server to handle signup
    console.log(this.state.email, this.state.password);
  };

  render() {
    return (
      <div className={parentMainPage}>
        <div className={childMainPage}>
          <Container fluid>
            <Row>
              <Col md="2" />
              <Col md="8">
                <div className={card}>
                  <div className={cardTitle}>Sign up for audioCAPTCHA</div>
                  { this.state.error
                    && <div className={invalid}>Invalid email or password.</div> }
                  <Form>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="johnsmith@example.com"
                        onChange={e => this.onFieldChange('email', e)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="password">Password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        onChange={e => this.onFieldChange('password', e)}
                      />
                    </FormGroup>
                  </Form>
                  <Button
                    color="primary"
                    onClick={this.handleSignup}
                    className={btnSignup}
                  >
                    Sign Up
                  </Button>
                  <div>
                    <Link className={linkLogin} to="/login">Login to your account.</Link>
                  </div>
                </div>
              </Col>
              <Col md="2" />
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {};

export default SignupPage;
