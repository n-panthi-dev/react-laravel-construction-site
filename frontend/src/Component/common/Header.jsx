import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      {" "}
      <header>
        <div className="container py-2">
          <Navbar expand="lg ">
            <Navbar.Brand as={Link} to="/" className="logo">
              <span>Urban</span> Construction
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} className="nav-link" to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} className="nav-link" to="/about">
                  About
                </Nav.Link>
                <Nav.Link as={Link} className="nav-link" to="/services">
                  Services
                </Nav.Link>
                <Nav.Link as={Link} className="nav-link" to="/project">
                  Projects
                </Nav.Link>
                <Nav.Link as={Link} className="nav-link" to="/blogs">
                  Blogs
                </Nav.Link>
                <Nav.Link as={Link} className="nav-link" to="/contact">
                  Contact
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </header>
    </div>
  );
}

export default Header;
