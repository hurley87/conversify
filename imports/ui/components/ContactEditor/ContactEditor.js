/* eslint-disable max-len, no-return-assign */

import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import validate from '../../../modules/validate';

class ContactEditor extends React.Component {
  componentDidMount() {
    const component = this;
    validate(component.form, {
      rules: {
        championText: {
          required: true,
        },
        firstFollowUpText: {
          required: true,
        },
      },
      messages: {
        championText: {
          required: 'Need a championText in here, Seuss.',
        },
        firstFollowUpText: {
          required: 'This thneeds a firstFollowUpText, please.',
        },
      },
      submitHandler() { component.handleSubmit(component.form); },
    });
  }

  handleSubmit(form) {
    const { history } = this.props;
    const existingContact = this.props.doc && this.props.doc._id;
    const methodToCall = existingContact ? 'contacts.update' : 'contacts.insert';
    const doc = {
      championText: form.championText.value.trim(),
      firstFollowUpText: form.firstFollowUpText.value.trim(),
    };

    if (existingContact) doc._id = existingContact;

    Meteor.call(methodToCall, doc, (error, contactId) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        const confirmation = existingContact ? 'Contact updated!' : 'Contact added!';
        this.form.reset();
        Bert.alert(confirmation, 'success');
        history.push(`/prospects/${contactId}`);
      }
    });
  }

  render() {
    const { doc } = this.props;
    return (
      <form ref={form => (this.form = form)} onSubmit={event => event.preventDefault()}>
        <FormGroup >
          <ControlLabel>Connection Request</ControlLabel>
            <textarea style={{ minHeight: '100px' }}
            className="form-control"
            name="championText"
            defaultValue={doc && doc.championText}
          />
        </FormGroup>
            <FormGroup>
          <ControlLabel>First Followup</ControlLabel>
          <textarea style={{ minHeight: '100px' }}
            className="form-control"
            name="firstFollowUpText"
            defaultValue={doc && doc.firstFollowUpText}
          />
        </FormGroup>
        <Button type="submit" className="add-btn" style={{margin: "0px", lineHeight: "35px"}}>
          {doc && doc._id ? 'Update' : 'Add Contact'}
        </Button>
      </form>
    );
  }
}

ContactEditor.defaultProps = {
  doc: { championText: '', firstFollowUpText: '' },
};

ContactEditor.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default ContactEditor;
