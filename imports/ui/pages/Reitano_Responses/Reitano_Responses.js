import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ReitanosCollection from '../../../api/Reitanos/Reitanos';
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


const Reitano_Responses = ({
  loading, Reitano_Responses
}) => (!loading ?  (
  <div className="Reitano_Responses">
    <br />
    <br />
    {
      Reitano_Responses.map((response) => {

      return(
          <div>
            <h5>{response["First Name"] + " " + response["Last Name"]}: {response["First Message Reply Text"]}</h5>
            <br />
            <p>Sentiment: {response['First Message Reply Sentiment']}</p>
            <Button onClick={() => updateSentiment(response['Person Linkedin Url'], 'positive')} bsStyle="success">Positive</Button>
            <Button  onClick={() => updateSentiment(response['Person Linkedin Url'], 'neutral')}  bsStyle="warning">Neutral</Button>
            <Button  onClick={() => updateSentiment(response['Person Linkedin Url'], 'negative')}  bsStyle="danger">Negative</Button>
            <br/><hr/>
          </div>
        )

      })

    }
  </div>
) : <Loading />);

Reitano_Responses.propTypes = {
  loading: PropTypes.bool.isRequired,
  Reitano_Responses: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('reitanos');

  let Reitano_Responses = ReitanosCollection.find({
    "First Message Reply": true
  }).fetch();

  console.log(Reitano_Responses)

  return {
    loading: !subscription.ready(),
    Reitano_Responses: Reitano_Responses
  };
})(Reitano_Responses);
