import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ApploisCollection from '../../../api/Applois/Applois';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import Card from "../Card/Card";
import _ from 'lodash';

import moment from 'moment'
import Votes from '../Votes/Votes'

const handleRemove = (email) => {
  Meteor.call('Applois.remove', email, (error) => {
    if (error) {
      console.log(error.reason, 'danger');
    } else {
      console.log('Pass', 'success');
    }
  });
};

const handleAdd = (email) => {
Meteor.call('Applois.add', email, (error) => {
    if (error) {
      console.log(error.reason, 'success');
    } else {
      console.log('Added', 'success');
    }
  });
};


const Applois = ({
  loading, Applois, first, firstMsg, names,firstReply,contacts_to_msg,msg_to_replies,num_contacts
}) => (!loading ?  (
  <div className="Applois">
    <br />
    <br />
    <br />
    {
      <Row>
        <h1>Apploi</h1>
        <Col md={4} mdOffset={4} smOffset={3} sm={6} xs={12}>
          <h3>Number of Contacts: {num_contacts}</h3>
          <h3>First Message Sent to: {firstMsg} Contacts.</h3>
          <h3>Contacts to whom First Message was Sent:{names.join(", ")}</h3>
          <h3>Number of First Replies: {firstReply}.</h3>
          <h3> Conversion Rates: </h3>
            <h3>Num Contacts vs First Msg Sent: {contacts_to_msg}</h3>
            <h3>First Msg Sent vs First Replies: {msg_to_replies}</h3>

        </Col>
      </Row>
    }
  </div>
) : <Loading />);

Applois.propTypes = {
  loading: PropTypes.bool.isRequired,
  Applois: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('applois');

  let Applois = ApploisCollection.find().fetch();
  const first = Applois[0]

  //Number of Contacts
  var num_contacts= Applois.length;
  //Number of Contacts First Msg was sent to
    var firstMsg = Applois.reduce(function (n, firstMsg) {
        return n + (firstMsg["First Message Sent"] == 'True');
    }, 0);
  //Names of Contacts to whom First Message was Sent
  let first_msg = _.filter(Applois, {"First Message Sent": "True" });
  let names = _.map(first_msg,"First Name");


  //Number of First Msg Replies
  var firstReply = Applois.reduce(function (n, firstReply) {
      return n + (firstReply["First Message Reply"] == 'True');
  }, 0);

  //First Reply Text
  let first_reply = _.filter(Applois, {"First Message Reply": "True" });
    //Grabbing the First Name, LinkedinUrl, First Reply first_reply_text
  let first_msg_sent_text = _.map(first_reply,"First Message Sent Text");
  let first_reply_names = _.map(first_reply,"First Name");
  let first_reply_linkedin = _.map(first_reply,"First Name", "First Message Reply Text", "Person Linkedin Url");
  let first_reply_text = _.map(first_reply, "First Message Reply Text");

  //Conversion Rates: Num Contacts vs First Msg Sent vs First Replies
  var contacts_to_msg = ((firstMsg/num_contacts)*100).toFixed(2);
  var msg_to_replies = ((firstReply/firstMsg)*100).toFixed(2);

  return {
    loading: !subscription.ready(),
    Applois: Applois,
    num_contacts:num_contacts,
    first: first,
    firstMsg: firstMsg,
    names: names,
    firstReply: firstReply,
    contacts_to_msg: contacts_to_msg,
    msg_to_replies: msg_to_replies
  };
})(Applois);
