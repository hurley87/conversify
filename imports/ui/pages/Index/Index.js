import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';


import './Index.scss';

const Index = () => (
  <div className="Index">
    <div className="hero-container">
      <div className='rectangle'>
        <div className='container'>
          <Row>
            <Col xs={12} sm={6}>
              <h1>
              An outbound marketing automation solution
              </h1>
              <p>
              We help sales teams manage conversations at scale over LinkedIn and Email
              </p>
              <br />
              <p><a href="https://calendly.com/conversifyai">Get a Demo</a></p>
            </Col>
            <Col xs={12} sm={4} smOffset={1}>
              <img src='8.png' />
            </Col>
          </Row>
        </div>
      </div>
    </div>
    <div className='content-container container'>
        <Row>
          <Col xs={12}>
            <h3>Our process</h3>
            <div className='line'></div>
          </Col>
        </Row>
        <Row className='section'>
          <Col sm={7}>
            <h4>Prospecting</h4>
            <h2>Curate the Perfect List</h2>
            <p>Build a massive list of your total addressable contact market including emails, phone numbers and LinkedIn URLs.</p>
          </Col>
          <Col sm={5}  className='hidden-xs'>
            <p className='text-right'><img src="3.png"/></p>
          </Col>
        </Row>
        <Row className='section'>
        <Col sm={5}  className='hidden-xs'>
            <img src="1.png"/>
          </Col>
          <Col sm={7} className='text-right'>
            <h4>Templates</h4>
            <h2>Craft the Perfect Message</h2>
            <p>We are experts at starting conversations over LinkedIn and Email that convert to sales qualified leads.</p>
          </Col>
        </Row>
        <Row className='section'>
          <Col sm={7}>
            <h4>Campaigns</h4>
            <h2>Automate the Boring Stuff</h2>
            <p>An automated sales pipeline with personalized messaging that targets qualified leads and delivers interested responses right to your inbox.</p>
          </Col>
          <Col sm={5} className='hidden-xs'>
          <p className='text-right'><img src="2.png"/></p>
          </Col>
        </Row>
        <Row className='section'>
        <Col sm={5} className='hidden-xs'>
            <img src="5.png"/>
          </Col>
          <Col sm={7} className='text-right'>
            <h4>Insights</h4>
            <h2>Analyze Your Growth</h2>
            <p>We integrate with your CRM to help you make sense of all the data we collect during our conversation campaigns to help optimize messaging.</p>
          </Col>
        </Row>
      </div>
      <Footer />
  </div>
);

export default Index;
