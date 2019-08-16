import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Col, TabContainer, NavItem, TabContent, TabPane, Nav } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ContactsCollection from '../../../api/Contacts/Contacts';
import { timeago } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import Responses from "../Responses/Responses";
import _ from 'lodash';

import './Campaigns.scss';

const handleDelete = (contactId, history) => {
  if (confirm('Are you sure you want to permanently delete this prospect?')) {
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

const Campaigns = ({
  loading, myCampaigns, campaign_names,
}) => (!loading ? 

    myCampaigns.filter(response => (response.sentiment == '' && response.replied)).length > 0 ? (
        <Responses />
    ) : (

    <div className="Campaigns container">

    <div className="clearfix">
      <h1 className="pull-left">Campaigns</h1>
      <Link className="second-btn pull-right" to={`/campaigns/new`}>New Campaign</Link>
    </div>
    <br />
    {
      campaign_names.length == 0 ? (
        <div className='empty-state'>
          <h1>Getting started is easy</h1>
          <p>Create a template and upload a CSV of prospects to create a campaign</p>
          <br />
          <p><img height="280px" src="/2.png"/></p>
        </div>
      ) : null
    }


    <Row>
      <TabContainer id="left-tabs-example" defaultActiveKey={campaign_names[0]}>
        <Row>
          <Col sm={2} style={{paddingRight: "0px"}}>
            <Nav variant="pills" className="flex-column">
                {
                    campaign_names.map(name => {
                        return (
                            <NavItem eventKey={name}>
                                <p>{name}</p> 
                            </NavItem>
                        )
                    })
                }
            </Nav>
          </Col>
          <Col sm={10} style={{paddingLeft: "0px"}}>
            <TabContent>
              {
                  campaign_names.map(name => {
                      return (
                        <TabPane style={{padding: '10px', borderRadius: '3px'}} eventKey={name}>
                            <p className='msg'>{myCampaigns.filter(contact => contact.cohort == name).length} prospects were uploaded using the {myCampaigns.filter(contact => contact.cohort == name )[0].template} template {timeago(myCampaigns.filter(contact => contact.cohort == name )[0].createdAt)}</p>
                            <br />
                            <Row>
                                <Col sm={3}>
                                 Prospects ({myCampaigns.filter(contact => (contact.cohort == name && contact.requestSent == false)).length})
                                {
                                   myCampaigns.filter(contact => (contact.cohort == name && contact.requestSent == false)).length != 0 ?
                                    myCampaigns.filter(contact => (contact.cohort == name && contact.requestSent == false)).map(({
                                    _id, firstName, lastName, linkedinUrl, title, company,
                                    }) => (
                                        <div className="prospect-card" key={_id}>
                                            <h4><a target="_blank" href={linkedinUrl}><img height='15px' src="https://s3.amazonaws.com/adsgen/linkedin.svg"/></a> <a href={`/prospects/${_id}`}> {firstName} {lastName}</a> 
                                            <a className='pull-right' onClick={() => handleDelete(_id, history)}>
                                                <img height="15px" src="https://s3.amazonaws.com/adsgen/Delete.svg"/>
                                            </a>
                                            </h4>
                                        </div>
                                        )
                                    ) : <p className='msg'>A connection request has been sent to each prospect.</p>
                                }
                                </Col>
                                <Col sm={3}>
                                    Requests ({myCampaigns.filter(contact => (contact.cohort == name && contact.requestSent == true && contact.connection == false)).length})
                                    {
                                        myCampaigns.filter(contact => (contact.cohort == name && contact.requestSent == true && contact.connection == false)).map(({
                                            _id, firstName, lastName, linkedinUrl, title, company,
                                        }) => (
                                                <div className="prospect-card" key={_id}>
                                                    <h4><a target="_blank" href={linkedinUrl}><img height='15px' src="https://s3.amazonaws.com/adsgen/linkedin.svg"/></a> <a href={`/prospects/${_id}`}> {firstName} {lastName}</a> 
                                                    <a className='pull-right' onClick={() => handleDelete(_id, history)}>
                                                        <img height="15px" src="https://s3.amazonaws.com/adsgen/Delete.svg"/>
                                                    </a>
                                                    </h4>
                                                </div>
                                            )
                                        )
                                    }
                                </Col>
                                <Col sm={3}>
                                    Connections ({myCampaigns.filter(contact => (contact.cohort == name && contact.replied == false && contact.connection == true)).length})
                                    {
                                        myCampaigns.filter(contact => (contact.cohort == name && contact.replied == false && contact.connection == true)).map(({
                                            _id, firstName, lastName, linkedinUrl, threadUrl, firstFollowUpSent
                                        }) => (
                                                <div className={firstFollowUpSent ? "prospect-card blue-border" : "prospect-card"} key={_id}>
                                                    <h4><a target="_blank" href={linkedinUrl}><img height='15px' src="https://s3.amazonaws.com/adsgen/linkedin.svg"/></a> <a href={`/prospects/${_id}`}> {firstName} {lastName}</a> 
                                                        <a className='pull-right' target='_blank' href={threadUrl}>
                                                            <img height="15px" src="chat.svg"/>
                                                        </a>
                                                    </h4>
                                                </div>
                                            )
                                        )
                                    }
                                </Col>
                                <Col sm={3}>
                                    Conversations ({myCampaigns.filter(contact => (contact.cohort == name && contact.replied == true)).length})
                                    {
                                        myCampaigns.filter(contact => (contact.cohort == name && contact.replied == true)).map(({
                                            _id, firstName, lastName, linkedinUrl, threadUrl, firstFollowUpSent, sentiment,
                                        }) => (
                                                <div className={firstFollowUpSent ? sentiment == "positive" ? "prospect-card blue-border positive-border": sentiment == "neutral" ?  "prospect-card blue-border neutral-border" : "prospect-card blue-border negative-border" : sentiment == "positive" ? "prospect-card positive-border": sentiment == "neutral" ? "prospect-card neutral-border" : "prospect-card negative-border" } key={_id}>
                                                    <h4><a target="_blank" href={linkedinUrl}><img height='15px' src="https://s3.amazonaws.com/adsgen/linkedin.svg"/></a> <a href={`/prospects/${_id}`}> {firstName} {lastName}</a> 
                                                        <a className='pull-right' target='_blank' href={threadUrl}>
                                                            <img height="15px" src="chat.svg"/>
                                                        </a>
                                                    </h4>
                                                </div>
                                            )
                                        )
                                    }
                                </Col>
                            </Row>
                        </TabPane>
                      )
                  })
              }

            </TabContent>
          </Col>
        </Row>
      </TabContainer>
    </Row>
  </div>
) : <Loading />);

Campaigns.propTypes = {
  loading: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('contacts');

  let myCampaigns = ContactsCollection.find({
    userId: Meteor.userId(),
    owner: Meteor.user().emails[0].address,
  }).fetch();

  const campaigns = myCampaigns.groupBy("cohort")  
  const campaign_names = []
  for(var k in campaigns) campaign_names.push(k)

  myCampaigns = _.sortBy(myCampaigns, ['sentiment']).reverse()

  return {
    loading: !subscription.ready(),
    myCampaigns,
    campaign_names
  };
})(Campaigns);
