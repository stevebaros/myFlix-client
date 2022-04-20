import React from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export function FavoriteMovies({ favoriteMovieList, removeFav }) {
  return (
    <>
      <Row>
        <Col xs={12}>
          <h4>
            <u>My favorite movies</u>
          </h4>
        </Col>
      </Row>
      <br></br>
      <Row className="justify-content-md-center">
        {favoriteMovieList.map((movie) => {
          return (
            <Col xs={12} sm={6} md={4} className="d-flex" key={movie._id}>
              <Card text="dark" border="dark" className="mb-3">
                <Card.Img variant="top" src={movie.ImagePath} className="img-responsive" />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Button variant="outline-danger" onClick={() => removeFav(movie._id)}>
                    Remove from Favorites
                  </Button>
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">More Info</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
}
