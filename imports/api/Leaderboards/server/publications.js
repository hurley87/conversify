import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Leaderboards from '../Leaderboards';

Meteor.publish('leaderboards', function leaderboards() {
  return Leaderboards.find({ 
    "replied": true,
    "Third Message Reply Sentiment": ""
  });
});

Meteor.publish('mother.scheduled', function motherScheduled(){
  return Leaderboards.find({ 
    'First Message Sent': false
  })
})


// Note: documents.view is also used when editing an existing document.
Meteor.publish('sequences.view', function documentsView(account_owner) {
  check(account_owner, String);
  return Leaderboards.find({ account_owner, "First Message Sent": false });
});


Meteor.publish('contactsLeft', function contactsLeft() {
  return Leaderboards.find({});
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