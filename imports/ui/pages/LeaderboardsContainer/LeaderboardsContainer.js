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

const LeaderboardsContainer = ({ loading, leaderboards, stats, first_msgs, ncs, replies, prtime, owner_stats }) => ( !loading ? (
  leaderboards.length > 0 ? 
  <div className="Leaderboards">
    <Row>
      <Col sm={12}>
        <Table responsive>
          <thead>
            <tr>
              <th>Account</th>
              <th>Requests</th>
              <th>Connections</th>
              <th>Replies</th>
              <th>PRs</th>
            </tr>
          </thead>
          <tbody>
          {
            stats.reverse().map((stat, i) =>{
              return (
                <tr>
                  <td>{stat.name}</td>
                  <td>
                  {numberWithCommas(stat.num_crs_sent)}
                  </td>
                  <td>
                  { numberWithCommas(stat.new_CR) } 
                  { 
                    stat.num_crs_sent == 0 || stat.new_CR == 0 ? null : ( 
                      <small>({(stat.new_CR / stat.num_crs_sent * 100).toFixed(1)}%)</small>  
                    )
                  } 
                  </td>
                  <td>
                  {numberWithCommas(stat.replies)} 
                  {
                    stat.replies == 0 || stat.num_crs_sent == 0 ? null : (
                      <small>({(stat.replies / stat.num_crs_sent * 100).toFixed(1)}%)</small>
                    )
                  }
                  </td>
                  <td>
                  {numberWithCommas(stat.positives)} 
                  {
                    stat.positives == 0 || stat.num_crs_sent == 0 ? null : (
                      <small>({(stat.positives / stat.num_crs_sent * 100).toFixed(1)}%)</small>
                    )
                  }
                  </td>
                </tr>
              )
            })
          }
          </tbody>
        </Table>
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

	const subscription = Meteor.subscribe('leaderboards.list', props.startDate, props.endDate);

	let leaderboards = LeaderboardsCollection.find().fetch();


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

	  let stats = []

	  function get_stat(collection, str, result) {
	    return collection.reduce(function (n, collection) { return n + (collection[str] == result)}, 0);
	  }

	  names.map(name => {
	    const collection = accounts[name]
      let account = 'na'
      switch(name){
        case "haris@growthgenius.com":
          account = 'Suthen';
          break;
        case "jj@growthgenius.com":
          account = 'Suthen';
          break;
        case "berlin@growthgenius.com":
          account = 'Suthen';
          break;
        case "ashley@smartboxdentalmarketing.com":
          account = 'Andrew';
          break;
        case 'qing@clearbanc.com':
          account = 'Nizar';
          break;
        case "11sa82@queensu.ca":
          account = 'Dave'
          break;
        case "jeremeholiman@gmail.com":
          account = 'Suthen'
          break;
        case "sassnorth":
          account = 'Suthen'
          break;
        case "reitano":
          account = 'Suthen'
          break;
        case "riipen":
          account = 'Suthen'
          break;
        case "noticed":
          account = 'Suthen'
          break;
        case "fundscott":
          account = 'Andrew'
          break;
        case "lng":
          account = 'Andrew'
          break;
        case "papaya":
          account = 'Andrew'
          break;
        case "papaya":
          account = 'Andrew'
          break;
        case "shelf":
          account = 'Andrew'
          break;
        case "icm_hub":
          account = 'Dave'
          break;
      }
	    stats.push({
	      name: name,
	      num_crs_sent: get_stat(collection, "First Message Sent", true),
	      new_CR: get_stat(collection, "CR Accepted", true),
	      replies: get_stat(collection, "replied", true),
	      positives: get_stat(collection, "Third Message Reply Sentiment", 'positive'),
	      neutrals: get_stat(collection, "Third Message Reply Sentiment", 'neutral'),
	      negatives: get_stat(collection, "Third Message Reply Sentiment", 'negative'),
	      points: 2*get_stat(collection, "Third Message Reply Sentiment", 'positive') + get_stat(collection, "First Message Reply Sentiment", 'neutral') - get_stat(collection, "First Message Reply Sentiment", 'negative')
	    })
	  })

    stats.push({
      name: "GrowthGenius",
      num_crs_sent: first_msgs,
      new_CR: ncs,
      replies: replies,
      positives: prtime
    })

	  stats = _.sortBy(stats, ['positives'])

    let leads = stats.groupBy('account')

    const owners = []
    for(var k in leads) owners.push(k)


    function get_owner_stat(collection, str) {
      return collection.reduce(function (n, collection) { return n + collection[str] }, 0);
    }

    let owner_stats = []

    owners.map(owner => {
      const owner_collection = leads[owner]
      owner_stats.push({
        owner: owner,
        num_contacts: owner_collection.length,
        num_crs_sent: get_owner_stat(owner_collection, "num_crs_sent"),
        new_CR: get_owner_stat(owner_collection, "new_CR"),
        replies: get_owner_stat(owner_collection, "replies"),
        positives: get_owner_stat(owner_collection, "positives"),
        neutrals: get_owner_stat(owner_collection, "neutrals"),
        negatives: get_owner_stat(owner_collection, "negatives"),
      })
    })

    owner_stats = _.sortBy(owner_stats, ['positives'])

	  return {
	    loading: !subscription.ready(),
	    leaderboards: leaderboards,
	    stats: stats,
	    first_msgs: first_msgs,
	    ncs: ncs,
	    replies: replies,
      prtime: prtime,
      owner_stats: owner_stats

	  };
}, LeaderboardsContainer);