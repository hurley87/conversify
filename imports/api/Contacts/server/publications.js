import { Meteor } from 'meteor/meteor';
import Contacts from '../Contacts';
import { check } from 'meteor/check';

Meteor.publish('contacts', () => Contacts.find({ requestSent: false }));

Meteor.publish('contacts.list', function contactsList(startDate, endDate) {
  check(startDate, String);
  check(endDate, String);

  console.log(startDate);
  console.log(endDate);

  let selector = {
    "requestSentDate": {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  }

  return Contacts.find(selector);
});

Meteor.publish('contacts.responses', function contactsResponses() {

  let selector = {
    "replied": true
  }

  return Contacts.find(selector);
});