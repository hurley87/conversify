import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import LeaderboardsCollection from '../../../api/Leaderboards/Leaderboards';
import { timeago, monthDayYearAtTime } from '../../../modules/dates';
import Loading from '../../components/Loading/Loading';
import _ from 'lodash';
import moment from 'moment'

const handleRemove = (email) => {
  Meteor.call('Leaderboards.remove', email, (error) => {
    if (error) {
      console.log(error.reason, 'danger');
    } else {
      console.log('Pass', 'success');
    }
  });
};

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const handleAdd = (email) => {
Meteor.call('Leaderboards.add', email, (error) => {
    if (error) {
      console.log(error.reason, 'success');
    } else {
      console.log('Added', 'success');
    }
  });
};


Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}

const Leaderboards = ({
  Leaderboards, stats, first_msgs, ncs, replies
}) =>  (
  <div className="Leaderboards">
    <Row>
      <Col sm={12} md={10}>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Account</th>
              <th>CRs</th>
              <th>NCs</th>
              <th>New Connection Rate</th>
              <th>Replies</th>
              <th>Reply Rate</th>
              <th>Neutrals</th>
              <th>Negatives</th>
            </tr>
          </thead>
          <tbody>
          {
            stats.reverse().map((stat, i) =>{
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{stat.name}</td>
                  <td>{numberWithCommas(stat.num_crs_sent)}</td>
                  <td>{numberWithCommas(stat.new_CR)}</td>
                  <td>{(stat.new_CR / stat.num_crs_sent * 100).toFixed(2)}%</td>
                  <td>{numberWithCommas(stat.replies)}</td>
                  <td>{(stat.replies / stat.num_crs_sent * 100).toFixed(2)}%</td>
                  <td>{stat.neutrals}</td>
                  <td>{stat.negatives}</td>
                </tr>
              )
            })
          }
          </tbody>
        </Table>
      </Col>
      <Col sm={12} md={2}>
        <h5>CRs</h5>
        <h3>{numberWithCommas(first_msgs)}</h3>
        <hr />
        <h5>NCs</h5>
        <h3>{numberWithCommas(ncs)}</h3>
        <hr />
        <h5>Replies</h5>
        <h3>{numberWithCommas(replies)}</h3>
        <hr />
      </Col>
    </Row>

  </div>
 );

Leaderboards.propTypes = {
  loading: PropTypes.bool.isRequired,
  Leaderboards: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('leaderboards');
  let Leaderboards = LeaderboardsCollection.find().fetch();

  console.log(Leaderboards)

  const first_msgs = Leaderboards.reduce(function (n, first_msgs) {
        return n + (first_msgs["First Message Sent"] == true);
    }, 0);

  const ncs = Leaderboards.reduce(function (n, ncs) {
        return n + (ncs["CR Accepted"] == true);
    }, 0);
  const replies = Leaderboards.reduce(function (n, replies) {
        return n + (replies["replied"] == true);
    }, 0);
  const accounts = Leaderboards.groupBy('account_owner')
  const names = []
  for(var k in accounts) names.push(k)

  let stats = []

  function get_stat(collection, str, result) {
    return collection.reduce(function (n, collection) { return n + (collection[str] == result)}, 0);
  }

  names.map(name => {
    const collection = accounts[name]
    
    stats.push({
      name: name,
      num_contacts: collection.length,
      num_crs_sent: get_stat(collection, "First Message Sent", true),
      new_CR: get_stat(collection, "CR Accepted", true),
      replies: get_stat(collection, "replied", true),
      positives: get_stat(collection, "First Message Reply Sentiment", 'positive'),
      neutrals: get_stat(collection, "First Message Reply Sentiment", 'neutral'),
      negatives: get_stat(collection, "First Message Reply Sentiment", 'negative'),
      points: 2*get_stat(collection, "First Message Reply Sentiment", 'positive') + get_stat(collection, "First Message Reply Sentiment", 'neutral') - get_stat(collection, "First Message Reply Sentiment", 'negative')
    })
  })


  stats = _.sortBy(stats, ['replies'])

  return {
    loading: !subscription.ready(),
    Leaderboards: Leaderboards,
    stats: stats,
    first_msgs: first_msgs,
    ncs: ncs,
    replies: replies

  };
})(Leaderboards);
