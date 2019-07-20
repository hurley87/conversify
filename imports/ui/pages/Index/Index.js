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
              Your all-in-one B2B growth marketing platform
              </h1>
              <p>
              Conversify is designed to help you enable your sales team to be more productive. 
              </p>
              <br />
              <p><a href="https://calendly.com/conversifyai">Get a Demo</a></p>
            </Col>
            <Col xs={12} sm={5} smOffset={1}>
              <img src='8.png' />
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
          <Col sm={7}>
            <h4><Link to="prospecting">Prospecting</Link></h4>
            <h2>Curate the Perfect Leads</h2>
            <p>Build a massive list of your total addressable contact market; inclusive of perfect emails, phone numbers and insights.</p>
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
            <h4><Link to="messaging">Messaging</Link></h4>
            <h2>Craft the Perfect Message</h2>
            <p>Work with professional copy writers that will help you create messaging that'll get your prospect's attention and start a conversation.</p>
          </Col>
        </Row>
        <Row className='section'>
          <Col sm={7}>
            <h4><Link to="automation">Automation</Link></h4>
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
            <h4><Link to="reporting">Reporting</Link></h4>
            <h2>Analyze Your Growth</h2>
            <p>We integrate with your CRM to help you make sense of all the data we collect during our outreach campaigns to help optimize messaging.</p>
          </Col>
        </Row>
      </div>
      <Footer />
  </div>
);

export default Index;
