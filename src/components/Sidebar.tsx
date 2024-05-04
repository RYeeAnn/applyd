import React, { useState, ChangeEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navbar, Nav, Dropdown, Button, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faSearch } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event.target.value);
    // Add functionality here to perform search in the application
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Add functionality here to perform search in the application
  };

  return (
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
          <Form className="w-100 mt-3" onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <FormControl
                type="text"
                placeholder="Search"
                value={searchKeyword}
                onChange={handleSearchChange}
                aria-label="Search"
              />
              <Button variant="outline-secondary" type="submit">
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </div>
          </Form>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Sidebar;
