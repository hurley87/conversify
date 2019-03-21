/* eslint-disable no-nested-ternary */
/* eslint-disable max-len, no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import autoBind from 'react-autobind';
import CSVReader from 'react-csv-reader';
import { Row, Col } from 'react-bootstrap';
import { Wave, Random } from 'react-animated-text';

class NewSequence extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      variables: [],
      contacts: [],
      upload: false,
      contact_index: 0,
      loading: false,
      cohort: '',
      cra: 'Hi {{firstName}}, as you probably know the OSC will start to crack down on mortgage syndication in the spring when the new regulations are introduced. Just curious, do you handle the compliance work in-house or hire an outside firm?',
      crb: "Hi {{firstName}}, I came across your profile after connecting with a friend from {{City}}. Let me know if you'd like to connect.",
      follow1: "Thanks for connecting, {{firstName}}.\n\nTo help us at Fundscraper I put together a cheat sheet that's helped us identify the 9 major issues that we have to be concerned about as dealers.\n\nWould you like to take a look and see if we missed anything?",
      follow2: "Thanks for connecting, {{firstName}}.\n\nWould you be open to having that call(or meet in person)? I'm interested in knowing more about {{CompanyCleaned}}. If I can help then that's a bonus(specifically within the digital / app space).\n\nA lot of good things come from these spontaneous conversations so let me know!",
    };
  }

  handleValidation(evt) {
    evt.preventDefault();
    const component = this;
    validate(component.form, {
      rules: {
        cra: {
          required: true,
        },
        crb: {
          required: true,
        },
        follow1: {
          required: true,
        },
        follow2: {
          required: true,
        },
      },
      messages: {
        cra: {
          required: 'Need a cra2 in here, Seuss.',
        },
        crb: {
          required: 'This thneeds a body, please.',
        },
        follow1: {
          required: 'This thneeds a body, please.',
        },
        follow2: {
          required: 'This thneeds a body, please.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleForce(data) {
    const variables = data[0];
    variables.push('City');
    let contacts = [];
    const just_contacts = data.slice(1, data.length - 1);
    for (const index in just_contacts) {
      const contact = {};
      for (const idx in variables) {
        contact[variables[idx]] = just_contacts[index][idx];
      }
      contacts.push(contact);
    }
    contacts = contacts.slice(0, contacts.length - 1);

    this.setState({
      contacts,
      variables,
    });
  }

  handleSubmit(form) {
    const { history } = this.props;

    const newContacts = this.state.contacts;

    for (const contact in newContacts) {
      newContacts[contact]['championText'] = this.parseCopy(form.cra.value, contact);
      newContacts[contact]['challengerText'] = this.parseCopy(form.crb.value, contact);
      newContacts[contact]['firstFollowUpText'] = this.parseCopy(form.follow1.value, contact);
      newContacts[contact]['cohort'] = this.state.cohort;
    }

    this.setState({
      loading: true,
    });

    Meteor.call('upload.contacts', newContacts, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.form.reset();
        Bert.alert('Prospects uploaded', 'success');
        history.push('/invitations');
      }
    });
  }

  handleNext() {
    this.state.contact_index < this.state.contacts.length - 1 ? this.setState({ contact_index: this.state.contact_index + 1, }) : this.setState({ contact_index: 0, })
  }

  handleCra(evt) {
    this.setState({
      cra: evt.target.value,
    });
  }

  handleSubmitCohort(){
    this.setState({ upload: true })
  }

  handleCohort(evt) {
    this.setState({
      cohort: evt.target.value,
    });
  }

  handleCrb(evt) {
    this.setState({
      crb: evt.target.value,
    });
  }

  handleFollow1(evt) {
    this.setState({
      follow1: evt.target.value,
    });
  }

  handleFollow2(evt) {
    this.setState({
      follow2: evt.target.value,
    });
  }

  parseCopy(copy, contact_index) {
    if (copy.indexOf('{{') > 0 && copy.indexOf('}}') > 0) {
      const start_index = copy.indexOf('{{');
      const end_index = copy.indexOf('}}');
      const variable = copy.slice(start_index + 2, end_index);
      return this.parseCopy(copy.replace(copy.slice(start_index, end_index + 2), this.state.contacts[contact_index][variable]), contact_index);
    }
    return copy;
  }

  render() {
    const { doc } = this.props;

    return (
      <div>
        {
            !this.state.upload ? 
            <Row>
              <Col xs={12} sm={4}>
                <h5>Cohort Name</h5>
                <input
                  type='text'
                  className="form-control"
                  name="cohort"
                  defaultValue={this.state.cohort}
                  onChange={this.handleCohort}
                />
                <Button onClick={this.handleSubmitCohort} disabled={this.state.cohort.length < 4 } style={{ marginLeft: '0px' }} type="submit" bsStyle="success" >
                  Continue
                </Button>
              </Col>
            </Row> 
          : this.state.contacts.length > 0 && this.state.contacts.length <= 1000 ? (
              <Row>
                <Col xs={12}>
                  <h4>Invitation Sequence for {this.state.contacts[this.state.contact_index].firstName} <small>({this.state.contact_index + 1} / {this.state.contacts.length}) <button style={{ margin: '0' }} onClick={this.handleNext} className="btn btn-default">Next</button></small></h4>
                  <Row>
                    {
                      this.state.variables.map(variable => (['firstName', 'Title', 'CompanyCleaned'].includes(variable) ? (<Col xs={4}><h5>{variable}</h5> <p>{this.state.contacts[this.state.contact_index][variable]}</p></Col>) : null))
                    }
                  </Row>
                  <br />
                </Col>
                <Col className='well' sm={6} xs={12}>
                  <form ref={form => (this.form = form)} onSubmit={this.handleValidation}>
                    <FormGroup>
                      <ControlLabel>Connection Request</ControlLabel>
                      <textarea
                        style={{ minHeight: '100px' }}
                        type="text"
                        className="form-control"
                        name="cra"
                        defaultValue={this.state.cra}
                        onChange={this.handleCra}
                      />
                    </FormGroup>
                    <FormGroup className='hidden'>
                      <ControlLabel>Challenger Connection Request</ControlLabel>
                      <textarea
                        style={{ minHeight: '100px' }}
                        className="form-control"
                        name="crb"
                        defaultValue={this.state.cra}
                        onChange={this.handleCrb}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>1st Follow-up</ControlLabel>
                      <textarea
                        style={{ minHeight: '200px' }}
                        className="form-control"
                        name="follow1"
                        defaultValue={this.state.follow1}
                        onChange={this.handleFollow1}
                      />
                    </FormGroup>
                    <FormGroup>
                      {
                        this.state.loading ? (
                          <Button className="pull-right" style={{ marginRight: '0px' }} type="submit" bsStyle="success" disabled>
                            <Wave text="Your contacts are entering the matrix" />
                          </Button>
                        ) : (
                          <Button className="pull-right" style={{ marginRight: '0px' }} type="submit" bsStyle="success" >
                        Create Sequence
                          </Button>
                        )
                      }

                    </FormGroup>
                  </form>
                </Col>
                <Col sm={6} xs={12} style={{padding: '0px 40px'}}>
                  <h5>Connection Request</h5>
                  <div style={{ whiteSpace: 'pre-line' }}>{this.parseCopy(this.state.cra, this.state.contact_index)}</div>
                  <hr />
                  <div className='hidden'>
                  <h5>Challenger Connection Request</h5>
                  <div style={{ whiteSpace: 'pre-line' }}>{this.parseCopy(this.state.crb, this.state.contact_index)}</div>
                  <hr />
                </div>
                  <h5>1st Follow-up</h5>
                  <div style={{ whiteSpace: 'pre-line' }}>{this.parseCopy(this.state.follow1, this.state.contact_index)}</div>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col xs={12}>
                  <br />
                  <CSVReader
                    cssClass="react-csv-input"
                    label="Upload CSV of Contacts (max 1000)"
                    onFileLoaded={this.handleForce}
                  />
                  <br />
                  {this.state.contacts.length > 1000 ? (
                    <p style={{ color: '#e74c3c' }}><Wave
                      effect="stretch"
                      effectChange={2.2}
                      style={{ color: 'red' }}
                      text={`That's ${this.state.contacts.length - 1000} contacts too many`}
                    />
                    </p>
                ) : null}
                </Col>

              </Row>
            )

            }
      </div>
    );
  }
}

NewSequence.defaultProps = {
  doc: { title: '', body: '' },
};

NewSequence.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default NewSequence;

