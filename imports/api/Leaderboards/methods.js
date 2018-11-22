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
  'upload.contacts': function uploadContacts(contacts) {
    check(contacts, Array);
    console.log(contacts);  
  }
});
