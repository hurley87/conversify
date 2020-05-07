import "./Footer.scss";

import { Col, Grid, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import React from "react";
import { year } from "../../../modules/dates";

const copyrightYear = () => {
  const currentYear = year();
  return currentYear === "2017" ? "2017" : `2017-${currentYear}`;
};

const Footer = () => (
  <div className="Footer">
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <Row>
        <Col md={8} sm={12} mdOffset={2} xs={12}>
          <h1>Get started</h1>
          <p>Manage conversations at scale over LinkedIn and Email</p>
          <br />
          <p>
            <a className="add-btn" href="/signup">
              Chat with us
            </a>
          </p>
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
          <p className="text-left">Copyright Conversify Inc.</p>
        </Col>
        <Col sm={4}>
          <img
            height="25px"
            src="https://adsgen.s3.amazonaws.com/conversify-logo.svg"
          />
        </Col>
        <Col sm={4}>
          <p className="text-right">
            <a href="/terms">Terms</a> &nbsp;&nbsp;&nbsp;
            <a href="/privacy">Privacy</a>
          </p>
        </Col>
      </Row>
      <br />
      <br />
    </div>
  </div>
);

Footer.propTypes = {};

export default Footer;
