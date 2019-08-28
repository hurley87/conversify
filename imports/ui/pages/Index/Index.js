import React from 'react';
import { Row, Col } from 'react-bootstrap';
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
              Connect Your Sales Teams With Your Future Customers
              </h1>
              <p>
              Our team of outbound sales experts deliver a steady flow of ideal customers right to your LinkedIn and Email inbox.
              </p>
              <br />
              <p><a href="https://meetings.hubspot.com/david1033">Get a Demo</a></p>
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
            <p>From our database of more than 300 million contacts, we build you customized prospect lists of thousands of your ideal customers.</p>
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
            <p>An outbound sales expert will help you write a sequence of LinkedIn messages and emails that is sure to start a conversation.</p>
          </Col>
        </Row>
        <Row className='section'>
          <Col sm={7}>
            <h4>Campaigns</h4>
            <h2>Automate the Boring Stuff</h2>
            <p>We build you an automated sales pipeline with personalized messaging that targets qualified leads and starts a conversation with them.</p>
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
            <p>Import or export your prospects to your favorite CRM so you can see which conversation campaigns are the most effective.</p>
          </Col>
        </Row>
      </div>
      <Footer />
  </div>
);

export default Index;
