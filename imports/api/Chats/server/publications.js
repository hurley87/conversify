import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Chats from '../Chats';

Meteor.publish('chats', function chats() {
  return Chats.find({ supernova_personalization: "EMAIL1" });
});
