import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Q4Launchs from '../Q4Launchs';

Meteor.publish('q4launchs', function q4launchs() {
  return Q4Launchs.find({});
});
