import { Meteor } from 'meteor/meteor';
import Contacts from '../Contacts';
import { check } from 'meteor/check';

Meteor.publish('contacts', function contacts() {

  let selector = {
    "userId": this.userId,
  }

  return Contacts.find(selector);
});

Meteor.publish('contacts.list', function contactsList(startDate, endDate) {
  check(startDate, String);
  check(endDate, String);

  console.log(startDate);
  console.log(endDate);

  let selector = {
    "userId": this.userId,
    "requestSentDate": {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  }

  return Contacts.find(selector);
});

Meteor.publish('contacts.responses', function contactsResponses() {

  let selector = {
    "replied": true,
    "userId": this.userId,
  }

  return Contacts.find(selector);
});

// Note: contacts.view is also used when editing an existing contact.
Meteor.publish('contacts.view', function contactsView(contactId) {
  check(contactId, String);
  return Contacts.find({ _id: contactId });
});