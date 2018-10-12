import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Reitanos from '../Reitanos';

Meteor.publish('reitanos', function reitanos() {
  return Reitanos.find({});
});
