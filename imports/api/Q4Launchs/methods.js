import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Q4Launchs from './Q4Launchs';
import handleMethodException from '../../modules/handle-method-exception';

Meteor.methods({
  'update_sentiment': function update_sentiment(linkedInUrl, sentiment) {
    check(linkedInUrl, String)
    check(sentiment, String)

    try {
      return Q4Launchs.update({ 'Person Linkedin Url': linkedInUrl }, {
      	$set: {
      		"First Message Reply Sentiment": sentiment
      	}
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  }
});
