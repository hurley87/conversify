import React from 'react';
import { Button } from 'react-bootstrap';

import './Index.scss';

const Index = () => (
  <div className="Index text-center">
  	<br />
  	<br />
    <h1>GrowthGenius Pilot in Command</h1>
    <p className='tagline'>Traditional extraction and inspection of information from a database is both time consuming and
    eye straining.
    GrowthGenius Pilot in Command modernizes this process by optimizing your dashboard to display only the relevant information that you need.
    From viewing all your clients' info on one page to conducting sentiment analysis, we've got you covered! So what are we waiting for?
    </p>
    <p><a className='poll-btn' href="/leaderboard">Leggo!</a></p>
  </div>
);

export default Index;
