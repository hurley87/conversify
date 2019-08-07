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
        history.push('/campaigns');
      }
    });
  }
};

const updateSentiment = (linkedInUrl, sentiment) => {
  Meteor.call('updateSentiment', linkedInUrl, sentiment, (error) => {
    if (error) {
      console.log(error.reason, 'success');
    } else {
      console.log('Added', 'success');
    }
  });
};

const renderContact = (doc, match, history) => (doc ? (
  <div className="ViewContact container">
    <Row>
        <Col xs={12} sm={8} smOffset={2}>
            <div className="template-card">
            <h4>{doc.firstName} {doc.lastName} <a target="_blank" href={doc.linkedinUrl}><img height='15px' src="https://s3.amazonaws.com/adsgen/linkedin.svg"/></a>
            <small> {doc.title} at {doc.company}</small>

            {
              !doc.connection ? (
                <span>
                  <a href={`/campaigns/${doc._id}/edit`}><img style={{top: "5px"}} className="edit" height="12px" src="https://s3.amazonaws.com/adsgen/Edit.svg"/></a>  
                  <span onClick={() => handleRemove(doc._id, history)} className='delete'><img height="15px" src="https://s3.amazonaws.com/adsgen/Delete.svg"/></span>
                </span>
              ) : <a target="_blank" href={doc.threadUrl} className='pull-right'>Respond</a>
            }
            
            </h4>

            {
              !doc.connection ? (
                <div className='inner-card'>
                  <h5>Connect Request</h5>
                  <p>{doc.championText}</p>
                  <h5>First Followup</h5>
                  <p>{doc.firstFollowUpText}</p>
                </div>

              ) : (
                <div className='inner-card'>
                {
                  doc.messages.map((message) => {
                    return (
                      <p><b>{message.name}</b>: {message.text}</p>
                    )
                  })

                }
                </div>

              )
            }
            <hr />
            {
              doc.replied ? (
                <div className='inner-card'>
                  {
                    doc.sentiment == "positive" ? (
                      <p>Positive <Button className='pull-right' onClick={() => updateSentiment(doc.linkedInUsername, 'neutral')}>make negative</Button></p>
                    ) : (
                      <p>Negative <Button className='pull-right' onClick={() => updateSentiment(doc.linkedInUsername, 'positive')}>make positive</Button></p>
                    )  
                    
                  }
                  
                </div>
              ) : null
            }
          </div>
        </Col>
        
    </Row>
  </div>
) : <NotFound />);

const ViewContact = ({
  loading, doc, match, history,
}) => (
  !loading ? renderContact(doc, match, history) : <Loading />
);

ViewContact.defaultProps = {
  doc: null,
};

ViewContact.propTypes = {
  loading: PropTypes.bool.isRequired,
  doc: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(({ match }) => {
  const contactId = match.params._id;
  console.log(contactId)
  const subscription = Meteor.subscribe('contacts.view', contactId);
  const doc = Contacts.findOne(contactId);
  console.log(doc)
  return {
    loading: !subscription.ready(),
    doc,
  };
})(ViewContact);
