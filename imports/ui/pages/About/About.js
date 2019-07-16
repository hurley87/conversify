import React from 'react';
import Page from '../Page/Page';

const content = `
#### We believe in augmenting human intelligence, not replacing it.
With good data and the right technology, people and institutions today can still solve hard problems and change the world for the better.
#### We make products for human-driven analysis of growth data
We’re focused on creating the world’s best user experience for working with data, one that empowers people to ask and answer complex questions without requiring them to master querying languages, statistical modeling, or the command line. To achieve this, we build platforms for integrating, managing, and securing data on top of which we layer applications for fully interactive human-driven, machine-assisted analysis.
#### We build our company around growth-driven engineering
We’re engineers, not academics. At our headquarters in Toronto we’ve assembled a team that combines practical expertise in advertising, sales, engineering, and data science. 
#### We are here to solve hard growth challenges
We’re injecting the values we respect – collaboration, transparency, and humanity – into our software and re-imagining how organizations can think about growth, with talent and teamwork at the center.
#### How we work
Our intense customer focus is central to what we do. Without it we’d be just another SaaS company. We partner with our customers to ensure their success because we understand that happy, successful customers are central to our success.
#### Golf
We're not shy to admit we like to do most of our business on the golf course. Book a tee time and find out why, https://conversify.ai/golf.
`;

const About = () => (
  <div className="About">
    <Page
      title="About"
      subtitle="Last updated July 1st, 2019"
      content={content}
    />
  </div>
);

export default About;
