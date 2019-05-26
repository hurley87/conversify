import React from 'react';
import { Row, Col } from 'react-bootstrap';


import './Index.scss';

const Index = () => (
  <div className="Index">
  	<br />
  	<br />
    <Row>
    <Col xs={12} sm={4} smOffset={2}>
        <img src="Tips.png"/>
      </Col>
      <Col xs={12} sm={6}>
        <h3>
          A few useful tips...
        </h3>
        <p>1. sign in using your LinkedIn email and password</p>
        <p>2. bot will run once a day in the morning</p>
        <p>3. only reply when someone messages you first</p>
        <p>4. pretend your speaking with a friend</p>
        <p>5. download the LinkedIn app and turn on notifications</p>
        <br />
        <p><a href="/login">Get Started</a></p>
      </Col>
    </Row>
    
  </div>
);

export default Index;
