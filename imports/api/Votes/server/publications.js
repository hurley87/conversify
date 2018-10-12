import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Votes from '../Votes';

Meteor.publish('votes', function chats() {
  return Votes.find({}, { limit: 80, sort: {$natural: -1} });
});
