import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Nextopias from '../Nextopias';

Meteor.publish('nextopias', function nextopias() {
  return Nextopias.find({});
});
