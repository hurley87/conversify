import React from 'react';
import autoBind from 'react-autobind';
import { Row, Col, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import OAuthLoginButtons from '../../components/OAuthLoginButtons/OAuthLoginButtons';
import InputHint from '../../components/InputHint/InputHint';
import AccountPageFooter from '../../components/AccountPageFooter/AccountPageFooter';
import validate from '../../../modules/validate';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    const component = this;

    validate(component.form, {
      rules: {
        firstName: {
          required: true,
        },
        lastName: {
          required: true,
        },
        emailAddress: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 6,
        },
      },
      messages: {
        firstName: {
          required: 'What\'s your first name?',
        },
        lastName: {
          required: 'What\'s your last name?',
        },
        emailAddress: {
          required: 'Need an email address here.',
          email: 'Is this email address correct?',
        },
        password: {
          required: 'Need a password here.',
          minlength: 'Please use at least six characters.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;

    Accounts.createUser({
      email: form.emailAddress.value,
      password: form.password.value,
      profile: {
        name: {
          first: form.firstName.value,
          last: form.lastName.value,
        },
        linkedin: form.password.value,
      },
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Meteor.call('users.sendVerificationEmail');
        Bert.alert('Welcome!', 'success');
        history.push('/prospects');
      }
    });
  }

  render() {
    return (
      <div className="Signup">
        <Row>
          <Col xs={12} sm={6} md={12} lg={12}>
            <div className='text-center'>
              <h1>Create Your First Campaign Today</h1>
              <p>Sign Up Using Your LinkedIn Email and Password</p>
              <form ref={form => (this .form = form)} onSubmit={event => event.preventDefault()}>
                <Row>
                  <Col xs={6} style={{paddingRight: "5px"}}>
                    <FormGroup>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        placeholder='First Name'
                      />
                    </FormGroup>
                  </Col>
                  <Col xs={6} style={{paddingLeft: "5px"}}>
                    <FormGroup>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        placeholder='Last Name'
                      />
                    </FormGroup>
                  </Col>
                </Row>
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
                <Button type="submit" bsStyle="success">Sign Up</Button>
                <AccountPageFooter>
                  <p>Already have an account? <Link to="/login">Log In</Link>.</p>
                </AccountPageFooter>
              </form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Signup.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Signup;
