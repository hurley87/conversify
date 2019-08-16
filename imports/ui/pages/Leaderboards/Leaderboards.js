import React from 'react';
import { Row } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';


Array.prototype.groupBy = function(prop) {
  return this.reduce(function(groups, item) {
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}

const Leaderboards = ({
  Leaderboards
}) =>  (
  <div className="Leaderboards">
    <Row>
hey
    </Row>
  </div>
 );

export default withTracker(() => {
  const subscription = Meteor.subscribe('leaderboards');
  let Leaderboards = LeaderboardsCollection.find().fetch();

  console.log("FUCK")

  return {
    loading: !subscription.ready(),
    Leaderboards: Leaderboards,

  };
})(Leaderboards);
