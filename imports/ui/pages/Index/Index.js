import React from 'react';
import { Row, Col } from 'react-bootstrap';


import './Index.scss';

const Index = () => (
  <div className="Index">
    <div className="hero-container">
      <div className='container'>
        <Row>
          <Col xs={12} sm={6}>
            <h1>
              Experience the new standard in <br /> outbound marketing
            </h1>
            <p>Surround is the best way to reach our ideal customers. 
              We help you sychronize the distribution of value over email and LinkedIn in a way that delights your prospects.</p>
            <br />
            <p><a href="/signup">Get Started</a></p>
          </Col>
          <Col xs={12} sm={5} smOffset={1}>
            <img src="Tips.png"/>
          </Col>
        </Row>
      </div>
    </div>
    <div className='first'>
      <div className='text container'>
        <h1>
              Experience the new standard in <br /> outbound marketing
            </h1>
            <p>Surround is the best way to reach our ideal customers. 
              We help you sychronize the distribution of value over email and LinkedIn in a way that delights your prospects.</p>
            <br />
            <h1>
              Experience the new standard in <br /> outbound marketing
            </h1>
            <p>Surround is the best way to reach our ideal customers. 
              We help you sychronize the distribution of value over email and LinkedIn in a way that delights your prospects.</p>
            <br />
            <h1>
              Experience the new standard in <br /> outbound marketing
            </h1>
            <p>Surround is the best way to reach our ideal customers. 
              We help you sychronize the distribution of value over email and LinkedIn in a way that delights your prospects.</p>
            <br />
      </div>
    </div>
    <div className='second'>
      <div className="container">
        <h3>so cool</h3>
      </div>
    </div>
  </div>
);

export default Index;
