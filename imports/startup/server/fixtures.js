import seeder from '@cleverbeagle/seeder';
import { Meteor } from 'meteor/meteor';
import Templates from '../../api/Templates/Templates';

const templateLibary = [
  {
    title: "Great Gastby",
    request: "Hi {{firstName}}, I'd like to invite you to our launch party later this month. Let me know if you'd like me to add your name to the list.",
    followup: "The event is on March 6th and we'll provide free drinks and appetizers. Should I send you more info"
  },
  {
    title: "Howard Stern",
    request: "Hi {{firstName}}, I just started a podcast called The Goods where I talk to top designers about their greatest successes, favourite failures, a key aha moments. Would you like to hear more?",
    followup: "I'd really like to hear about some of the design challenges you've faced at {{Company}}. You have time for a quick chat this week or next?"
  },
  {
    title: "Oprah Winfrey",
    request: "Hi {{firstName}}, we are launching a blog series that'll feature stories about HR leaders and their strategies to eliminate stress in the modern workplace. Would you be interested in sharing some of your own strategies?",
    followup: "We are launching at the end of next month and I'd like to hear your prespective. Is it okay if we set up a time to chat this week?"
  },
  {
    title: "Tiger Woods",
    request: "Hi {{firstName}}, this may sound random but I'll ask anyway - do you golf?",
    followup: "The reason I ask is I’d like to get your feedback on an app I’ve created for sales teams over a round of golf. Thoughts?"
  },
  {
    title: "Bill Nye",
    request: "Hi {{firstName}}, have you ever wanted to learn how to code? I'm hosting a free workshop next week where I'll show people automate their LinkedIn account.",
    followup: "The workshop will be on Sept 30th at 6:30pm and there'll be drinks. Let me know if you'd like more info."
  },
  {
    title: "Justin Bieber",
    request: "Hey {{firstName}}, a friend recommended you as a potential fit to join our sales team. Would you like to hear more about the opportunity?",
    followup: "Would you have time for a coffee this week or next?"
  }
]

const templatesSeed = userId => ({
  collection: Templates,
  environments: ['development', 'staging'],
  noLimit: true,
  modelCount: 6,
  model(dataIndex) {
    return {
      owner: userId,
      title: templateLibary[dataIndex].title,
      request: templateLibary[dataIndex].request,
      followup: templateLibary[dataIndex].followup,
    };
  },
});

seeder(Meteor.users, {
  environments: ['development', 'staging'],
  noLimit: true,
  data: [{
    email: 'admin@admin.com',
    password: 'password',
    profile: {
      name: {
        first: 'Andy',
        last: 'Warhol',
      },
    },
    roles: ['admin'],
    data(userId) {
      return templatesSeed(userId);
    },
  }],
  modelCount: 0,
});
