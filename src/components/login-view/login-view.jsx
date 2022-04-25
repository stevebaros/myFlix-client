import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import RegistrationView from "../registration-view/registration-view";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Delcare hook for each input

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  //Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr("Username must be 2 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPassword("Password must be 6 characters long");
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://give-me-movies.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        console.log("no such user");
        window.alert("invalid username or password");
      });
  };

  return (
    <>
      <Form>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <br></br>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      <br></br>
      <br></br>
      <div>
        <p>
          Don't have an account yet? <Link to={"/register"}> Register </Link> here!
        </p>
      </div>
    </>
  );
}
