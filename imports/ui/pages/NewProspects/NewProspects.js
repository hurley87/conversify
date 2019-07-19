/* eslint-disable no-nested-ternary */
/* eslint-disable max-len, no-return-assign */
import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, Glyphicon } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';
import autoBind from 'react-autobind';
import CSVReader from 'react-csv-reader';
import { Row, Col } from 'react-bootstrap';
import { Wave, Random } from 'react-animated-text';
import TemplatesList from "../TemplatesList/TemplatesList"
import { Link } from 'react-router-dom';

class NewProspects extends React.Component {
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
      template: "",
      cra: 'Hi {{firstName}}, I’m working with Lufthansa Airlines to help automate requests going to their travel agent portal, eXperts. I’ve prepared a ‘coles notes’ explaining our process. Would you like to take a look and see if it’s useful?',
      crb: "Hi {{firstName}}, I came across your profile after connecting with a friend from {{City}}. Let me know if you'd like to connect.",
      follow1: "Thanks for connecting, {{firstName}}.\n\nDoes {{Company}} handle customer service requests in house or are they outsourced?",
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
      console.log(this.state.template)
      newContacts[contact]['championText'] = this.parseCopy(form.request.value, contact);
      newContacts[contact]['challengerText'] = this.parseCopy(form.request.value, contact);
      newContacts[contact]['firstFollowUpText'] = this.parseCopy(form.followup.value, contact);
      newContacts[contact]['cohort'] = this.state.cohort;
      newContacts[contact]['owner'] = Meteor.user().emails[0].address;
      newContacts[contact]['userId'] = Meteor.userId();
      newContacts[contact]['template'] = this.state.template.label;
    }

    console.log(newContacts)

    this.setState({
      loading: true,
    });

    Meteor.call('upload.contacts', newContacts, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        this.form.reset();
        Bert.alert('Prospects uploaded', 'success');
        history.push('/prospects');
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

  handleChange(template) {
    console.log(this.state.template)
    console.log(template)
    this.setState({ 
      template: template
    });
  }

  changeTemplate() {
      this.setState({
          template: ""
      })
  }

  changeCohort() {
    this.setState({
      upload: false
    })
  }

  render() {
    const { doc } = this.props;

    return (
      <div className='NewProspects container'>
        <div className="clearfix">
          <h1 className="pull-left">Add Prospects</h1>
        </div>
        {
          this.state.template == "" ? (
            <Row>
              <Col xs={12} sm={4}>
              <div className='box'>
                <h5>Template</h5>
                <TemplatesList  handleChange={this.handleChange} />
              </div>

              </Col>
              <Col xs={12} sm={4}>
                <div className='box'>
                  <h5>Audience</h5>
                  { this.state.cohort == "" ? null : <p>{this.state.cohort} <a onClick={this.changeCohort}><img className="edit" height="12px" src="https://s3.amazonaws.com/adsgen/Edit.svg"/></a></p> }
                  <p>{this.state.contacts.length} prospects uploaded</p>
                </div>
              </Col>
              <Col xs={12} sm={4}>
              <div className='box'>
                  <h5>Preview</h5>
                  <p>No prospects to preview</p>
                </div>
              </Col>
            </Row> 
          ) : !this.state.upload ? 
          <Row>

            <Col xs={12} sm={4}>
              <div className='box'>
                <h5>Template</h5>
                <p>{this.state.template.label} <a onClick={this.changeTemplate}><img className="edit" height="12px" src="https://s3.amazonaws.com/adsgen/Edit.svg"/></a></p>
              </div>
              </Col>
              <Col xs={12} sm={4}>
                <div className='box'>
                  <h5>Audience</h5>
                  <p><input
                      type='text'
                      className="form-control"
                      name="cohort"
                      defaultValue={this.state.cohort}
                      onChange={this.handleCohort}
                    />
                    <Button onClick={this.handleSubmitCohort} disabled={this.state.cohort.length < 4 } style={{ marginTop: "15px", marginLeft: '0px', lineHeight: "30px" }} className="add-btn" >
                      Continue
                    </Button>
                  </p>
                </div>
              </Col>
              <Col xs={12} sm={4}>
                <div className='box'>
                  <h5>Preview</h5>
                  <p>No prospects to preview</p>
                </div>
              </Col>
          </Row> 
        : this.state.contacts.length > 0 && this.state.contacts.length <= 1000 ? (
              <Row>
                <Col xs={12} sm={4}>
                  <div className='box'>
                    <h5>Template</h5>
                    <p>{this.state.template.label} <a onClick={this.changeTemplate}><img className="edit" height="12px" src="https://s3.amazonaws.com/adsgen/Edit.svg"/></a></p>
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className='box'>
                    <h5>Audience</h5>
                    <p>{this.state.cohort} <a onClick={this.changeCohort}><img className="edit" height="12px" src="https://s3.amazonaws.com/adsgen/Edit.svg"/></a></p>
                    <p>{this.state.contacts.length} prospects uploaded</p>
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className='box'>
                    <h5>Preview <small>({this.state.contact_index + 1} / {this.state.contacts.length}) <a  onClick={this.handleNext}>Next</a></small> </h5>
                    <div className='inner-card'>
                      <h6>Connection Request</h6>
                      <p style={{ whiteSpace: 'pre-line', paddingTop: '0px' }}>{this.parseCopy(this.state.template.request, this.state.contact_index)}</p>
                      <h6>1st Follow-up</h6>
                      <p style={{ whiteSpace: 'pre-line', paddingTop: '0px' }}>{this.parseCopy(this.state.template.followup, this.state.contact_index)}</p>
                    </div>

                    <div className='hidden'>
                      <h6>Challenger Connection Request</h6>
                      <p style={{ whiteSpace: 'pre-line', paddingTop: '0px' }}>{this.parseCopy(this.state.crb, this.state.contact_index)}</p>
                      <hr />
                    </div>

                    <form ref={form => (this.form = form)} onSubmit={this.handleValidation}>
                      <FormGroup className='hidden'>
                        <ControlLabel>Connection Request</ControlLabel>
                        <textarea
                          style={{ minHeight: '100px' }}
                          type="text"
                          className="form-control"
                          name="request"
                          defaultValue={this.state.template.request}
                          onChange={this.handleCra}
                        />
                      </FormGroup>
                      <FormGroup className='hidden'>
                      <ControlLabel>Challenger Connection Request</ControlLabel>
                      <textarea
                        style={{ minHeight: '100px' }}
                        className="form-control"
                        name="crb"
                        defaultValue={this.state.template.request}
                        onChange={this.handleCrb}
                      />
                      </FormGroup>
                      <FormGroup className='hidden'>
                        <ControlLabel>Follow-up</ControlLabel>
                        <textarea
                          style={{ minHeight: '200px' }}
                          className="form-control"
                          name="followup"
                          defaultValue={this.state.template.followup}
                          onChange={this.handleFollow1}
                        />
                      </FormGroup>
                      <FormGroup>
                        {
                          this.state.loading ? (
                            <p><Button type="submit" className="add-btn" style={{ marginLeft: '0px', lineHeight: "30px", marginTop: '0px' }} disabled>
                              Uploading <Glyphicon glyph="refresh" className="spinning" />
                            </Button></p>
                          ) : (
                            <p><Button type="submit" className="add-btn" style={{ marginLeft: '0px', lineHeight: "30px", marginTop: '0px' }}  >
                              Upload Prospects
                            </Button></p>
                          )
                        }

                      </FormGroup>
                    </form>
                  </div>
                </Col>
              </Row>
            ) : (
              <Row>

                <Col xs={12} sm={4}>
                  <div className='box'>
                    <h5>Template</h5>
                    <p>{this.state.template.label} <a onClick={this.changeTemplate}><img className="edit" height="12px" src="https://s3.amazonaws.com/adsgen/Edit.svg"/></a></p>
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className='box'>
                    <h5>Audience</h5>
                    <p>{this.state.cohort} <a onClick={this.changeCohort}><img className="edit" height="12px" src="https://s3.amazonaws.com/adsgen/Edit.svg"/></a></p>
                    <p style={{paddingTop: "0px"}}><CSVReader
                      cssClass="react-csv-input"
                      label="Upload Seamless.ai CSV (max 1000)"
                      onFileLoaded={this.handleForce}
                    /></p>
                    {this.state.contacts.length > 1000 ? (
                      <p style={{ color: '#e74c3c' }}><Wave
                        effect="stretch"
                        effectChange={2.2}
                        style={{ color: 'red' }}
                        text={`That's ${this.state.contacts.length - 1000} contacts too many`}
                      />
                      </p>
                  ) : null}
                  </div>
                </Col>
                <Col xs={12} sm={4}>
                  <div className='box'>
                    <h5>Preview</h5>
                    <p>No prospects to preview</p>
                  </div>
                </Col>
              </Row>
            )

            }
      </div>
    );
  }
}

NewProspects.defaultProps = {
  doc: { title: '', body: '' },
};

NewProspects.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default NewProspects;

