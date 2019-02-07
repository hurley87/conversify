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
        history.push('/invitations');
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
          history.push('/invitations');
        }
    });
};

const renderContact = (doc, match, history) => (doc ? (
  <div className="ViewContact">
    <Row>
        <Col xs={12} sm={6}>
            <div className="page-header clearfix">
            <h4 className="pull-left">{doc.firstName} {doc.lastName} <small>{doc.title} at <a target="_blank" href={`http://${doc.website}`}>{doc.company}</a></small>
                <a target="_blank" href={doc.linkedinUrl}><div style={{ backgroundColor: "#0077B5", marginLeft: "5px" }} className='badge'><span className="fa fa-linkedin"></span></div></a>
            </h4>
            
            {
              !doc.replied ? (
                <ButtonToolbar className="pull-right">
                  <ButtonGroup bsSize="small">
                    <Button onClick={() => handleAdd(doc._id, history)} className="btn btn-success">Add</Button>
                    <Button onClick={() => history.push(`${match.url}/edit`)}>Edit</Button>
                    <Button onClick={() => handleRemove(doc._id, history)} className="text-danger">
                      Delete
                  </Button>
                  </ButtonGroup>
                </ButtonToolbar>
              ) : null

            }


            </div>

            {
              !doc.replied ? (
                <div>
                  <h5>Connect Request</h5>
                  <p>{doc.championText}</p>
                  <hr />
                  <h5>First Followup</h5>
                  <p>{doc.firstFollowUpText}</p>
                  <hr />
                  <h5>Second Followup</h5>
                  <p>{doc.secondFollowUpText}</p>
                  <hr />
                </div>

              ) : (
                <div>
                {
                  doc.messages.map((message) => {
                    return (
                      <p><b>{message.name}</b>: {message.text}</p>
                    )
                  })

                }
                <p><a target='_blank' href={doc['threadUrl']}>Respond to {doc['firstName']}</a></p>
                </div>

              )
            }
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
