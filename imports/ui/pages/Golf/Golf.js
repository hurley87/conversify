import React from 'react';
import Page from '../Page/Page';

const content = `
#### Choose a course
We are ClubLink members so are happy to take you out to any of their courses found here, https://clublink.ca/membership/clubs/
#### The front 9
Tell us about your business. We want to hear about the challenges you're facing and where you're heading. 
#### The back 9
We tell you more about Conversify and what we offer. We ideate on how automation can help your sales team.
#### The 19th hole
We have a drink and get to know one another. 
`; 

const Golf = () => (
  <div className="Golf">
    <Page
      title="Golf"
      subtitle="We are fans of doing business on the cours"
      content={content}
    />
  </div>
);

export default Golf;
