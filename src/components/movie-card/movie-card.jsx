import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { FavoriteMovies } from "../profile-view/favorite-movies";

import "./movie-card.scss";

import { Link } from "react-router-dom";
const axios = require("axios").default;

export class MovieCard extends React.Component {
  addFavoriteMovie() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios
      .post(
        `https://give-me-movies.herokuapp.com/users/${user}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          method: "POST",
        }
      )
      .then((response) => {
        alert(`Added ${this.props.movie.Title} to your favorites!`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie } = this.props;

    return (
      <Card className="d-flex  justify-content-center">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="card-text">{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>

          <Button variant="info" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>
            Add to Fav
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
};
