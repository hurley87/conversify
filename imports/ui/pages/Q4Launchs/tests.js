import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Q4LaunchsCollection from '../../../api/Q4Launchs/Q4Launchs';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import Stats from '../../components/Stats/Stats';
import Card from "../Card/Card";
import _ from 'lodash';

import moment from 'moment'
import Votes from '../Votes/Votes'

const handleRemove = (email) => {
  Meteor.call('Q4Launchs.remove', email, (error) => {
    if (error) {
      console.log(error.reason, 'danger');
    } else {
      console.log('Pass', 'success');
    }
  });
};

const handleAdd = (email) => {
Meteor.call('Q4Launchs.add', email, (error) => {
    if (error) {
      console.log(error.reason, 'success');
    } else {
      console.log('Added', 'success');
    }
  });
};


const Q4Launchs = ({
  loading, Q4Launchs, first, firstMsg, names,firstReply,contacts_to_msg,msg_to_replies,
  num_contacts, first_msg_sent_text,first_reply_names,first_reply_linkedin,
  first_reply_text, stats
}) => (!loading ?  (
  <div className="Q4Launchs">
    <br />
    <br />
    {
      <div>
          <Stats stats={stats} />
      </div>
    }
  </div>
) : <Loading />);

Q4Launchs.propTypes = {
  loading: PropTypes.bool.isRequired,
  Q4Launchs: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('q4launchs');

  let Q4Launchs = Q4LaunchsCollection.find().fetch();
  const first = Q4Launchs[0]
  var name = "Q4Launch";
  //Number of Contacts
  var num_contacts= Q4Launchs.length;
  //Number of Contacts First Msg was sent to
    var firstMsg = Q4Launchs.reduce(function (n, firstMsg) {
        return n + (firstMsg["First Message Sent"] == 'True');
    }, 0);
  //Names of Contacts to whom First Message was Sent
  let first_msg = _.filter(Q4Launchs, {"First Message Sent": "True" });
  let names = _.map(first_msg,"First Name");


  //Number of First Msg Replies
  var firstReply = Q4Launchs.reduce(function (n, firstReply) {
      return n + (firstReply["First Message Reply"] == 'True');
  }, 0);

  //First Reply Text
  let first_reply = _.filter(Q4Launchs, {"First Message Reply": "True" });
    //Grabbing the First Name, LinkedinUrl, First Reply first_reply_text
  let first_msg_sent_text = _.map(first_reply,"First Message Text");
  let first_reply_names = _.map(first_reply,"First Name");
  let first_reply_linkedin = _.map(first_reply, "Person Linkedin Url");
  let first_reply_text = _.map(first_reply, "First Message Reply Text");

  //Conversion Rates: Num Contacts vs First Msg Sent vs First Replies
  var contacts_to_msg = ((firstMsg/num_contacts)*100).toFixed(2);
  var msg_to_replies = ((firstReply/firstMsg)*100).toFixed(2);

  const stats = {
    num_contacts:num_contacts,
    firstMsg: firstMsg,
    names: names,
    firstReply: firstReply,
    contacts_to_msg: contacts_to_msg,
    msg_to_replies: msg_to_replies,
    first_msg_sent_text: first_msg_sent_text,
    first_reply_names: first_reply_names,
    first_reply_linkedin: first_reply_linkedin,
    first_reply_text: first_reply_text,
    name: name
  }

  return {
    loading: !subscription.ready(),
    Q4Launchs: Q4Launchs,
    num_contacts:num_contacts,
    first: first,
    firstMsg: firstMsg,
    names: names,
    firstReply: firstReply,
    contacts_to_msg: contacts_to_msg,
    msg_to_replies: msg_to_replies
  };
})(Q4Launchs);
