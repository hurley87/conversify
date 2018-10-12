import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import LeaderboardsCollection from '../../../api/Leaderboards/Leaderboards';
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
    <br />
    {
      Responses.map((response) => {

      return(
          <div>
            <h5>{response["collection"]+ " "+response["First Name"] + " " + response["Last Name"]}: {response["First Message Reply Text"]}</h5>
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

Responses.propTypes = {
  loading: PropTypes.bool.isRequired,
  Responses: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('leaderboards');

  let Responses = LeaderboardsCollection.find({
    "First Message Reply": true
  }).fetch();

  console.log(Responses)


  return {
    loading: !subscription.ready(),
    Responses: Responses
  };
})(Responses);