import React from 'react';
import { Row, Col } from 'react-bootstrap';


import './Index.scss';

const Index = () => (
  <div className="Index">
    <div className="hero-container">
      <div className='rectangle'>
        <div className='container'>
          <Row>
            <Col xs={12} sm={6}>
              <h1>
              Your all-in-one B2B growth marketing platform
              </h1>
              <p>
              Created to help you allow your sales team to be more productive. 
              </p>
              <br />
              <p><a href="/signup">Get Started</a></p>
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div className='content-container container'>
        <Row>
          <Col xs={12}>
            <h3>All the growth tools you need</h3>
            <div className='line'></div>
          </Col>
        </Row>
        <Row className='section'>
          <Col xs={6}>
            <h4>Prospects</h4>
            <h2>Get started quickly</h2>
            <p>Created the perfect list of contact to go after.</p>
          </Col>
          <Col xs={6}>
            <p className='text-right'><img src="3.png"/></p>
          </Col>
        </Row>
        <Row className='section'>
        <Col xs={6}>
            <img src="1.png"/>
          </Col>
          <Col xs={6} className='text-right'>
            <h4>Templates</h4>
            <h2>Get started quickly</h2>
            <p>Created the perfect list of contact to go after.</p>
          </Col>
        </Row>
        <Row className='section'>
          <Col xs={6}>
            <h4>Outreach</h4>
            <h2>Get started quickly</h2>
            <p>Created the perfect list of contact to go after.</p>
          </Col>
          <Col xs={6}>
          <p className='text-right'><img src="2.png"/></p>
          </Col>
        </Row>
        <Row className='section'>
        <Col xs={6}>
            <img src="5.png"/>
          </Col>
          <Col xs={6} className='text-right'>
            <h4>Reporting</h4>
            <h2>Get started quickly</h2>
            <p>Created the perfect list of contact to go after.</p>
          </Col>
        </Row>
        <Row className='section'>
          <Col xs={12}>
            <h3>Put your prospecting on autopilot</h3>
            <p className='text-center'>This is an amazing concluding statement</p>
          </Col>
          <Col smOffset={4} sm={4}>
            <p className='text-center'><a className='add-btn' href="/signup">Get Started</a></p>
          </Col>
        </Row>
      </div>
      <div className='footer'>
        <div className='container'>
          <Row>
            <Col xs={3}>
              <img height='25px' src="https://adsgen.s3.amazonaws.com/conversify-logo.svg"/>
            </Col>
            <Col xs={3}>
              <h4>Company</h4>
              <p><a href="/about">About</a></p>
              <p><a href="/about">Pricing</a></p>
              <p><a href="/about">Careers</a></p>
            </Col>
            <Col xs={3}>
              <h4>Product</h4>
              <p><a href="/about">List Building</a></p>
              <p><a href="/about">Advanced Sequences</a></p>
              <p><a href="/about">LinkedIn Automation</a></p>
              <p><a href="/about">Email Automation</a></p>
              <p><a href="/about">Live Chat</a></p>
            </Col>
            <Col xs={3}>
              <h4>Contact</h4>
              <p>+1 (800) 651-9632</p>
              <p>support@conversify.ai</p>
              <p>Request a demo</p>
              <p>Site Map</p>
            </Col>
          </Row>
        </div>

      </div>
  </div>
);

export default Index;
