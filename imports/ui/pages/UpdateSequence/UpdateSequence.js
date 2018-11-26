import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import LeaderboardsCollection from '../../../api/Leaderboards/Leaderboards';
import Loading from '../../components/Loading/Loading';

const UpdateSequence = ({ loading, docs, history }) => (!loading ? (
  <div className="UpdateSequence">
    <br />
   <p><a href="/leaderboard">Leaderboard</a></p>
   <p>{docs.length} contacts left to prospect</p>
  </div>
) : <Loading />);

UpdateSequence.defaultProps = {
  doc: null,
};

UpdateSequence.propTypes = {
  doc: PropTypes.object,
  history: PropTypes.object.isRequired,
};

export default withTracker(({match}) => {
  const account_owner = match.params._id;
  const subscription = Meteor.subscribe('sequences.view', account_owner);
  const docs = LeaderboardsCollection.find().fetch();

  console.log(docs);

  return {
    loading: !subscription.ready(),
    docs,
  };
})(UpdateSequence);
