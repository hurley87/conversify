import React from 'react';
import PropTypes from 'prop-types';
import { ButtonToolbar, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Bert } from 'meteor/themeteorchef:bert';
import Contacts from '../../../api/Contacts/Contacts';
import NotFound from '../NotFound/NotFound';
import Loading from '../../components/Loading/Loading';
import ContactEditor from '../../components/ContactEditor/ContactEditor';

const handleRemove = (contactId, history) => {
  if (confirm('Are you sure? This is permanent!')) {
    Meteor.call('contacts.remove', contactId, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Contact deleted!', 'danger');
        history.push('/prospects');
      }
    });
  }
};

const handleAdd = (contactId, history) => {
    Meteor.call('contacts.add', contactId, (error) => {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            Bert.alert('Contact added!', 'success');
          history.push('/prospects');
        }
    });
};

const renderContact = (doc, match, history) => (doc ? (
  <div className="EditContact container">
    <Row>
        <Col xs={12} sm={8} smOffset={2}>
          <div className="template-card">
            <h4><a target="_blank" href={`/prospects/${doc._id}`}>{doc.firstName} {doc.lastName}</a> <a target="_blank" href={doc.linkedinUrl}><img height='15px' src="https://s3.amazonaws.com/adsgen/linkedin.svg"/></a>
            {
              !doc.replied ? (
                <span onClick={() => handleRemove(doc._id)} className='delete'><img height="15px" src="https://s3.amazonaws.com/adsgen/Delete.svg"/></span>
              ) : null
            }
             </h4>
             <Row>
               <Col sm={12} style={{padding: "15px 30px"}}>
                <ContactEditor doc={doc} history={history} />
               </Col>
             </Row>
              
            </div>
        </Col>
    </Row>
  </div>
) : <NotFound />);

const EditContact = ({
  loading, doc, match, history,
}) => (
  !loading ? renderContact(doc, match, history) : <Loading />
);

EditContact.defaultProps = {
  doc: null,
};

EditContact.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const contactId = match.params._id;
  const subscription = Meteor.subscribe('contacts.view', contactId);

  return {
    loading: !subscription.ready(),
    doc: Contacts.findOne(contactId),
  };
})(EditContact);
