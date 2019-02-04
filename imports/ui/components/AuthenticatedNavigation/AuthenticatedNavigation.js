import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const AuthenticatedNavigation = ({ name, history }) => (
  <div>
    <Nav pullRight>
      <LinkContainer to="/invitations">
        <NavItem eventKey={2.1} href="/invitations">Invitations</NavItem>
      </LinkContainer>
      <LinkContainer to="/campaigns">
        <NavItem eventKey={2.1} href="/campaigns">Cohorts</NavItem>
      </LinkContainer>
      <LinkContainer to="/responses">
        <NavItem eventKey={2.1} href="/responses">Guests</NavItem>
      </LinkContainer>
      <NavDropdown eventKey={2} title={name} id="user-nav-dropdown">
        <MenuItem eventKey={2.2} onClick={() => history.push('/logout')}>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

AuthenticatedNavigation.propTypes = {
  name: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(AuthenticatedNavigation);
