import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
  <Nav pullRight>
{

    // <LinkContainer to="/about">
    //   <NavItem eventKey={1} href="/about">About</NavItem>
    // </LinkContainer>
    // <LinkContainer to="/golf">
    //   <NavItem eventKey={2} href="/golf">Golf</NavItem>
    // </LinkContainer>

    }
    <LinkContainer to="/login">
      <NavItem eventKey={3} href="/login">Log In</NavItem>
    </LinkContainer>
    <li role='presentation'>
      <a href="https://meetings.hubspot.com/david1033">Get a Demo</a>
    </li>
  </Nav>
);

export default PublicNavigation;
