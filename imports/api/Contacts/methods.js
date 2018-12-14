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
  'contacts.remove': function contactsRemove(_id) {
    check(_id, String);

    try {
      return Contacts.update(_id, {
        $set: {
          owner: '',
          userId: '',
        },
      });
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
      newContact.firstName = uploadedContact.firstName;
      newContact.lastName = uploadedContact.lastName;
      newContact.title = uploadedContact.Title;
      newContact.company = uploadedContact.CompanyCleaned;
      newContact.city = uploadedContact.City;
      newContact.website = uploadedContact.Website;
      newContact.email = uploadedContact.email1;
      newContact.linkedinUrl = uploadedContact.LIProfileUrl;
      newContact.badLinkedinUrl = false;
      newContact.linkedInUsername = uploadedContact.LIProfileUrl.split('/')[4];
      newContact.userId = '';
      newContact.owner = '';
      newContact.badFit = false;
      newContact.requestSent = false;
      newContact.requestSentDate = '';
      newContact.connection = false;
      newContact.connectionDate = '';
      newContact.replied = false;
      newContact.sentiment = false;
      newContact.messages = false;
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
      console.log(Contacts.find({ linkedinUrl: uploadedContact.LIProfileUrl }).fetch().length)
      if (Contacts.find({ linkedinUrl: uploadedContact.LIProfileUrl }).fetch().length === 1) {
        console.log('contact exists')
      } else {
        Contacts.insert(newContact);
      }
    }
  },
});
