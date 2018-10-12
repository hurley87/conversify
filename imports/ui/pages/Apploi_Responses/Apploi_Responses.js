import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Alert, Button, Row, Col } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Bert } from 'meteor/themeteorchef:bert';
import ApploisCollection from '../../../api/Applois/Applois';
import Loading from '../../components/Loading/Loading';

const update_Sentiment = (linkedInUrl, sentiment) => {

  Meteor.call('update_Sentiment', linkedInUrl, sentiment, (error) => {
    if (error) {
      console.log(error.reason, 'success');
    } else {
      console.log('Added', 'success');
    }
  });
};


const Apploi_Responses = ({
  loading, Apploi_Responses
}) => (!loading ?  (
  <div className="Apploi_Responses">
    <br />
    <br />
    {
      Apploi_Responses.map((response) => {

      return(
          <div>
            <h5>{response["First Name"] + " " + response["Last Name"]}: {response["First Message Reply Text"]}</h5>
            <br />
            <p>Sentiment: {response['First Message Reply Sentiment']}</p>
            <Button onClick={() => update_Sentiment(response['Person Linkedin Url'], 'positive')} bsStyle="success">Positive</Button>
            <Button  onClick={() => update_Sentiment(response['Person Linkedin Url'], 'neutral')}  bsStyle="warning">Neutral</Button>
            <Button  onClick={() => update_Sentiment(response['Person Linkedin Url'], 'negative')}  bsStyle="danger">Negative</Button>
            <br/><hr/>
          </div>
        )

      })

    }
  </div>
) : <Loading />);

Apploi_Responses.propTypes = {
  loading: PropTypes.bool.isRequired,
  Apploi_Responses: PropTypes.arrayOf(PropTypes.object).isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('applois');

  let Apploi_Responses = ApploisCollection.find({
    "First Message Reply": true
  }).fetch();

  console.log(Apploi_Responses)

  return {
    loading: !subscription.ready(),
    Apploi_Responses: Apploi_Responses
  };
})(Apploi_Responses);
