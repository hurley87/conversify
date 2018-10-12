/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Votes = new Mongo.Collection('Votes');

Votes.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Votes.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

Votes.schema = new SimpleSchema({
  owner: {
    type: String,
    label: 'The ID of the user this document belongs to.',
  },
  createdAt: {
    type: String,
    label: 'The date this document was created.',
    autoValue() {
      if (this.isInsert) return (new Date()).toISOString();
    },
  },
  updatedAt: {
    type: String,
    label: 'The date this document was last updated.',
    autoValue() {
      if (this.isInsert || this.isUpdate) return (new Date()).toISOString();
    },
  },
  title: {
    type: String,
    label: 'The title of the document.',
  },
  body: {
    type: String,
    label: 'The body of the document.',
  },
});

Votes.attachSchema(Votes.schema);

export default Votes;
