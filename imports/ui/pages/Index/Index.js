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
            Your all-in-one growth marketing platform.
            </h1>
            <p>
            Conversify is a complete Email, LinkedIn and Live Chat solution designed to help you manage all your sales conversations in one place.
            </p>
            <br />
            <p><a href="/signup">Get Started For Free</a></p>
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
              <p>You approve a list of qualified prospects and a sequence of messages</p>
            </div>
          </Col>
          <Col sm={4} xs={12}>
            <div className='step'>
              <img src="step_2.png"/>
              <p>We send a sequence of messages over LinkedIn on your behalf</p>
            </div>
          </Col>
          <Col sm={4} xs={12}>
            <div className='step'>
              <img src="step_3.png"/>
              <p>We email prospects based on how they responded over LinkedIn</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <div className='header text-center'>
              <h3>
                Put your prospecting on autopilot
              </h3>
              <p>Without having to spend money on ads or any other complicated marketing funnel</p>
              <br/>
              <p><a style={{margin: 'auto'}} href="/signup">Get Started For Free</a></p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
 
{/* <div className='first'>
      <div className='text container'>
            <h3>
              Templates
            </h3>
            <p>
              Surround is the best way to reach our ideal customers. 
              We help you sychronize the distribution of value over email and LinkedIn in a way that delights your prospects.
            </p>
      </div>
    </div>
    <div className='second'>
      <div className="container">
      <Row>
        <Col xs={6}>
          <h3>
            Prospects
          </h3>
          <p>
            Surround is the best way to reach our ideal customers. 
            We help you sychronize the distribution of value over email and LinkedIn in a way that delights your prospects.
          </p>
        </Col>
      </Row>
      </div>
    </div>
    <div className='first'>
      <div className='text container'>
            <h3>
              Sales Funnel
            </h3>
            <p>
              Surround is the best way to reach our ideal customers. 
              We help you sychronize the distribution of value over email and LinkedIn in a way that delights your prospects.
            </p>
      </div>
    </div> */}
  </div>
);

export default Index;
