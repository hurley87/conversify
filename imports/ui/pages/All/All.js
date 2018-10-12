import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Loading from '../../components/Loading/Loading';
import Applois from "../Applois/Applois";
import Nextopias from "../Nextopias/Nextopias";
import Q4Launchs from "../Q4Launchs/Q4Launchs";
import Reitanos from "../Reitanos/Reitanos";



const All = ({
  loading
}) => (!loading ?  (
  <div className="All">
    <br />
    <Table responsive>
      <thead>
        <tr>
          <th>Account</th>
          <th>Contacts</th>
          <th>CRs Sent</th>
          <th>New CRs</th>
          <th>1st Connections</th>
          <th>Correct 1st Conn</th>
          <th>Replies</th>
          <th>Positve</th>
          <th>Neutral</th>
          <th>Negative</th>
          <th>Responses</th>
        </tr>
      </thead>
      <tbody>
        <Applois />
        <Nextopias />
        <Q4Launchs />
        <Reitanos />
      </tbody>
    </Table>
  </div>
) : <Loading />);


export default withTracker(() => {

  return {
    loading: ""
  };
})(All);
