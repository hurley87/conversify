import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';


const Stats = ({ stats }) => (
    <tr>
      <td>{stats.name}</td>
      <td>{stats.num_contacts}</td>
      <td>{stats.firstMsg}</td>
      <td>{stats.new_CR}</td>
      <td>{stats.first_conn}</td>
      <td>{stats.val}</td>
      <td>{stats.firstReply}</td>
      <td>{stats.positives}</td>
      <td>{stats.neutrals}</td>
      <td>{stats.negatives}</td>
      <td><a href={stats.link}>Link</a></td>
    </tr>
);


export default Stats;
