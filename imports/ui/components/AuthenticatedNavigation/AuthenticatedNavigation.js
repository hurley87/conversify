import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

const AuthenticatedNavigation = ({ name, history }) => (
  <div>
    <Nav pullRight>
      <LinkContainer to="/prospects">
        <NavItem eventKey={2.1} href="/prospects">Prospects</NavItem>
      </LinkContainer>
      <LinkContainer to="/responses">
        <NavItem eventKey={2.2} href="/responses">Responses</NavItem>
      </LinkContainer>
      <LinkContainer to="/results">
        <NavItem eventKey={2.3} href="/results">Results</NavItem>
      </LinkContainer>
      <LinkContainer to="/templates">
        <NavItem eventKey={2.4} href="/templates">Templates</NavItem>
      </LinkContainer>
      <NavDropdown eventKey={2} title="Profile" id="user-nav-dropdown">
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

