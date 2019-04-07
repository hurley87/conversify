import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Templates from '../Templates';

Meteor.publish('templates', function templates() {
  return Templates.find({ owner: this.userId });
});

// Note: templates.view is also used when editing an existing template.
Meteor.publish('templates.view', function templatesView(templateId) {
  check(templateId, String);
  return Templates.find({ _id: templateId, owner: this.userId });
});
