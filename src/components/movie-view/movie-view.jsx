import React from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <>
        <div>
          <Button
            variant="outline-light"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </div>

        <div className="movie-title">
          <h1 className="display-4">{movie.Title}</h1>
        </div>
        <div className="movie-img text-left">
          <img src={movie.ImagePath} width="350" className="img-fluid" />
        </div>

        <div>
          <Link to={`/genres/${movie.Genre.Name}`} className="d-inline-flex">
            <Badge pill bg="light" text="dark">
              {movie.Genre.Name}
            </Badge>
          </Link>
        </div>
        <div>
          <p>Director: </p>
          <Link to={`/directors/${movie.Director.Name}`} className="d-inline-flex">
            {movie.Director.Name}
          </Link>
        </div>

        <br />
        <div>
          <span className="value">{movie.Description}</span>
        </div>

        <Link to={"/"}>
          <Button variant="outline-light">Back to full list</Button>
        </Link>
      </>
      // onClick() event listener sets selectedMovie variable in main-view to null, allowing to return back to list of MovieCards
    );
  }
}

/* Use propTypes to validate data types of props
    Validation logic:
    movie object is required, if object contains a title, the Title has to be a string
    onBackClick function is required
*/
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
