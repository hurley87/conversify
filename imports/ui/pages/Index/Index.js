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
              Experience the new standard in outbound marketing
            </h1>
            <p>Get 5-10 qualified meetings per week with key decision makers using an orchestrated sequence over LinkedIn and Email</p>
            <br />
            <p><a href="/signup">Get Started</a></p>
          </Col>
          <Col xs={12} sm={6}>
            <img src="Tips.png"/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className='header'>
              <h3>
                Direct selling doesn’t work like it used to
              </h3>
              <p>Surround your prospect with value and have them come to you</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={4} xs={12}>
            <div className='step'>
              <img src="step_1.png"/>
              <p>Create a list of qualified prospects and a sequence of messages</p>
            </div>
          </Col>
          <Col sm={4} xs={12}>
            <div className='step'>
              <img src="step_2.png"/>
              <p>Send a LinkedIn connection request and follow up message</p>
            </div>
          </Col>
          <Col sm={4} xs={12}>
            <div className='step'>
              <img src="step_3.png"/>
              <p>Email prospects based on how they responded on LinkedIn</p>
            </div>
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
            {/* <p>Surround is the best way to reach our ideal customers. 
              We help you sychronize the distribution of value over email and LinkedIn in a way that delights your prospects.</p>
            <br />
            <h1>
              Experience the new standard in <br /> outbound marketing
            </h1>
            <p>Surround is the best way to reach our ideal customers. 
              We help you sychronize the distribution of value over email and LinkedIn in a way that delights your prospects.</p>
            <br /> */}
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
