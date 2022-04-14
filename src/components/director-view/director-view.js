import React from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export function DirectorView(props) {
  return (
    <>
      <div>
        <Button
          variant="outline-light"
          onClick={() => {
            props.onBackClick();
          }}
        >
          Back
        </Button>
      </div>

      <div>
        <h1 className="display-4">{props.director.Name}</h1>
      </div>
      <div>
        <span className="value">Birthday: {props.director.Birthday}</span>
      </div>
      <div>
        <span className="value">{props.director.Bio}</span>
      </div>
      <br />
      <div>
        <h4>Some movies from this director:</h4>
      </div>

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
    </>
  );
}
