/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable semi */
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Contacts from './Contacts';
import handleMethodException from '../../modules/handle-method-exception';

Meteor.methods({
  'contacts.add': function contactsAdd(_id) {
    check(_id, String);

    const email = Meteor.users.findOne(this.userId).emails[0].address;
    console.log(email)

    try {
      return Contacts.update(_id, {
        $set: {
          owner: email,
          userId: this.userId,
        },
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'contacts.skip': function contactsSkip(_id) {
    check(_id, String);

    const email = Meteor.users.findOne(this.userId).emails[0].address;
    console.log(email)

    try {
      return Contacts.update(_id, {
        $set: {
          owner: '',
          userId: this.userId,
        },
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'contacts.remove': function contactsRemove(contactId) {
    check(contactId, String);

    try {
      return Contacts.remove(contactId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'upload.contacts': function uploadContacts(contacts) {
    check(contacts, Array);

    console.log(contacts);

    for (const idx in contacts) {
      const newContact = {}
      const uploadedContact = contacts[idx];
      newContact.createdAt = new Date();
      newContact.cohort = uploadedContact.cohort;
      newContact.firstName = uploadedContact.firstName;
      newContact.lastName = uploadedContact.lastName;
      newContact.title = uploadedContact.Title;
      newContact.company = uploadedContact.Company;
      newContact.city = uploadedContact.City;
      newContact.website = uploadedContact.Website;
      newContact.email = uploadedContact.Email;
      newContact.linkedinUrl = uploadedContact.LIProfileUrl;
      newContact.template = uploadedContact.template;
      newContact.badLinkedinUrl = false;
      newContact.linkedInUsername = ""
      newContact.userId = uploadedContact.userId;
      newContact.owner = uploadedContact.owner;
      newContact.badFit = false;
      newContact.requestSent = false;
      newContact.requestSentDate = '';
      newContact.connection = false;
      newContact.connectionDate = '';
      newContact.replied = false;
      newContact.sentiment = '';
      newContact.messages = [];
      newContact.championText = uploadedContact.championText;
      newContact.challengerText = uploadedContact.challengerText;
      newContact.firstFollowUpSent = false;
      newContact.firstFollowUpText = uploadedContact.firstFollowUpText;
      newContact.firstFollowUpDate = '';
      newContact.secondFollowUpText = uploadedContact.secondFollowUpText;
      newContact.secondFollowUpSent = false;
      newContact.secondFollowUpDate = '';
      newContact.sequenceOver = false;
      newContact.sequenceOverDate = '';
      newContact.threadUrl = ''
      console.log('cool')
      if (Contacts.find({ linkedinUrl: uploadedContact.LIProfileUrl}).fetch().length === 1) {
        console.log('contact exists')
        console.log(uploadedContact.LIProfileUrl)
      } else {
        Contacts.insert(newContact);
      }
    }
  },
  updateSentiment: function updateSentiment(linkedInUsername, sentiment) {
    check(linkedInUsername, String);
    check(sentiment, String);

    try {
      return Contacts.update({ linkedInUsername }, {
        $set: {
          sentiment,
        },
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'contacts.update': function contactsUpdate(doc) {
    check(doc, {
      _id: String,
      championText: String,
      firstFollowUpText: String,
    });

    try {
      const contactId = doc._id;
      Contacts.update(contactId, { $set: doc });
      return contactId; // Return _id so we can redirect to contact after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});
