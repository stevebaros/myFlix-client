import React from "react";

import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

export function DirectorView(props) {
  return (
    <>
      <div>
        <p className="display-4">
          {" "}
          <u>{props.director.Name}</u>
        </p>
      </div>
      <br></br>
      <div>
        <span className="value">
          <b>Bio: </b>
          {props.director.Bio}
        </span>
      </div>
      <br></br>
      <div>
        <span className="value">
          <b>Birthday: </b>
          {props.director.Birth}
        </span>
      </div>

      <br />
      <div>
        <b>Some movies from this director:</b>
      </div>
      <br></br>
      <Row className="justify-content-md-center">
        {props.movies
          .filter((m) => m.Director.Name === props.director.Name)
          .map((m) => (
            <Col xs={12} sm={6} md={4} className="d-flex" key={m._id}>
              <MovieCard movie={m} />
            </Col>
          ))}
      </Row>

      <Link to={"/"}>
        <Button variant="outline-light">Back to full list</Button>
      </Link>
      <br></br>
      <div>
        <Button
          variant="outline-dark"
          onClick={() => {
            props.onBackClick();
          }}
        >
          Back
        </Button>
      </div>
    </>
  );
}
