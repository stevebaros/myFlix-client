import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";

import "./director-view.scss";

export function DirectorView(props) {
  return (
    <div className="director-view ">
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
      <br></br>
      <div>
        <h4> {props.director.Name}</h4>
        <br></br>
      </div>

      <div>
        <span className="value">{props.director.Bio}</span>
      </div>
      <br></br>
      <div>
        <span className="value">
          <b>Born in: </b>
          {props.director.Birth}
        </span>
      </div>

      <br />
      <div>
        <h6>
          <u>Some movies from this director:</u>
        </h6>
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

      <br></br>
    </div>
  );
}
