import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ContactsCollection from '../../../api/Contacts/Contacts';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';

// import './Contacts.scss';

const handleAdd = (contactId) => {
  Meteor.call('contacts.add', contactId, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      console.log('added');
    }
  });
};

const handleSkip = (contactId) => {
  Meteor.call('contacts.skip', contactId, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      console.log('added');
    }
  });
};

const handleRemove = (contactId) => {
  Meteor.call('contacts.remove', contactId, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      console.log('added');
    }
  });
};

const Contacts = ({
  loading, contact, myContacts, limit, message, match, history,
}) => (!loading ? (
  <div className="Contacts">
    <Row>
      <Col xs={12}>
        { 
        myContacts.length > limit ?
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Title</th>
                <th>Company</th>
                <th>City</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {myContacts.map(({
                _id, firstName, lastName, title, city, company, linkedinUrl,
              }) => (
                <tr key={_id}>
                  <td><a target="_blank" href={linkedinUrl}>{firstName} {lastName}</a></td>
                  <td>{title}</td>
                  <td>{company}</td>
                  <td>{city}</td>
                  <td>
                    <Button
                      bsStyle="success"
                      style={{ margin: '0', padding: '2px 10px' }}
                      onClick={() => handleSkip(_id)}
                    >
                      -
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
              </Table> : myContacts.length == 0 ? <div>Email dave for more leads: dhurls99@gmail.com <img height='20' src="https://s3.us-east-2.amazonaws.com/snapmortgages/shwing3.gif" /></div> : 
              <div>
                <Row>
                  <Col xs={12} sm={3}>
                    <h3><a target="_blank" href={contact.linkedinUrl}>{contact.firstName} {contact.lastName}</a></h3>
                    <p>{contact.title} at <a target="_blank" href={`http://${contact.website}`}>{contact.company}</a></p>
                    <p>{contact.city}</p>
                    <br />
                    <Button
                      bsStyle="success"
                      style={{ margin: '0', width: '100%', marginBottom: '10px' }}
                      onClick={() => handleAdd(contact._id)}
                    >
                      Add
                    </Button>
                    <Button
                      bsStyle="success"
                      style={{ margin: '0', width: '100%', border: "1px solid #5cb85c", color: "#5cb85c", backgroundColor: '#fff' }}
                      onClick={() => handleSkip(contact._id)}
                    >
                      Skip
                    </Button>
                    <br />
                    <br />
                    <p>{message + 1} left</p>
                  </Col>
                  <Col xs={12} smOffset={1} sm={8}>
                     <Row>
                       <Col xs={12}>
                        <h3>Sequence</h3>
                       </Col>
                      <Col xs={12} xs={6}>
                        <h5>Champion Template</h5>
                        <p>{contact.championText}</p>
                       </Col>
                      <Col xs={12} xs={6}>
                        <h5>Challenger Template</h5>
                        <p>{contact.challengerText}</p>
                      </Col>
                      <Col xs={12} xs={12}>
                        <hr />
                        <h5>First Followup</h5>
                        <p>{contact.firstFollowUpText}</p>
                      </Col>
                      <Col xs={12} xs={12}>
                        <hr />
                        <h5>Second Followup</h5>
                        <p>{contact.secondFollowUpText}</p>
                      </Col>
                     </Row>
                  </Col>
                </Row>
              </div>
        
        }
      </Col>
    </Row>
  </div>
) : <Loading />);

Contacts.propTypes = {
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('contacts');
  const contacts = ContactsCollection.find({
    owner: "",
  }).fetch()
  let contact = []
  if (contacts.length > 0) contact = contacts[0];
  console.log(contact)

  const limit = 50;

  const myContacts = ContactsCollection.find({
    userId: Meteor.userId(),
    owner: Meteor.user().emails[0].address,
  }).fetch();

  const message = limit - myContacts.length;

  return {
    loading: !subscription.ready(),
    contact,
    myContacts,
    limit,
    message,
  };
})(Contacts);
