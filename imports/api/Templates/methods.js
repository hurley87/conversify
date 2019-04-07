import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Templates from './Templates';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'templates.insert': function templatesInsert(doc) {
    check(doc, {
      title: String,
      request: String,
      followup: String,
    });

    try {
      return Templates.insert({ owner: this.userId, ...doc });
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'templates.update': function templatesUpdate(doc) {
    check(doc, {
      _id: String,
      request: String,
      followup: String,
    });

    try {
      const templateId = doc._id;
      Templates.update(templateId, { $set: doc });
      return templateId; // Return _id so we can redirect to template after update.
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'templates.remove': function templatesRemove(templateId) {
    check(templateId, String);

    try {
      return Templates.remove(templateId);
    } catch (exception) {
      handleMethodException(exception);
    }
  },
});

rateLimit({
  methods: [
    'templates.insert',
    'templates.update',
    'templates.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
