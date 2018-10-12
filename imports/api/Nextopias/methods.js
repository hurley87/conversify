import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Nextopias from './Nextopias';
import handleMethodException from '../../modules/handle-method-exception';

Meteor.methods({
  'updatesentiment': function updatesentiment(linkedInUrl, sentiment) {
    check(linkedInUrl, String)
    check(sentiment, String)

    try {
      return Nextopias.update({ 'Person Linkedin Url': linkedInUrl }, {
      	$set: {
      		"First Message Reply Sentiment": sentiment
      	}
      });
    } catch (exception) {
      handleMethodException(exception);
    }
  }
});
