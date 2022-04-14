import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { MovieCard } from "../movie-card/movie-card";
import { Link } from "react-router-dom";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick, movies } = this.props;
    // moviesFromGenre is limited to 3 items
    let moviesFromGenre = movies.filter((m) => m.Genre.Name === genre.Name).slice(0, 3);
    return (
      <div className="genre-view">
        <div>
          <Button
            variant="outline-dark"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
          <br></br>
        </div>
        <br></br>
        <Row className="genre-view__title-line">
          <Col sm={12} md={6}>
            <span className="genre-view__title">{genre.Name}</span>
            <br></br>
          </Col>
        </Row>

        <div className="genre-view__info">
          <span className="genre-view__info__description">{genre.Description}</span>
          <div>
            <br></br>
          </div>
          <h6>
            <u> All {genre.Name} movies:</u>
          </h6>
          <div>
            <br></br>
          </div>
          <Row>
            {moviesFromGenre.map((m) => (
              <Col md={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))}
          </Row>
        </div>
        <br></br>
      </div>
    );
  }
}

// prop-types
// Give informational warnings in browser if data does not match required shape
GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }),
};
