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
  loading, contacts, myContacts, match, history,
}) => (!loading ? (
  <div className="Contacts">
    <div className="page-header clearfix">
      <h4 className="pull-left">Prospects</h4>
    </div>
    <Row>
      <Col xs={6}>
        {contacts.length ?
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
              {contacts.map(({
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
                      onClick={() => handleAdd(_id)}
                    >
                      Add
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> : <Alert bsStyle="warning">No prospects yet!</Alert>}
      </Col>
      <Col xs={6}>
        {myContacts.length ?
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
                      onClick={() => handleRemove(_id)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> : <Alert bsStyle="warning">Add prospects!</Alert>}
      </Col>
    </Row>
  </div>
) : <Loading />);

Contacts.propTypes = {
  loading: PropTypes.bool.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('contacts');
  const contacts = ContactsCollection.find({
    owner: ''
  }).fetch();
  const myContacts = ContactsCollection.find({
    userId: Meteor.userId(),
  }).fetch();
  return {
    loading: !subscription.ready(),
    contacts,
    myContacts,
  };
})(Contacts);
