import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';
import { year } from '../../../modules/dates';

import './Footer.scss';

const copyrightYear = () => {
  const currentYear = year();
  return currentYear === '2017' ? '2017' : `2017-${currentYear}`;
};

const Footer = () => (
  <div className='Footer'>
    <div className='container'>
    <br />
    <br />
    <br />
    <br />
    <Row>
      <Col md={8} sm={12} mdOffset={2} xs={12}>
        <h1>Get started</h1>
        <p>Manage conversations at scale over LinkedIn and Email.</p>
        <br />
        <p><a className='add-btn' href='https://calendly.com/conversifyai'>Get a Demo</a></p>
      </Col>
    </Row>
    <br />
    <br />
    <br />
    <br />
    <hr />
    <br />
    <br />
    <Row>
      <Col sm={4}>
        <p className='text-left'>Copyright Conversify Inc.</p>
      </Col>
      <Col sm={4}>
        <img height='25px' src="https://adsgen.s3.amazonaws.com/conversify-logo.svg"/>
      </Col>
      <Col sm={4}>
        <p className='text-right'><a href="/terms">Terms</a> &nbsp;&nbsp;&nbsp;<a href="/privacy">Privacy</a></p>
      </Col>
    </Row>
    <br />
    <br />
  </div>
{

  //   <div className="get-started">
  //     <div className='container text-center'>
  //     <Row>
  //       <Col md={4} sm={12} mdOffset={4} xs={12}>
  //       <h1>Get started</h1>
  //       <p>Conversify offers services that make it easy for sales leaders to reach their growth goals.</p>
  //       <p><a className='add-btn' href='https://calendly.com/conversifyai'>Get a Demo</a></p>
  //       </Col>
  //     </Row>
  //     </div>
  //   </div>
  //   <div className='container'>
  //   <Row>
  //     <Col sm={3}>
  //       <img height='25px' src="https://adsgen.s3.amazonaws.com/conversify-logo.svg"/>
  //     </Col>
  //     <Col sm={3}>
  //       <h4>Company</h4>
  //       <p><a href="/about">About</a></p>
  //       <p><a href="/golf">Golf</a></p>
  //       <p><a href="/terms">Terms</a></p>
  //       <p><a href="/privacy">Privacy</a></p>
  //     </Col>
  //     <Col sm={3}>
  //       <h4>Product</h4>
  //       <p><a href="/prospecting">Prospecting</a></p>
  //       <p><a href="/messaging">Messaging</a></p>
  //       <p><a href="/automation">Automation</a></p>
  //       <p><a href="/reporting">Reporting</a></p>
  //     </Col>
  //     <Col sm={3}>
  //       <h4>Contact</h4>
  //       <p>+1 (647) 284-5023</p>
  //       <p>david@conversify.ai</p>
  //       <p><a href="https://calendly.com/conversifyai">Get a Demo</a></p>
  //     </Col>
  //     <Col xs={12}>
  //       <br />
  //       <br />
  //       <br />
  //       <br />
  //       <p className='text-center'><small>Copyright Conversify Inc.</small></p>
  //     </Col>
  //   </Row>
  // </div>

  }
</div>
);

Footer.propTypes = {};

export default Footer;
