import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Alert, Grid, Row, Col, Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import LeaderboardsCollection from '../../../api/Leaderboards/Leaderboards';
import Loading from '../../components/Loading/Loading';
import Leaderboards from '../Leaderboards/Leaderboards';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import _ from 'lodash';

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const LeaderboardsContainer = ({ loading, leaderboards, stats, first_msgs, ncs, replies, prtime }) => ( !loading ? (
  leaderboards.length > 0 ? 
  <div className="Leaderboards">
    <Row>
      <Col sm={12} md={10}>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Account</th>
              <th>Requests</th>
              <th>Connections</th>
              <th>Replies</th>
              <th>PRs</th>
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
                  <td>{numberWithCommas(stat.new_CR)} ({(stat.new_CR / stat.num_crs_sent * 100).toFixed(2)}%)</td>
                  <td>{numberWithCommas(stat.replies)} ({(stat.replies / stat.num_crs_sent * 100).toFixed(2)}%)</td>
                  <td>{stat.positives} ({(stat.positives / stat.num_crs_sent * 100).toFixed(2)}%)</td>
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
        <h5>Requests</h5>
        <h3>{numberWithCommas(first_msgs)}</h3>
        <hr />
        <h5>Connections</h5>
        <h3>{numberWithCommas(ncs)}</h3>
        <hr />
        <h5>Connection Rate</h5>
        <h3>{(ncs/first_msgs*100).toFixed(2)}%</h3>
        <hr />
        <h5>Replies</h5>
        <h3>{numberWithCommas(replies)}</h3>
        <hr />
        <h5>Reply Rate</h5>
        <h3>{(replies/first_msgs*100).toFixed(2)}%</h3>
        <hr />
        <h5>PRs</h5>
        <h3>{prtime}</h3>
        <hr />
        <h5>PRs Rate</h5>
        <h3>{(prtime/first_msgs*100).toFixed(2)}%</h3>
        <hr />
      </Col>
    </Row>

  </div>:
  <div>
  	<Alert bsStyle="warning">No leaderboards can be delivered between the dates selected.</Alert>
  </div>
): <Loading />);


LeaderboardsContainer.propTypes = {
  leaderboards: PropTypes.array,
};

export default createContainer((props) => {

	console.log(props)

	const subscription = Meteor.subscribe('leaderboards.list', props.startDate, props.endDate);

	let leaderboards = LeaderboardsCollection.find().fetch();

	  console.log(leaderboards)

	  const first_msgs = leaderboards.reduce(function (n, first_msgs) {
	        return n + (first_msgs["First Message Sent"] == true);
	    }, 0);
	  const ncs = leaderboards.reduce(function (n, ncs) {
	        return n + (ncs["CR Accepted"] == true);
	    }, 0);
	  const replies = leaderboards.reduce(function (n, replies) {
	        return n + (replies["replied"] == true);
	    }, 0);
	  const accounts = leaderboards.groupBy('account_owner')
	  const names = []
	  for(var k in accounts) names.push(k)

    const prtime = leaderboards.reduce(function (n, replies) {
          return n + (replies["Third Message Reply Sentiment"] == 'positive');
      }, 0);
    console.log('HEYYYYY')
    console.log(prtime)

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
	      positives: get_stat(collection, "Third Message Reply Sentiment", 'positive'),
	      neutrals: get_stat(collection, "Third Message Reply Sentiment", 'neutral'),
	      negatives: get_stat(collection, "Third Message Reply Sentiment", 'negative'),
	      points: 2*get_stat(collection, "Third Message Reply Sentiment", 'positive') + get_stat(collection, "First Message Reply Sentiment", 'neutral') - get_stat(collection, "First Message Reply Sentiment", 'negative')
	    })
	  })


	  stats = _.sortBy(stats, ['positives'])

    console.log(stats)

	  return {
	    loading: !subscription.ready(),
	    leaderboards: leaderboards,
	    stats: stats,
	    first_msgs: first_msgs,
	    ncs: ncs,
	    replies: replies,
      prtime: prtime

	  };
}, LeaderboardsContainer);