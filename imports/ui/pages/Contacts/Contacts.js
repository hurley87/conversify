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
        history.push('/prospects');
      }
    });
  }
};

const Contacts = ({
  loading, contacts, myContacts, limit, message, match, history,
}) => (!loading ? (
  <div className="Contacts">
    <Row>
      <Col xs={12} sm={9}>
          <h5>Available ({contacts.length})</h5>
          <p>Add prospects to your invitation list</p>
        { 
        contacts.length > 0 ?
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th />
                <th>Title</th>
                <th>Company</th>
                <th>City</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contacts.map(({
                _id, firstName, lastName, title, city, company, linkedinUrl, website
              }) => (
                <tr key={_id}>
                  <td><a href={`/prospects/${_id}`}>{firstName} {lastName}</a></td>
                  <td>
                    <a target="_blank" href={linkedinUrl}><div style={{ backgroundColor: "#0077B5" }} className='badge'><span className="fa fa-linkedin"></span></div></a>
                  </td>
                  <td>{title.length > 30 ? title.slice(0,30) + "..." : title }</td>
                    <td><a target="_blank" href={`http://${website}`}>{company.split(" ").length > 1 ? company.split(" ")[0] + " " + company.split(" ")[1] : company}</a></td>
                  <td>{city}</td>

                  <td>
                    <Button
                      bsStyle="success"
                      style={{ margin: '0', padding: '2px 10px', display: "inline", float: 'left' }}
                      onClick={() => handleAdd(_id)}
                    >
                      +
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
              </Table> : 
              <Alert bsStyle="warning">Email dhurls99@gmail.com for more prospects</Alert>
        
        }
      </Col>
      <Col xs={12} sm={3}>
          {myContacts.length > 100 ? <Alert bsStyle="warning">You should only send 100 connection requests at a time.</Alert> : null }
        <h5>Invitation List ({myContacts.length})</h5>
        <p>Connection requests will be sent to these prospects tomorrow morning.</p>
        { 
        myContacts.length > 0 ?
          <Table responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {myContacts.map(({
                _id, firstName, lastName, title, city, company, linkedinUrl,
              }) => (
                <tr key={_id}>
                    <td><a href={`/prospects/${_id}`}>{firstName} {lastName}</a>  
                    </td>
                  <td>
                    <Button
                      style={{ margin: '0', padding: '2px 10px' }}
                      onClick={() => handleRemove(_id)}
                    >
                      -
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
              </Table> : 
              <Alert bsStyle="warning">Add prospects to your invitation list</Alert>
        
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
  }).fetch();

  const message = limit - myContacts.length;

  return {
    loading: !subscription.ready(),
    contact,
    myContacts,
    limit,
    message,
    contacts,
  };
})(Contacts);
