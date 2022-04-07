import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <span className="movie-view__line__label">Genre: </span>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <span className="movie-view__line__value">{movie.Genre.Name}</span>
        </Link>
        <span className="movie-view__line__label">Director: </span>
        <Link to={`/directors/${movie.Director.Name}`}>
          <span className="movie-view__line__value">{movie.Director.Name}</span>
        </Link>

        <button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </button>
      </div>
    );
  }
}
