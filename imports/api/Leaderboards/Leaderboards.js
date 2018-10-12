
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Leaderboards = new Mongo.Collection('mother');

export default Leaderboards;
