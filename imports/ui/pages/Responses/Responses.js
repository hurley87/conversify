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

const displayResponses = (responses, sentiment) => 
   (
    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Title</th>
          <th>Company</th>
          <th>City</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {responses.filter((response) => response.sentiment == sentiment).map(({
          _id, firstName, lastName, title, city, company, linkedinUrl, website, threadUrl, linkedInUsername
        }) => (
            <tr key={_id}>
              <td><a href={`/prospects/${_id}`}>{firstName} {lastName}</a></td>
              <td>
                <Button style={{ margin: '0', padding: '0', fontSize: "17px" }} onClick={() => updateSentiment(linkedInUsername, '')} className="fa fa-edit"></Button>
              </td>
              <td>{title.length > 30 ? title.slice(0, 30) + "..." : title}</td>
              <td><a target="_blank" href={`http://${website}`}>{company.split(" ").length > 1 ? company.split(" ")[0] + " " + company.split(" ")[1] : company}</a></td>
              <td>{city}</td>

              <td>
                <a target='_blank' href={threadUrl}>
                  Chat
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
  //         <h5><a href={`/prospects/${response._id}`}>{response["firstName"] + " " + response["lastName"]}</a> <Button style={{margin: '0', marginLeft: "5px", padding: '0', fontSize: "17px"}} onClick={() => updateSentiment(response['linkedInUsername'], '')} className="fa fa-edit"></Button></h5>
  //         <p>{response['title']} of {response['company']}</p>
  //         <p><a >Respond to {response['firstName']}</a></p>

  //       </div>
  //     )
  //   })
;

const noResponses = (respones) => (
    <Row>
      <Col xs={12}>
        <h5>Positives ({respones.filter(response => response.sentiment === "positive").length})</h5>
      {respones.filter(response => response.sentiment === "positive").length > 0 ? displayResponses(respones, 'positive') : null }
      </Col>
      <Col xs={12}>
        <h5>Neutrals ({respones.filter(response => response.sentiment === "neutral").length})</h5>
        { respones.filter(response => response.sentiment === "neutral").length > 0 ? displayResponses(respones, 'neutral') : null}
      </Col>
      <Col xs={12}>
        <h5>Negatives ({respones.filter(response => response.sentiment === "negative").length})</h5>
      {respones.filter(response => response.sentiment === "negative").length > 0 ? displayResponses(respones, 'negative') : null }
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
        <div><hr />
          <h5><a target="_blank" href={response.linkedinUrl}>{`${response["firstName"]  } ${  response["lastName"]}`}</a></h5>
          <p>{response.title} of {response.company}</p>
          <p><a target="_blank" href={response.threadUrl}>Respond to {response.firstName}</a></p>
          <br />
          {
              response.messages.map((message) => (
                  <p><b>{ message.name  }</b>: {message.text}</p>
                ))

            }
          <Button style={{ marginLeft: '0' }} onClick={() => updateSentiment(response.linkedInUsername, 'positive')} bsStyle="success">Positive</Button>
          <Button onClick={() => updateSentiment(response.linkedInUsername, 'neutral')} bsStyle="warning">Neutral</Button>
          <Button onClick={() => updateSentiment(response.linkedInUsername, 'negative')} bsStyle="danger">Negative</Button>
          <br />
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

  console.log(Responses);


  return {
    loading: !subscription.ready(),
    Responses,
  };
})(Responses);
