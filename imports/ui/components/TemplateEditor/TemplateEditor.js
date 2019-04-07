/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
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
        history.push(`/templates/${templateId}`);
      }
    });
  }

  render() {
    const { doc } = this.props;
    return (
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <input
            type="text"
            className="form-control"
            name="title"
            defaultValue={doc && doc.title}
            placeholder="Oh, The Places You'll Go!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Connection Request</ControlLabel>
          <textarea
            className="form-control"
            name="request"
            defaultValue={doc && doc.request}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Follow Up</ControlLabel>
          <textarea
            className="form-control"
            name="followup"
            defaultValue={doc && doc.followup}
            placeholder="Congratulations! Today is your day. You're off to Great Places! You're off and away!"
          />
        </FormGroup>
        <Button style={{margin: '0px'}} type="submit" bsStyle="success">
          {doc && doc._id ? 'Save Changes' : 'Add Template'}
        </Button>
      </form>
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
