import React from 'react';
import Page from '../Page/Page';

const content = `
#### Develop and Test Value-Driven Messaging
Here's what's dead: Sending out messages that don't take into account the values and priorities of your customers and hoping that they will care about your agenda.
#### Test Multi-channel Messaging 
Use direct, casual, and authentic outreach messages via email, LinkedIn, and live chat. Our platform takes elements of your unique voice, tone, and style and joins the conversation your prospects are already having inside their own heads about what's most important to them.
#### Personalize Each Unique Message
Personalization tailors each message to current events and concerns such as growth statistics, technology trends, and common priorities.
#### Messaging that Converts
We deliver high quality opportunities to you at scale. Humans and technology working hand in hand to fill your funnel with targeted accounts.
#### Targeted Conversation Campaigns
A/Btest conversation campaigns over live chat, LinkedIn and email to find the perfect words that convert.
`;

const Messaging = () => (
  <div className="Messaging">
    <Page
      title="Craft the Perfect Message"
      subtitle="Work with professional copy writers that will help you create messaging that'll get your prospect's attention and start a conversation."
      content={content}
    />
  </div>
);

export default Messaging;
