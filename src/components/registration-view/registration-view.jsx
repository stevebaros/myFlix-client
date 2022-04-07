import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Col, Row } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  //Declare hook for each input
  const [name, setName] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [birthdayErr, setBirthdayErr] = useState("");
  const [values, setValues] = useState({
    nameErr: "",
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!name) {
      setValues({ ...values, nameErr: "Name is Required" });
      isReq = false;
    }
    if (!username) {
      setValues({ ...values, usernameErr: "Username is Required" });
      isReq = false;
    } else if (username.length < 5) {
      setValues({ ...values, usernameErr: "Username must be 5 characters long" });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: "Password is Required" });
      isReq = false;
    } else if (password.length < 6) {
      setValues({ ...values, passwordErr: "Password must be minimum 6 characters long" });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: "Email is required" });
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: "Email is invalid" });
      isReq = false;
    }
    return isReq;
  };

  //Modify state of MainView to be registered and logged in with new user
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://give-me-movies.herokuapp.com/users", {
          Name: name,
          Username: username,
          Passowrd: password,
          Email: email,
          Birthday: birthday,
        })
        .then((reponse) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please login!");
          isWindows.open("/", "_self"); //the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch((response) => {
          console.error(response);
          alert("unable to register");
        });
    }
  };

  return (
    <Row className="mt-5">
      <Col md={12}>
        <Form>
          <h3>Sign Up</h3>
          <p></p>
          <Form.Group controlId="formUsername" className="reg-form-inputs">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            {values.usernameErr && <p>{values.usernameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formName" className="reg-form-inputs">
            <Form.Label> Name: </Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {values.nameErr && <p>{values.nameErr}</p>}
          </Form.Group>

          <Form.Group controlId="formPassword" className="reg-form-inputs">
            <Form.Label> Password: </Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            {values.passwordErr && <p>{values.passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId="Email" className="reg-form-inputs">
            <Form.Label> Email: </Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {values.emailErr && <p>{values.emailErr}</p>}
          </Form.Group>

          <Form.Group controlId="updateBirthday" className="reg-form-inputs">
            <Form.Label> Birthday: </Form.Label>
            <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
            {values.BirthdayErr && <p>{values.birthdayErrErr}</p>}
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            {" "}
            Submit
          </Button>
          <p></p>
          <p>
            Already registered? <Link to={"/"}>Sign in</Link> here{" "}
          </p>
        </Form>
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
  }),
  onRegistration: PropTypes.func.isRequired,
};

export default RegistrationView;
