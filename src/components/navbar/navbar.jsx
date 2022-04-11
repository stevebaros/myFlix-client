import React from "react";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import { Link } from "react-router-dom";

export function Navbar(user) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar bg="info" variant="light" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Give Me Movies
        </Navbar.Brand>
        {isAuth() && (
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/users/${user}"}>
              Profile
            </Nav.Link>
            <Button
              variant="outline-primary"
              onClick={() => {
                onLoggedOut();
              }}
            >
              Logout
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}
