/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class TemplateEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        title: {
          required: true,
        },
        request: {
          required: true,
        },
        followup: {
          required: true,
        },
      },
      messages: {
        title: {
          required: 'Need a title in here, Seuss.',
        },
        request: {
          required: 'What is the connection request?',
        },
        followup: {
          required: 'What is the follow up message?',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;
    const existingTemplate = this.props.doc && this.props.doc._id;
    const methodToCall = existingTemplate ? 'templates.update' : 'templates.insert';
    const doc = {
      title: form.title.value.trim(),
      request: form.request.value.trim(),
      followup: form.followup.value.trim(),
    };

    if (existingTemplate) doc._id = existingTemplate;

    Meteor.call(methodToCall, doc, (error, templateId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingTemplate ? 'Template updated!' : 'Template added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/templates`);
      }
    });
  }

  render() {
    const { doc } = this.props;
    return (
      <Row>
        <Col sm={6}>
          <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <input
                type="text"
                className="form-control"
                name="title"
                defaultValue={doc && doc.title}
                placeholder="Startup Founders"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Connection Request</ControlLabel>
              <textarea
                className="form-control"
                name="request"
                defaultValue={doc && doc.request}
                style={{height: "100px"}}security
                placeholder="Hi {{firstName}}, I came across {{Company}} and thought you would interested in a case study I've prepared on your industry. Would you like to take a look?"
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Follow Up</ControlLabel>
              <textarea
                className="form-control"
                name="followup"
                defaultValue={doc && doc.followup}
                style={{height: "100px"}}
                placeholder="Thanks for connecting, {{firstName}}. As {{Title}}, I think you would be interested in an app we are developing. Any chance you can take a look and give me some feedback?"
              />
            </FormGroup>
            <Button style={{margin: '0px'}} type="submit" bsStyle="success">
              {doc && doc._id ? 'Save Changes' : 'Add Template'}
            </Button>
          </form>
        </Col>
        <Col sm={5} smOffset={1}>
          <h5>Variables</h5>
          <Row>
            <Col sm={4}>
              <p>{`{{firstName}}`}</p>
            </Col>
            <Col sm={4}>
              <p>{`{{Company}}`}</p>
            </Col>
            <Col sm={4}>
              <p>{`{{Title}}`}</p>
            </Col>
            <Col sm={4}>
              <p>{`{{City}}`}</p>
            </Col>
            <Col sm={4}>
              <p>{`{{Website}}`}</p>
            </Col>
            <Col sm={12}>
            <p><img height='250px' src="/add-guy.png"/></p> 
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

TemplateEditor.defaultProps = {
  doc: { title: '', body: '' },
};

TemplateEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default TemplateEditor;
