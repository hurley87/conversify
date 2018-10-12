import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import NextopiasCollection from '../../../api/Nextopias/Nextopias';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import Card from "../Card/Card";
import _ from 'lodash';

import moment from 'moment'
import Votes from '../Votes/Votes'

const handleRemove = (email) => {
  Meteor.call('Nextopias.remove', email, (error) => {
    if (error) {
      console.log(error.reason, 'danger');
    } else {
      console.log('Pass', 'success');
    }
  });
};

const handleAdd = (email) => {
Meteor.call('Nextopias.add', email, (error) => {
    if (error) {
      console.log(error.reason, 'success');
    } else {
      console.log('Added', 'success');
    }
  });
};


const Nextopias = ({
  loading, Nextopias, first, firstMsg, names,firstReply,contacts_to_msg,msg_to_replies,
  num_contacts, first_msg_sent_text,first_reply_names,first_reply_linkedin,
  first_reply_text
}) => (!loading ?  (
  <div className="Nextopias">
    <br />
    <br />
    <br />
    {
      <Row>
        <h1>Nextopia</h1>
        <Col md={4} mdOffset={4} smOffset={3} sm={6} xs={12}>
          <h3>Number of Contacts: {num_contacts}</h3>
          <h3>First Message Sent to: {firstMsg} Contacts.</h3>
          <h3>Contacts to whom First Message was Sent:{names.join(", ")}</h3>
          <h3>Number of First Replies: {firstReply}.</h3>
          <p>Contacts who replied: {first_reply_names.join(", ")}</p>
          <p>Linkedin Urls: {first_reply_linkedin.join(", ")} </p>
          <p>Message Sent to Contact: {first_msg_sent_text.join(", ")} </p>
          <p>Replies: {first_reply_text.join(", ")}</p>
          <h3> Conversion Rates: </h3>
            <h3>Num Contacts vs First Msg Sent: {contacts_to_msg}</h3>
            <h3>First Msg Sent vs First Replies: {msg_to_replies}</h3>

        </Col>
      </Row>
    }
  </div>
) : <Loading />);

Nextopias.propTypes = {
  loading: PropTypes.bool.isRequired,
  Nextopias: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('nextopias');

  let Nextopias = NextopiasCollection.find().fetch();
  const first = Nextopias[0]

  //Number of Contacts
  var num_contacts= Nextopias.length;
  //Number of Contacts First Msg was sent to
    var firstMsg = Nextopias.reduce(function (n, firstMsg) {
        return n + (firstMsg["First Message Sent"] == 'True');
    }, 0);
  //Names of Contacts to whom First Message was Sent
  let first_msg = _.filter(Nextopias, {"First Message Sent": "True" });
  let names = _.map(first_msg,"First Name");


  //Number of First Msg Replies
  var firstReply = Nextopias.reduce(function (n, firstReply) {
      return n + (firstReply["First Message Reply"] == 'True');
  }, 0);

  //First Reply Text
  let first_reply = _.filter(Nextopias, {"First Message Reply": "True" });
    //Grabbing the First Name, LinkedinUrl, First Reply first_reply_text
  let first_msg_sent_text = _.map(first_reply,"First Message Text");
  let first_reply_names = _.map(first_reply,"First Name");
  let first_reply_linkedin = _.map(first_reply,"Person Linkedin Url");
  let first_reply_text = _.map(first_reply, "First Message Reply Text");

  //Conversion Rates: Num Contacts vs First Msg Sent vs First Replies
  var contacts_to_msg = ((firstMsg/num_contacts)*100).toFixed(2);
  var msg_to_replies = ((firstReply/firstMsg)*100).toFixed(2);

  return {
    loading: !subscription.ready(),
    Nextopias: Nextopias,
    num_contacts:num_contacts,
    first: first,
    firstMsg: firstMsg,
    names: names,
    firstReply: firstReply,
    contacts_to_msg: contacts_to_msg,
    msg_to_replies: msg_to_replies,
    first_msg_sent_text: first_msg_sent_text,
    first_reply_names: first_reply_names,
    first_reply_linkedin: first_reply_linkedin,
    first_reply_text: first_reply_text
  };
})(Nextopias);
