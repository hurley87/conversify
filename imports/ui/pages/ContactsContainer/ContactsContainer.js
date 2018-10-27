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
        <Table responsive>
          <thead>
            <tr>
              <th>Account</th>
              <th>Contacts</th>
            </tr>
          </thead>
          <tbody>
          {
            stats.reverse().map((stat, i) =>{
              return (
                <tr>
                  <td>{stat.name}</td>
                  <td>{numberWithCommas(stat.num)}</td>
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

	let leaderboards = LeaderboardsCollection.find({
		'First Message Sent': false
	}).fetch();

	const accounts = leaderboards.groupBy('account_owner')


	const names = []
	for(var k in accounts) names.push(k)

	let stats = []

	names.map(name => {
		stats.push({
		  name: name,
		  num: accounts[name].length
		})
	})

	return {
	  loading: !subscription.ready(),
	  stats: stats,
	};
}, ContactsContainer);