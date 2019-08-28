import React from 'react';
import autoBind from 'react-autobind';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';

class Login extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
      messages: {
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Need a password here.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    Meteor.loginWithPassword(form.emailAddress.value, form.password.value, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Welcome back!', 'success');
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <Row>
          <Col xs={12} sm={6} md={12} lg={12}>
            <div className='text-center'>
              <h1>Welcome Back</h1>
              <p>Sign in to your account</p>
              <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
                <FormGroup>
                  <input
                    type="email"
                    name="emailAddress"
                    className="form-control"
                    placeholder='Email'
                  />
                </FormGroup>
                <FormGroup>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder='Password'
                  />
                </FormGroup>
                <Button className='poll-btn' type="submit">Log In</Button>
                <AccountPageFooter>
                  <p>Don't have an account? <a href="https://meetings.hubspot.com/david1033">Get Started</a>.</p>
                </AccountPageFooter>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
