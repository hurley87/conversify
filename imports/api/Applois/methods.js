import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Applois from './Applois';
import handleMethodException from '../../modules/handle-method-exception';

Meteor.methods({
  'update_Sentiment': function update_Sentiment(linkedInUrl, sentiment) {
    check(linkedInUrl, String)
    check(sentiment, String)

    try {
      return Applois.update({ 'Person Linkedin Url': linkedInUrl }, {
      	$set: {
      		"First Message Reply Sentiment": sentiment
      	}
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  }
});
