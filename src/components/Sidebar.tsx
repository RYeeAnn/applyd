import React, { useState, ChangeEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar, Nav, Dropdown, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <div>
    <h1>ApplyD</h1>
    <Navbar expand="lg" className="sidebar">
      <Navbar.Toggle aria-controls="sidebar-nav" />
      <Navbar.Collapse id="sidebar-nav">
        <Nav className="flex-column w-100">
          {isAuthenticated ? (
            <Dropdown className="w-100">
              <Dropdown.Toggle variant="secondary" className="w-100">
                <FontAwesomeIcon icon={faUser} /> Profile
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => logout()}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Button onClick={() => loginWithRedirect()} variant="primary" className="w-100 mb-3">
              Login
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default Sidebar;
