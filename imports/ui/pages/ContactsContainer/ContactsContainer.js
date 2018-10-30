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

const ContactsContainer = ({ loading, stats }) => ( !loading ? (
  stats.length > 0 ? 
  <div className="Leaderboards">
        <br />
        <br />
        <a href='/leaderboard'>Leaderboard</a>
        <br />
        <br />
        <a href='/responses'>Label Responses</a>
        <br />
        <br />
        <Table responsive>
          <thead>
            <tr>
              <th>Account</th>
              <th>Total</th>
              <th>Contacts Left</th>
              <th>1st</th>
              <th>2nd</th>
              <th>3rd</th>
              <th>Bad Data</th>
            </tr>
          </thead>
          <tbody>
          {
            stats.reverse().map((stat, i) =>{
              return (
                <tr>
                  <td>{ stat.name.length > 15 ? stat.name.slice(0,15) + "..." : stat.name }</td>
                  <td>{numberWithCommas(stat.contacts)}</td>
                   <td>{numberWithCommas(stat.scheduled)}</td>
                  <td>{numberWithCommas(stat.requests)}</td>
                  <td>{numberWithCommas(stat.seconds)}</td>
                  <td>{numberWithCommas(stat.thirds)}</td>
                  <td>{numberWithCommas(stat.bads)}</td>
                </tr>
              )
            })
          }
          </tbody>
        </Table>
  </div>:
  <div>
  	<Alert bsStyle="warning">No leaderboards can be delivered between the dates selected.</Alert>
  </div>
): <Loading />);


ContactsContainer.propTypes = {
  leaderboards: PropTypes.array,
};

export default createContainer((props) => {

	const subscription = Meteor.subscribe('contactsLeft');

	let leaderboards = LeaderboardsCollection.find({}).fetch();


  function get_stat(collection, str, result) {
    return collection.reduce(function (n, collection) { return n + (collection[str] == result)}, 0);
  }

	const accounts = leaderboards.groupBy('account_owner')
	const names = []
	for(var k in accounts) names.push(k)
	let stats = []

	names.map(name => {
		stats.push({
		  name: name,
		  contacts: accounts[name].length,
      scheduled: get_stat(accounts[name], "First Message Sent", false),
      requests: get_stat(accounts[name], "First Message Sent", true),
      seconds: get_stat(accounts[name], "Second Message Sent", true),
      thirds: get_stat(accounts[name], "Third Message Sent", true),
      bads: get_stat(accounts[name], "Bad LinkedIn Url", true),
		})
	})

	return {
	  loading: !subscription.ready(),
	  stats: stats,
	};
}, ContactsContainer);