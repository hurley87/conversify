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
      view: 'upload',
      variables: [],
      contacts: [],
      contact_index: 0,
      loading: false,
      cra: 'Hi {{First Name}}, I’m always looking to connect with and learn from experienced digital leaders in {{City}} if you’re open to expanding your network. Looking forward to seeing how I can help.',
      crb: "Hi {{First Name}}, I came across your profile after connecting with a friend from {{City}}. Let me know if you'd like to connect.",
      follow1: "Thanks for connecting, {{First Name}}.\n\nWould you be open to having that call(or meet in person) ? I'm interested in knowing more about {{Company}}. If I can help then that's a bonus(specifically within the digital / app space).\n\nA lot of good things come from these spontaneous conversations so let me know!",
      follow2: "Thanks for connecting, {{First Name}}.\n\nWould you be open to having that call(or meet in person) ? I'm interested in knowing more about {{Company}}. If I can help then that's a bonus(specifically within the digital / app space).\n\nA lot of good things come from these spontaneous conversations so let me know!",
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
    let contacts = [];
    const just_contacts = data.slice(1, data.length - 1);
    for (const index in just_contacts) {
      const contact = {};
      for (const idx in variables) contact[variables[idx]] = just_contacts[index][idx];
      contacts.push(contact);
    }
    contacts = contacts.slice(0, contacts.length - 1);
    this.setState({
      contacts,
      variables,
    });
  }

  craHandler(evt) {
    console.log(evt);
  }

  handleSubmit(form) {
    const { history } = this.props;

    const newContacts = this.state.contacts;

    for(let contact in newContacts){
      newContacts[contact]['First Message Text'] = this.parseCopy(form.cra.value, contact);
      newContacts[contact]['First Message Text Alternate'] = this.parseCopy(form.crb.value, contact);
      newContacts[contact]['Second Message Text'] = this.parseCopy(form.follow1.value, contact);
      newContacts[contact]['Third Message Text'] = this.parseCopy(form.follow2.value, contact);
    }

    this.setState({
      loading: true
    })

    const userEmail = Meteor.user().emails[0].address;


    Meteor.call('upload.contacts', newContacts, userEmail, (error, documentId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.form.reset();
        Bert.alert('Sequence Uploaded', 'success');
        history.push(`/results`);
      }
    });
  }

  handleNext() {
    this.setState({
      contact_index: this.state.contact_index + 1,
    });
  }

  handleCra(evt) {
    this.setState({
      cra: evt.target.value,
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
    if (copy.indexOf("{{") > 0 && copy.indexOf("}}") > 0) {
      const start_index = copy.indexOf("{{");
      const end_index = copy.indexOf("}}");
      const variable = copy.slice(start_index + 2, end_index);
      console.log(variable);

      return this.parseCopy(copy.replace(copy.slice(start_index, end_index + 2), this.state.contacts[contact_index][variable]), contact_index);
    }
    return copy;
  }

  render() {
    const { doc } = this.props;

    return (
      <div>
          {
              this.state.contacts.length > 0 && this.state.contacts.length <= 300 ? (

                <Row>
                  <button onClick={this.handleNext} className="btn btn-default">Next</button>
                  <br />
                  <br />
                  <Col xs={3}>
                    <p>You have uploaded {this.state.contacts.length} contacts.</p>
                    <div>
                      {
                        this.state.variables.map((variable) => (
                            <div><b>{variable}:</b> {this.state.contacts[this.state.contact_index][variable]}</div>
                          ))
                      }
                    </div>
                  </Col>
                  <Col xs={6}>
                <form ref={form => (this.form = form)} onSubmit={this.handleValidation}>          
                      <FormGroup>
                        <ControlLabel>Champion Connect Request</ControlLabel>
                        <textarea
                          style={{ minHeight: '100px' }}
                          type="text"
                          className="form-control"
                          name="cra"
                          defaultValue={this.state.cra}
                          onFocus={this.craHandler}
                          onChange={this.handleCra}
                        />
                      </FormGroup>
                      <FormGroup>
                        <ControlLabel>Challenger Connection Request</ControlLabel>
                        <textarea
                          style={{ minHeight: '100px' }}
                          className="form-control"
                          name="crb"
                          defaultValue={this.state.crb}
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
                        <ControlLabel>2nd Follow-up</ControlLabel>
                        <textarea
                          style={{ minHeight: '200px' }}
                          className="form-control"
                          name="follow2"
                          defaultValue={this.state.follow2}
                          onChange={this.handleFollow2}
                        />
                      </FormGroup>
                      <FormGroup>
                        {
                          this.state.loading ? (
                          <Button className="pull-right" style={{ marginRight: '0px' }} type="submit" bsStyle="success" disabled={true}>
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
                  <Col xs={3}>
                    <h5>Champion Connection Request</h5>
                    <div style={{ whiteSpace: 'pre-line' }}>{this.parseCopy(this.state.cra, this.state.contact_index)}</div>
                    <hr />
                    <h5>Challenger Connection Request</h5>
                    <div style={{ whiteSpace: 'pre-line' }}>{this.parseCopy(this.state.crb, this.state.contact_index)}</div>
                    <hr />
                    <h5>1st Follow-up</h5>
                    <div style={{ whiteSpace: 'pre-line' }}>{this.parseCopy(this.state.follow1, this.state.contact_index)}</div>
                    <hr />
                    <h5>2nd Follow-up</h5>
                    <div style={{ whiteSpace: 'pre-line' }}>{this.parseCopy(this.state.follow2, this.state.contact_index)}</div>
                  </Col>
                </Row>

              ) : (
                <Row>
                  <Col xs={12}>
                    <br />
                    <CSVReader
                      cssClass="react-csv-input"
                      label="Upload CSV of Contacts (max 300)"
                      onFileLoaded={this.handleForce}
                    />
                  <br />
                  {this.state.contacts.length > 300 ? (
                    <p style={{ color: "#e74c3c" }}><Wave
                      effect="stretch" effectChange={2.2} 
                     style={{ color: 'red' }} text={`That's ${this.state.contacts.length - 300} contacts too many`} /></p>
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

