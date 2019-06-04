import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col, TabContainer, NavItem, TabContent, TabPane, NavLink, Nav } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ContactsCollection from '../../../api/Contacts/Contacts';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import NewProspects from "../NewProspects/NewProspects";
import NewSequence from '../NewSequence/NewSequence';

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
  loading, contacts, myContacts, limit, message, requestSent, match, history,
}) => (!loading ? (
  <div className="Contacts container">
    <div className="clearfix">
      <h1 className="pull-left">Prospects ({myContacts.length})</h1>
      <Link className="second-btn pull-right" to={`${match.url}/new`}>Add Prospects</Link>
    </div>
    <Row>
      <TabContainer id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <NavItem eventKey="first">
                <p><img height='20px' src="Upcoming.svg"/> {myContacts.filter(contact => contact.requestSent == false).length} upcoming</p> 
              </NavItem>
              <NavItem eventKey="second">
                <p><img height='20px' src="Sent.svg"/> {myContacts.filter(contact => contact.requestSent == true).length} sent</p> 
              </NavItem>
              <NavItem eventKey="third">
               <p><img height='20px' src="followup.svg"/> {myContacts.filter(contact => contact.firstFollowUpSent == true).length} follow-ups</p>            
              </NavItem>
              <NavItem eventKey="fourth">
                <p><img height='20px' src="Finished.svg"/> {myContacts.filter(contact => contact.sequenceOver == true).length} finished </p> 
              </NavItem>
            </Nav>
          </Col>
          <Col sm={10}>
            <TabContent>
              <TabPane eventKey="first">
                { 
                  myContacts.filter(contact => contact.requestSent == false).length > 0 ?
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Title</th>
                          <th>Company</th>
                          <th>Cohort</th>
                          <th>Template</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {myContacts.filter(contact => contact.requestSent == false).map(({
                          _id, firstName, lastName, linkedinUrl, cohort, email, title, template, company,
                        }) => (
                          <tr key={_id}>
                            <td>
                            <a target="_blank" href={linkedinUrl}><img height='15px' src="linkedin.svg"/></a> <a href={`/prospects/${_id}`}>{firstName} {lastName}</a>  
                            </td>
                            
                            <td>{ title }</td>
                            <td>{company}</td>
                            <td>{cohort}</td>
                            <td>{template}</td>
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
                        <div className='empty-state'>
                          <h1>You have no prospects uploaded</h1>
                          <p>Upload a Seamless.ai CSV to start.</p>
                          <br />
                          <p><img height="280px" src="No-Prospects.png"/></p>
                        </div>
                  }
              </TabPane>
              <TabPane eventKey="second">
              { 
                myContacts.filter(contact => contact.requestSent == true).length > 0 ?
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Cohort</th>
                        <th>Template</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {myContacts.filter(contact => contact.requestSent == true).map(({
                        _id, firstName, lastName, linkedinUrl, cohort, email, title, template, company,
                      }) => (
                        <tr key={_id}>
                          <td>
                          <a target="_blank" href={linkedinUrl}><img height='15px' src="linkedin.svg"/></a> <a href={`/prospects/${_id}`}>{firstName} {lastName}</a>  
                          </td>
                          
                          <td>{ title }</td>
                          <td>{company}</td>
                          <td>{cohort}</td>
                          <td>{template}</td>
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
                      null
                }
              </TabPane>
              <TabPane eventKey="third">
              { 
                myContacts.filter(contact => contact.firstFollowUpSent == true).length > 0 ?
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Cohort</th>
                        <th>Template</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {myContacts.filter(contact => contact.firstFollowUpSent == true).map(({
                        _id, firstName, lastName, linkedinUrl, cohort, email, title, template, company,
                      }) => (
                        <tr key={_id}>
                          <td>
                          <a target="_blank" href={linkedinUrl}><img height='15px' src="linkedin.svg"/></a> <a href={`/prospects/${_id}`}>{firstName} {lastName}</a>  
                          </td>
                          
                          <td>{ title }</td>
                          <td>{company}</td>
                          <td>{cohort}</td>
                          <td>{template}</td>
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
                      null
                }
              </TabPane>
              <TabPane eventKey="fourth">
              { 
                myContacts.length > 0 ?
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Title</th>
                        <th>Company</th>
                        <th>Cohort</th>
                        <th>Template</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {myContacts.filter(contact => contact.sequenceOver == true).map(({
                        _id, firstName, lastName, linkedinUrl, cohort, email, title, template, company,
                      }) => (
                        <tr key={_id}>
                          <td>
                          <a target="_blank" href={linkedinUrl}><img height='15px' src="linkedin.svg"/></a> <a href={`/prospects/${_id}`}>{firstName} {lastName}</a>  
                          </td>
                          
                          <td>{ title }</td>
                          <td>{company}</td>
                          <td>{cohort}</td>
                          <td>{template}</td>
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
                      null
                }
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </TabContainer>
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

  const approaching = myContacts.filter(contact => contact.requestSent == false)
  console.log(approaching.length)

  const requestSent = myContacts.filter(contact => (contact.requestSent == true))
  console.log(requestSent.length)

  const firstFollowUpSent = myContacts.filter(contact => contact.firstFollowUpSent == true)
  console.log(firstFollowUpSent.length)

  const sequenceOver = myContacts.filter(contact => contact.sequenceOver == true)
  console.log(sequenceOver.length)

  return {
    loading: !subscription.ready(),
    contact,
    myContacts,
    limit,
    message,
    requestSent
  };
})(Contacts);
