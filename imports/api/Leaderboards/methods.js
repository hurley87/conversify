import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Leaderboards from './Leaderboards';
import handleMethodException from '../../modules/handle-method-exception';

Meteor.methods({
  'updateSentiment': function updateSentiment(linkedInUrl, sentiment) {
    check(linkedInUrl, String)
    check(sentiment, String)

    console.log(sentiment)
    console.log(linkedInUrl)

    try {
      return Leaderboards.update({ 'Person Linkedin Url': linkedInUrl }, {
      	$set: {
      		"First Message Reply Sentiment": sentiment
      	}
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  }
});
