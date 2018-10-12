import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Leaderboards from '../Leaderboards';

Meteor.publish('leaderboards', function leaderboards() {
  return Leaderboards.find({});
});

Meteor.publish('leaderboards.list', function leaderboardsList(startDate, endDate) {
  check(startDate, String);
  check(endDate, String);

  console.log(startDate)
  console.log(endDate)

  let selector = {
  	"First Message Sent Date" : { 
        $gte: new Date(startDate),
        $lte: new Date(endDate)
  	}
  }

  return Leaderboards.find(selector);
});