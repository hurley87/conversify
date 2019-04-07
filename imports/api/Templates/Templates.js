/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Templates = new Mongo.Collection('Templates');

export default Templates;
