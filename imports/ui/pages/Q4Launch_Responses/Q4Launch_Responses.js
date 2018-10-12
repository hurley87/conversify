import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import Q4LaunchsCollection from '../../../api/Q4Launchs/Q4Launchs';
import Loading from '../../components/Loading/Loading';

const update_sentiment = (linkedInUrl, sentiment) => {

  Meteor.call('update_sentiment', linkedInUrl, sentiment, (error) => {
    if (error) {
      console.log(error.reason, 'success');
    } else {
      console.log('Added', 'success');
    }
  });
};


const Q4Launch_Responses = ({
  loading, Q4Launch_Responses
}) => (!loading ?  (
  <div className="Q4Launch_Responses">
    <br />
    <br />
    {
      Q4Launch_Responses.map((response) => {

      return(
          <div>
            <h5>{response["First Name"] + " " + response["Last Name"]}: {response["First Message Reply Text"]}</h5>
            <br />
            <p>Sentiment: {response['First Message Reply Sentiment']}</p>
            <Button onClick={() => update_sentiment(response['Person Linkedin Url'], 'positive')} bsStyle="success">Positive</Button>
            <Button  onClick={() => update_sentiment(response['Person Linkedin Url'], 'neutral')}  bsStyle="warning">Neutral</Button>
            <Button  onClick={() => update_sentiment(response['Person Linkedin Url'], 'negative')}  bsStyle="danger">Negative</Button>
            <br/><hr/>
          </div>
        )

      })

    }
  </div>
) : <Loading />);

Q4Launch_Responses.propTypes = {
  loading: PropTypes.bool.isRequired,
  Q4Launch_Responses: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('q4launchs');

  let Q4Launch_Responses = Q4LaunchsCollection.find({
    "First Message Reply": true
  }).fetch();

  console.log(Q4Launch_Responses)

  return {
    loading: !subscription.ready(),
    Q4Launch_Responses: Q4Launch_Responses
  };
})(Q4Launch_Responses);
