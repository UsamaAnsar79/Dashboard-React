import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, FormControl, Dropdown } from "react-bootstrap";
import { FaBars, FaBell, FaSearch, FaEllipsisV } from "react-icons/fa"; // Importing three dots icon
import { logout } from '../actions/authActions';
import { BiX } from "react-icons/bi"; 
import { useSelector, useDispatch } from 'react-redux';
import './index.css';

export default function NavBarComponent({ heading }) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [userInitial, setUserInitial] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated && user) {
      setUserInitial(user.name.charAt(0).toUpperCase());
    } else {
      const storedUserName = localStorage.getItem("name");
      if (storedUserName) {
        setUserInitial(storedUserName.charAt(0).toUpperCase());
      }
    }
  }, [isAuthenticated, user]);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
    if (searchVisible) {
      setSearchValue("");
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const closeSearch = () => {
    setSearchValue(""); 
    setSearchVisible(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar variant="dark" expand="lg" className="navbar-main border-0">
      <Navbar.Brand className="d-flex align-items-center text-white ">
        <span className="dashboard-heading ms-5">DASHBOARD</span>
      </Navbar.Brand>
      
      <Navbar.Toggle 
        aria-controls="basic-navbar-nav" 
        className="d-lg-none border-0" 
      >
        <FaEllipsisV className="text-white" />
      </Navbar.Toggle>
      
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="align-items-center text-white">
          <Nav.Link onClick={toggleSearch} className="text-white">
            <FaSearch />
          </Nav.Link>
          {searchVisible && (
            <div className="search-container position-absolute">
              <Form inline>
                <div className="position-relative">
                  <FormControl
                    type="text"
                    placeholder="SEARCH"
                    className="search-bar"
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                  <BiX 
                    className="search-close-icon" 
                    onClick={closeSearch} 
                  />
                </div>
              </Form>
            </div>
          )}
          <Nav.Link className="text-white ms-3">
            <FaBell />
            <span className="notification-count"></span>
          </Nav.Link>
          <Dropdown className="ms-3 profile-dropdown">
            <Dropdown.Toggle variant="none" id="dropdown-basic" className="text-white d-flex align-items-center no-focus">
              <div className="profile-circle me-1">
                {userInitial}
              </div>
            </Dropdown.Toggle>

            {/* Align dropdown to the left using dropdown-menu-start */}
            <Dropdown.Menu className="custom-dropdown-menu">
              {isAuthenticated ? (
                <>
                  <h5 className="ms-3">{user.name}!</h5>
                </>
              ) : (
                <h2>Please log in or sign up.</h2>
              )}
              <Dropdown.Item href="#/action-1">View Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
