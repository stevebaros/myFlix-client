import React from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./update-user.scss";

export function UpdateUser({ userdata, handleUpdate, handleSubmit }) {
  // Return a registration form where users can submit their username, password, email and birthday
  // Listening to changes on input and then updating the respective states
  return (
    <>
      <br></br>
      <br></br>

      <div className="UpdateProfile">
        <h4>Update profile information</h4>

        <Form className="mb-3">
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" name="Username" onChange={(e) => handleUpdate(e)} />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" name="Password" onChange={(e) => handleUpdate(e)} />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="Email" onChange={(e) => handleUpdate(e)} />
          </Form.Group>

          <Form.Group controlId="formBirthday" className="mb-3">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="date" name="Birthday" onChange={(e) => handleUpdate(e)} />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Update Profile
          </Button>
        </Form>
      </div>
    </>
  );
}
