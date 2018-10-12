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
import Stats from '../../components/Stats/Stats';
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
  loading, Applois, first, firstMsg, names,firstReply,contacts_to_msg,msg_to_replies,
  num_contacts, first_msg_sent_text,first_reply_names,first_reply_linkedin,
  first_reply_text, stats, link, new_CR, val
}) => (!loading ?  (
  <Stats stats={stats} />
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
  const name = "Apploi";
  //Number of Contacts
  const num_contacts= Applois.length;
  //Number of Contacts First Msg was sent to
  const firstMsg = Applois.reduce(function (n, firstMsg) {
      return n + (firstMsg["First Message Sent"] == true);
  }, 0);
  //Names of Contacts to whom First Message was Sent
  let first_msg = _.filter(Applois, {"First Message Sent":  true });
  let names = _.map(first_msg,"First Name");

  //Number of First Msg Replies
  const firstReply = Applois.reduce(function (n, firstReply) {
      return n + (firstReply["First Message Reply"] ==  true);
  }, 0);

  //Number of First Msg Replies
  const positives = Applois.reduce(function (n, firstReply) {
      return n + (firstReply["First Message Reply Sentiment"] ==  'positive');
  }, 0);

  //Number of First Msg Replies
  const neutrals = Applois.reduce(function (n, firstReply) {
      return n + (firstReply["First Message Reply Sentiment"] ==  'neutral');
  }, 0);

  //Number of First Msg Replies
  const negatives = Applois.reduce(function (n, firstReply) {
      return n + (firstReply["First Message Reply Sentiment"] ==  'negative');
  }, 0);



  //First Reply Text
  let first_reply = _.filter(Applois, {"First Message Reply": true });
  //Grabbing the First Name, LinkedinUrl, First Reply first_reply_text
  let first_msg_sent_text = _.map(first_reply,"First Message Text");
  let first_reply_names = _.map(first_reply,"First Name");
  let first_reply_linkedin = _.map(first_reply,"Person Linkedin Url");
  let first_reply_text = _.map(first_reply, "First Message Reply Text");

  //Conversion Rates: Num Contacts vs First Msg Sent vs First Replies
  const contacts_to_msg = (parseInt((firstMsg/num_contacts)*100).toFixed(2)||0);
  const test = ((firstReply/firstMsg)*100).toFixed(2);
  const msg_to_replies = (parseInt(test)||0);

  //New Connections
  const new_CR = Applois.reduce(function (n, new_CR) {
      return n + (new_CR["CR Accepted"] == true);
  }, 0);

  //New Connections Count
  const first_conn = Applois.reduce(function (n, first_conn) {
      return n + (first_conn["Connection"] == "1st");
  }, 0);
  var val = "Placeholder"
//new CRS == first_conn
  if(new_CR==first_conn)
  {
    val = "True";
  }
  else {
    val = "False"
  }
  const link = "/apploi_responses";

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
    name: name,
    link:link,
    positives: positives,
    neutrals: neutrals,
    negatives: negatives,
    new_CR:new_CR,
    first_conn:first_conn,
    val:val
  }


  return {
    loading: !subscription.ready(),
    Applois: Applois,
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
    first_reply_text: first_reply_text,
    stats: stats,
    link: link,
    positives: positives,
    neutrals: neutrals,
    negatives: negatives,
    new_CR:new_CR,
    val:val
  };
})(Applois);
