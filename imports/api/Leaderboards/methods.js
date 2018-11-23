import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Leaderboards from './Leaderboards';
import handleMethodException from '../../modules/handle-method-exception';

Meteor.methods({
  'updateSentiment': function updateSentiment(linkedInUrl, sentiment) {
    check(linkedInUrl, String)
    check(sentiment, String)

    try {
      return Leaderboards.update({ 'linkedin_url': linkedInUrl }, {
      	$set: {
      		"Third Message Reply Sentiment": sentiment
      	}
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'upload.contacts': function uploadContacts(contacts, email) {
    check(contacts, Array);
    check(email, String);
    console.log('EMAILS')
    console.log(email);
    for(let idx in contacts) {
      let uploadedContact = contacts[idx];
      uploadedContact.linkedin_url = uploadedContact['Person Linkedin Url'];
      uploadedContact.linkedin_username = uploadedContact['Person Linkedin Url'].split('/')[4];
      uploadedContact.replied= false;
      uploadedContact.account_owner=email;
      uploadedContact['Bad LinkedIn Url'] = false;
      uploadedContact['Can Contact'] = false;
      uploadedContact['Can Contact Date'] = false;
      uploadedContact['Contact Created Date'] = new Date();
      uploadedContact['CR Accepted'] = false;
      uploadedContact['CR Accepted Time'] = false;
      uploadedContact['NaN Variable'] = false;
      uploadedContact['First Message Sent'] = false;
      uploadedContact['First Message Sent Date'] = '';
      uploadedContact['Second Message Sent'] = false;
      uploadedContact['Second Message Sent Date'] = '';
      uploadedContact['Third Message Sent'] = false;
      uploadedContact['Third Message Sent Date'] = '';
      uploadedContact['Third Message Reply Sentiment'] = '';
      Leaderboards.update({'Person Linkedin Url': uploadedContact['Person Linkedin Url'], "account_owner": email }, { $set: uploadedContact }, { upsert: true } );
    }
  }
});
