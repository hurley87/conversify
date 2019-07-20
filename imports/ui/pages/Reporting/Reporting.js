import React from 'react';
import Page from '../Page/Page';

const content = `
#### Marketing Reporting on Revenue
We want to talk about how much money you've generated, not leads.
#### LinkedIn
We want to know how fast you're building your network and how much money your account is making you.
#### Email
We want to know know who's opneing and replying to your emails. 
#### Sales Leaderboard
Show the right data to your reps that help motivate them. Give points activities and deal movement.
`;

const Reporting = () => (
  <div className="Reporting">
    <Page
      title="Reporting"
      subtitle="We integrate with your CRM to help you make sense of all the data we collect during our outreach campaigns to help optimize messaging."
      content={content}
    />
  </div>
);

export default Reporting;
