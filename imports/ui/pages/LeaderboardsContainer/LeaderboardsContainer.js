import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Alert, Grid, Row, Col, Table } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ContactsCollection from '../../../api/Contacts/Contacts';
import Loading from '../../components/Loading/Loading';
import tooltip from 'chartist-plugin-tooltip';
import ChartistGraph from 'react-chartist';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import _ from 'lodash';

import './Leaderboards.scss';
import { STATUS_CODES } from 'http';

const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const enumerateDaysBetweenDates = function (startDate, endDate) {
  const dates = [];

  const currDate = moment(startDate).startOf('day');
  const lastDate = moment(endDate).startOf('day');

  while (currDate.add(1, 'days').diff(lastDate) < 0) {
    dates.push(currDate.format("MMM D"));
  }

  return dates;
};

const LeaderboardsContainer = ({ loading, leaderboards, stats, first_msgs, ncs, replies, prtime, owner_stats, labels, series, }) => ( !loading ? (
  leaderboards.length > 0 ? 
  <div className="Leaderboards">

    <Row>
      <Col xs={12}>
        <h3>First Cohort</h3>
      </Col>
      <hr />
      <Col xs={12} sm={10}>
        <Row>
          <Col xs={12} sm={12}>
            <h5>Connections</h5>
            <ChartistGraph className='ct-chart-line' data={{
              labels,
              series,
            }} options={{
              low: 0,
              showArea: false,
              showLine: true,
              showPoint: true,
              axisX: {
                labelInterpolationFnc: function (value, index) {
                  return value;
                }
              },
              plugins: [
                tooltip()
              ]
            }} type={'Line'} />
          </Col>
        </Row>
        
        <Table responsive>
          <thead>
            <tr>
              <th>Account</th>
              <th>Requests</th>
              <th>Connections</th>
              <th>Replies</th>
              <th>Invites</th>
            </tr>
          </thead>
          <tbody>
          {
            stats.reverse().map((stat, i) =>{
              return (
                <tr>
                  <td>{stat.name}
                    <img height='20' style={{ display: (stat.positives >= 1 ? 'inline' : 'none') }} src="https://s3.us-east-2.amazonaws.com/snapmortgages/cool.gif" />
                    <img height='20' style={{ display: (stat.positives >= 2 ? 'inline' : 'none') }} src="https://s3.us-east-2.amazonaws.com/snapmortgages/fireball.gif" />
                    <img height='20' style={{ display: (stat.positives >= 3 ? 'inline' : 'none') }} src="https://s3.us-east-2.amazonaws.com/snapmortgages/charmander_dancing.gif" />
                    <img height='20' style={{ display: (stat.positives >= 4 ? 'inline' : 'none') }} src="https://s3.us-east-2.amazonaws.com/snapmortgages/shwing3.gif" />
                    <img height='20' style={{ display: (stat.positives >= 5 ? 'inline' : 'none') }} src="https://s3.us-east-2.amazonaws.com/snapmortgages/giphy.gif" />
                    <img height='20' style={{ display: (stat.positives >= 6 ? 'inline' : 'none') }} src="https://s3.us-east-2.amazonaws.com/snapmortgages/a-parrot-3.gif" />  
                  </td>
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
        <Col xs={12} sm={2}>
          <h5>Requests</h5>
          <p>{first_msgs}</p>
          <hr />
          <h5>Connections</h5>
          <p>{ncs}</p>
          <hr />
          <h5>Replies</h5>
          <p>{replies}</p>
          <hr />
          <h5>Invites</h5>
          <p>{prtime}</p>
          
        </Col>
    </Row>
  </div>:
  <div>
  	<Alert bsStyle="warning">No data exists between the dates selected.</Alert>
  </div>
): <Loading />);


LeaderboardsContainer.propTypes = {
  leaderboards: PropTypes.array,
};

export default createContainer((props) => {

  const subscription = Meteor.subscribe('contacts.list', props.startDate, props.endDate);

  const labels = enumerateDaysBetweenDates(props.startDate, props.endDate)

  console.log(labels)

  let leaderboards = ContactsCollection.find().fetch();

	  const first_msgs = leaderboards.reduce(function (n, first_msgs) {
	        return n + (first_msgs["requestSent"] == true);
	    }, 0);
	  const ncs = leaderboards.reduce(function (n, ncs) {
	        return n + (ncs["connection"] == true);
	    }, 0);
	  const replies = leaderboards.reduce(function (n, replies) {
	        return n + (replies["replied"] == true);
	    }, 0);
	  const accounts = leaderboards.groupBy('owner')
	  const names = []
	  for(var k in accounts) names.push(k)

    const prtime = leaderboards.reduce(function (n, replies) {
          return n + (replies["sentiment"] == 'positive');
      }, 0);

	  let stats = []

	  function get_stat(collection, str, result) {
	    return collection.reduce(function (n, collection) { return n + (collection[str] == result)}, 0);
	  }

	  names.map(name => {
	    const collection = accounts[name]
      let account = 'na'
	    stats.push({
	      name: name,
	      num_crs_sent: get_stat(collection, "requestSent", true),
	      new_CR: get_stat(collection, "connection", true),
	      replies: get_stat(collection, "replied", true),
	      positives: get_stat(collection, "sentiment", 'positive'),
	      neutrals: get_stat(collection, "sentiment", 'neutral'),
	      negatives: get_stat(collection, "sentiment", 'negative'),
	    })
    })

    let series = []

    names.map(name => {
      console.log(name)
      const collection = accounts[name];
      const connections = collection.filter(contact => contact.connection)
      connections.map(connection => {
        connection['day'] = moment(connection.connectionDate).format("MMM D")
      })
      // console.log(name)
      const groupByDay = connections.groupBy('day')
      const dateByDates = [];
      for(let label in labels) {
        const dateLabel = labels[label];
        if(dateLabel in groupByDay) {
          console.log('contains')
          console.log(dateLabel)
          dateByDates.push({
            meta: name,
            value: groupByDay[dateLabel].length
          })
        } else {
          if (typeof dateLabel === 'string' || dateLabel instanceof String) {
            console.log('does not contain')
            console.log(dateLabel)
            dateByDates.push({
              meta: name,
              value: 0
            })
          }
        }
      }
      console.log('labels')
      console.log(labels)
      series.push(dateByDates);
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
      owner_stats: owner_stats,
      labels,
      series,
	  };
}, LeaderboardsContainer);



