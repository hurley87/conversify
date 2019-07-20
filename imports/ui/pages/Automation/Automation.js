import React from 'react';
import Page from '../Page/Page';

const content = `
#### LinkedIn Connection Requests
Send hundreds of personalized connection requests daily and engage new prospects. 
#### LinkedIn Followups
Manage your LinkedIn inbox and send the right prospects follow up messages automatically. 
#### Email Sequence
Put prospects on automated email sequences depending how they reply on LinkedIn. 
#### Live Chat
A follow manages live chat solution that heps convert website visitors into booked apointments.
#### CRM
Don't let admin tasks get in the way of your sales reps productivity. We will help automate those processes. 
`;

const Automation = () => (
  <div className="Automation">
    <Page
      title="Automate the Boring Stuff"
      subtitle="An automated sales pipeline with personalized messaging that targets qualified leads and delivers interested responses right to your inbox."
      content={content}
    />
  </div>
);

export default Automation;
