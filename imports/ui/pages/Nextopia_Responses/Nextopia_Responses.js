import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import NextopiasCollection from '../../../api/Nextopias/Nextopias';
import Loading from '../../components/Loading/Loading';

const updatesentiment = (linkedInUrl, sentiment) => {

  Meteor.call('updatesentiment', linkedInUrl, sentiment, (error) => {
    if (error) {
      console.log(error.reason, 'success');
    } else {
      console.log('Added', 'success');
    }
  });
};


const Nextopia_Responses = ({
  loading, Nextopia_Responses
}) => (!loading ?  (
  <div className="Nextopia_Responses">
    <br />
    <br />
    {
      Nextopia_Responses.map((response) => {

      return(
          <div>
            <h5>{response["First Name"] + " " + response["Last Name"]}: {response["First Message Reply Text"]}</h5>
            <br />
            <p>Sentiment: {response['First Message Reply Sentiment']}</p>
            <Button onClick={() => updatesentiment(response['Person Linkedin Url'], 'positive')} bsStyle="success">Positive</Button>
            <Button  onClick={() => updatesentiment(response['Person Linkedin Url'], 'neutral')}  bsStyle="warning">Neutral</Button>
            <Button  onClick={() => updatesentiment(response['Person Linkedin Url'], 'negative')}  bsStyle="danger">Negative</Button>
            <br/><hr/>
          </div>
        )

      })

    }
  </div>
) : <Loading />);

Nextopia_Responses.propTypes = {
  loading: PropTypes.bool.isRequired,
  Nextopia_Responses: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('nextopias');

  let Nextopia_Responses = NextopiasCollection.find({
    "First Message Reply": true
  }).fetch();

  console.log(Nextopia_Responses)

  return {
    loading: !subscription.ready(),
    Nextopia_Responses: Nextopia_Responses
  };
})(Nextopia_Responses);
