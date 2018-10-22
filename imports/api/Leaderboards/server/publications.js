import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Leaderboards from '../Leaderboards';

Meteor.publish('leaderboards', function leaderboards() {
  return Leaderboards.find({ 
    "replied": true,
    "Third Message Reply Sentiment": ""
  });
});

Meteor.publish('leaderboards.list', function leaderboardsList(startDate, endDate) {
  check(startDate, String);
  check(endDate, String);

  let selector = {
  	"First Message Sent Date" : { 
        $gte: new Date(startDate),
        $lte: new Date(endDate)
  	}
  }

  return Leaderboards.find(selector);
});