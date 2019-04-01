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
import NewSequence from "../NewSequence/NewSequence";

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
  Meteor.call('contacts.skip', contactId, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      console.log('added');
    }
  });
};

const handleDelete = (contactId, history) => {
  if (confirm('Are you sure you want to permanently delete this prospect?')) {
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

const Contacts = ({
  loading, contacts, myContacts, limit, message, match, history,
}) => (!loading ? (
  <div className="Contacts">
    <Row>
      <Col xs={12}>
        { myContacts.length > 0 ?  <h5>Prospects ({myContacts.length})</h5> : null }
        { 
        myContacts.length > 0 ?
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Cohort</th>
                <th>Title</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {myContacts.map(({
                _id, firstName, lastName, linkedinUrl, cohort, email, title
              }) => (
                <tr key={_id}>
                  <td>
                  <a target="_blank" href={linkedinUrl}><div style={{ backgroundColor: "#0077B5" }} className='badge'><span className="fa fa-linkedin"></span></div></a> <a href={`/invitations/${_id}`}>{firstName} {lastName}</a>  
                  </td>
                  <td>{cohort}</td>
                  <td>{ title.length > 50 ? title.slice(0,50) + "..." : title }</td>
                  <td>{ email }</td>
                  <td>

               {     
                    // <Button
                    //   style={{ margin: '0', padding: '2px 10px' }}
                    //   onClick={() => handleRemove(_id)}
                    // >
                    //   -
                    // </Button>

                    }
                  </td>
                </tr>
              ))}
            </tbody>
              </Table> : 
              <NewSequence />
        
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

  const limit = 100;

  const myContacts = ContactsCollection.find({
    userId: Meteor.userId(),
    owner: Meteor.user().emails[0].address,
    requestSent: false,
  }).fetch();

  const message = limit - myContacts.length;

  console.log(myContacts)

  return {
    loading: !subscription.ready(),
    contact,
    myContacts,
    limit,
    message,
    contacts,
  };
})(Contacts);
