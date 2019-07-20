import React from 'react';
import Page from '../Page/Page';

const content = `
#### Find 1000s of Look-alike Accounts
Our platform automatically sources thousands of accounts that match your ideal customer profile from multiple data sources including database of 50 million business decision makers, HG data and 18 other data sources.
#### Acquire and Validate All Relevant Data
Account-centric sales development means that you have to know a lot about each account. Not just the size, location and industry. And your data has to be accurate and up-to-date.
#### Find Net New Target Contacts
Identify all the net new contacts and accounts that you should be working with that aren’t currently on your radar. Get perfect emails, phone numbers and insights to acquire, connect and close these net new contacts.
#### Contact Intelligence
Find thousands of insights on all the contacts that matter most to growing your business.
#### Find Net New Target Accounts
All potential contacts and accounts come with curated research on their company size, industry, recent news, and more to bolster the content of your outreach as well as prove the relevance of the account.
#### Account Intelligence
Thousands of insights and weeks worth of research found instantaneously and delivered in a company relationship insights brief anywhere you browse on the web to get you up to speed on everything you need to know about the company you are connecting with in 5 seconds or less.
#### Import Into Your Favorite CRM
Simply import all your new contact and account prospecting lists into your favorite crm, with custom, one-click integrations with top CRMs like Salesforce.
`;

const Prospecting = () => (
  <div className="Prospecting">
    <Page
      title="Curate the Perfect Leads"
      subtitle="Build a massive list of your total addressable contact market; inclusive of perfect emails, phone numbers and insights."
      content={content}
    />
  </div>
);

export default Prospecting;
