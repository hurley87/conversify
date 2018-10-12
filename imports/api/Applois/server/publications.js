import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Applois from '../Applois';

Meteor.publish('applois', function applois() {
  return Applois.find({});
});
