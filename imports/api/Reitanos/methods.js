import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Reitanos from './Reitanos';
import handleMethodException from '../../modules/handle-method-exception';

Meteor.methods({
  'updateSentiment': function updateSentiment(linkedInUrl, sentiment) {
    check(linkedInUrl, String)
    check(sentiment, String)

    try {
      return Reitanos.update({ 'Person Linkedin Url': linkedInUrl }, {
      	$set: {
      		"First Message Reply Sentiment": sentiment
      	}
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  }
});
