import React from 'react';
import Page from '../Page/Page';

const content = `
Your privacy is important to us.
It is Conversify's policy to respect your privacy regarding any information we may collect while operating our website. Accordingly, we have developed this privacy policy in order for you to understand how we collect, use, communicate, disclose and otherwise make use of personal information. We have outlined our privacy policy below.
We will collect personal information by lawful and fair means and, where appropriate, with the knowledge or consent of the individual concerned.
Before or at the time of collecting personal information, we will identify the purposes for which information is being collected.
Personal data should be relevant to the purposes for which it is to be used, and, to the extent necessary for those purposes, should be accurate, complete, and up-to-date.
We will protect personal information by using reasonable security safeguards against loss or theft, as well as unauthorized access, disclosure, copying, use or modification.
We will make readily available to customers information about our policies and practices relating to the management of personal information.
We will only retain personal information for as long as necessary for the fulfillment of those purposes.
We are committed to conducting our business in accordance with these principles in order to ensure that the confidentiality of personal information is protected and maintained. Conversify may change this privacy policy from time to time at Conversify's sole discretion.
`;

const Privacy = () => (
  <div className="Privacy">
    <Page
      title="Privacy Policy"
      subtitle="Last updated May 29th, 2017"
      content={content}
    />
  </div>
);

export default Privacy;
