import React from 'react';
import PropTypes from 'prop-types';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';


const Responses = ({ responses }) => (
  <div className="Responses">
    <div className="Responses-container">
    <table id="table">

        <tbody>
          <tr>
            <td id="test" width="100">Total Responses: {responses.firstReply}</td>
          </tr>
          <tr>
          <td id="trial" width = "100">Text: {responses.first_reply_text}</td>
          </tr>

        </tbody>

      </table>
    </div>
  </div>
);


export default Responses;
