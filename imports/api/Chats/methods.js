import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Chats from './Chats';
import handleMethodException from '../../modules/handle-method-exception';
import rateLimit from '../../modules/rate-limit';

Meteor.methods({
  'chats.add': function chatsInsert(email) {
    check(email, String);

    try {
      return Chats.update({ "Email": email }, { $set: { supernova_personalization: '' }}, {multi: true});
    } catch (exception) {
      handleMethodException(exception);
    }
  },
  'chats.remove': function chatsRemove(email) {
    check(email, String);


    console.log("HEY")
    console.log(email)

    const chats = Chats.find({ Email: email }).fetch()
    console.log(chats)

    try {
      return Chats.update({ "Email": email }, { $set: { supernova_personalization: 'PASS' }}, {multi: true});
    } catch (exception) {
      handleMethodException(exception);
    }
  }
});

rateLimit({
  methods: [
    'chats.insert',
    'chats.update',
    'chats.remove',
  ],
  limit: 5,
  timeRange: 1000,
});
