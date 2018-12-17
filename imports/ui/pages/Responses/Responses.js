import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ContactsCollection from '../../../api/Contacts/Contacts';
import Loading from '../../components/Loading/Loading';

const updateSentiment = (linkedInUrl, sentiment) => {
  Meteor.call('updateSentiment', linkedInUrl, sentiment, (error) => {
    if (error) {
      console.log(error.reason, 'success');
    } else {
      console.log('Added', 'success');
    }
  });
};


const Responses = ({
  loading, Responses
}) => (!loading ?  (
  <div className="Responses">
    <br />
    <a href='/results'>Back</a>
    <br />
    { Responses.length == 0 ? <p>All responses are labeled</p> : null }
    {
      Responses.map((response) => {

      return(
        <div><hr />
          <h5><a target='_blank' href={response['linkedinUrl']}>{response["firstName"] + " " + response["lastName"]}</a></h5>
            <p>{response['title']} of {response['company']}</p>
            <br />
            {
              response.messages.map((message) =>{
                return (
                  <p><b>{ message.name  }</b>: {message.text}</p>
                )
              })

            }
          <Button style={{ marginLeft: "0" }} onClick={() => updateSentiment(response['linkedInUsername'], 'positive')} bsStyle="success">Positive</Button>
          <Button onClick={() => updateSentiment(response['linkedInUsername'], 'neutral')}  bsStyle="warning">Neutral</Button>
          <Button onClick={() => updateSentiment(response['linkedInUsername'], 'negative')}  bsStyle="danger">Negative</Button>
            <br/><hr/>
          </div>
        )

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

  let Responses = ContactsCollection.find({
    sentiment: '',
  }).fetch();

  console.log(Responses)


  return {
    loading: !subscription.ready(),
    Responses,
  };
})(Responses);