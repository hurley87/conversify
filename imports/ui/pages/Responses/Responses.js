/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ContactsCollection from '../../../api/Contacts/Contacts';
import Loading from '../../components/Loading/Loading';
import { notDeepEqual } from 'assert';

const updateSentiment = (linkedInUrl, sentiment) => {
  Meteor.call('updateSentiment', linkedInUrl, sentiment, (error) => {
    if (error) {
      console.log(error.reason, 'success');
    } else {
      console.log('Added', 'success');
    }
  });
};

const displayResponses = (responses, sentiment, upSentiment, downSentiment) => 
   (
    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Cohort</th>
          <th>Messages</th>
          <th>Response</th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {responses.filter((response) => response.sentiment == sentiment).map(({
          _id, firstName, lastName, messages, cohort, responseText, threadUrl, linkedInUsername
        }) => (
            <tr key={_id}>
              <td><a href={`/invitations/${_id}`}>{firstName} {lastName}</a></td>
              <td>
                {cohort}
              </td>
              <td>
                {messages.length}
              </td>
              <td>
                {responseText.slice(0, 70)}
              </td>
              <td>
                <i style={{ fontSize: "15px", color: "#4285f4", cursor: 'pointer' }} onClick={() => updateSentiment(linkedInUsername, upSentiment)} class="fa fa-chevron-circle-up"></i>
              </td>
              <td>
                <i style={{ fontSize: "15px", color: "#4285f4", cursor: 'pointer' }} onClick={() => updateSentiment(linkedInUsername, downSentiment)} class="fa fa-chevron-circle-down"></i>
              </td>
              <td>
                <a target='_blank' href={threadUrl}>
                  <i class="fa fa-comments"></i>
                </a>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
  
  // responses.filter((response) => response.sentiment == sentiment).map((response) => {
  //     return (
  //       <div>
  //         <h5><a href={`/invitations/${response._id}`}>{response["firstName"] + " " + response["lastName"]}</a> <Button style={{margin: '0', marginLeft: "5px", padding: '0', fontSize: "17px"}} onClick={() => updateSentiment(response['linkedInUsername'], '')} className="fa fa-edit"></Button></h5>
  //         <p>{response['title']} of {response['company']}</p>
  //         <p><a >Respond to {response['firstName']}</a></p>

  //       </div>
  //     )
  //   })
;

const noResponses = (respones) => (
    <Row>
      <Col xs={12}>
        <h5>Clients ({respones.filter(response => response.sentiment === "client").length})</h5>
      {respones.filter(response => response.sentiment === "client").length > 0 ? displayResponses(respones, 'client', 'client', 'meeting') : null }
      </Col>
      <Col xs={12}>
        <h5>Meetings ({respones.filter(response => response.sentiment === "meeting").length})</h5>
      {respones.filter(response => response.sentiment === "meeting").length > 0 ? displayResponses(respones, 'meeting', 'client', 'positive') : null }
      </Col>
      <Col xs={12}>
        <h5>Leads ({respones.filter(response => response.sentiment === "positive").length})</h5>
      {respones.filter(response => response.sentiment === "positive").length > 0 ? displayResponses(respones, 'positive', 'meeting', 'neutral') : null }
      </Col>
      <Col xs={12}>
        <h5>Connections ({respones.filter(response => response.sentiment === "neutral").length})</h5>
        { respones.filter(response => response.sentiment === "neutral").length > 0 ? displayResponses(respones, 'neutral', 'positive', 'neutral') : null}
      </Col>
    </Row>  );


const Responses = ({
  loading, Responses,
}) => (!loading ? (
  <div className="Responses">
    <br />
    {Responses.filter(response => response.sentiment == '').length == 0 ? noResponses(Responses) : null }
    {
      Responses.filter(response => response.sentiment == '').map((response) => {
        console.log(response);
      return (
        <div style={{ backgroundColor: "#EBEFF2", borderRadius: "3px", padding: '10px', marginBottom: "10px"}}>
          <Row>
          <Col xs={12}>
          <p><a target="_blank" href={response.linkedinUrl}>{response.firstName} {response.lastName}</a>  <a target="_blank" href={response.threadUrl}><i class="fa fa-comments"></i></a></p>
          </Col>
          <Col xs={12}>
            {
              response.messages.map((message) => (
                  <p><b>{ message.name  }</b>: {message.text}</p>
                ))

            }
            </Col>
            <Col xs={12}>
            <Button style={{ margin: '0', position:'relative', marginRight: "5px" }} onClick={() => updateSentiment(response.linkedInUsername, 'positive')}><i class="fa fa-thumbs-up"></i></Button>
            <Button style={{ margin: '0', position:'relative', marginRight: "5px" }} onClick={() => updateSentiment(response.linkedInUsername, 'neutral')}><i class="fa fa-thumbs-down"></i></Button>
            </Col>
          </Row>
        </div>
        );
      })

    } 
  </div>
) : <Loading />);

Responses.propTypes = {
  loading: PropTypes.bool.isRequired,
  Responses: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('contacts.responses');

  const Responses = ContactsCollection.find({}).fetch();

  Responses.map(response => {
    console.log(response.messages[0]);
    response['responseText'] = "";
    for(var i = 0; i < response.messages.length; i++) {
      if(response.messages[i]['name'] != response.messages[0]['name']) {
        response['responseText'] = response.messages[i]['text']
        break;
      }
    }
  })

  console.log(Responses);


  return {
    loading: !subscription.ready(),
    Responses,
  };
})(Responses);
