/* eslint-disable consistent-return */

import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Chats = new Mongo.Collection('ryan');

export default Chats;
