import React from 'react';
import { Row, Col } from 'react-bootstrap';


import './Index.scss';

const Index = () => (
  <div className="Index">
  	<br />
  	<br />
    <Row>
      <Col xs={12} sm={4} smOffset={4}>
        <h3>
          Tips
        </h3>
        <p>1. be awesome</p>
        <p>2. bot will run once a day in the morning</p>
        <p>3. only reply when someone messages you first</p>
        <p>4. you can only send 50 connection requests a day</p>
        <p>4. download the linkedin app and turn on notifications</p>
        <br />
        <p><a className='btn btn-default' href="/signup">Get Started</a></p>
      </Col>
    </Row>
    
  </div>
);

export default Index;
