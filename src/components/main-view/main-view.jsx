import axios from "axios";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null,
      showRegistrationView: true,
    };
  }

  componentDidMount() {
    axios
      .get("https://give-me-movies.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  onRegistration(register) {
    this.setState({
      register,
      showRegistrationView: false,
    });
  }

  toggleRegistrationView(showRegistrationView) {
    this.setState({
      showRegistrationView,
    });
  }

  render() {
    const { movies, selectedMovie, user, register, showRegistrationView } =
      this.state;

    // RegistrationView if user is not registered
    if (!register && !user && showRegistrationView)
      return (
        <RegistrationView
          onRegistration={(register) => this.onRegistration(register)}
          toggleRegistrationView={(showRegistrationView) =>
            this.toggleRegistrationView(showRegistrationView)
          }
        />
      );

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          toggleRegistrationView={(showRegistrationView) =>
            this.toggleRegistrationView(showRegistrationView)
          }
        />
      );

    // Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    // If we get here then user is registered and logged in.
    // Render list of MovieCard comps if no movie is selected.
    // Go to MovieView if a movie is selected

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={3}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
    );
  }
}
