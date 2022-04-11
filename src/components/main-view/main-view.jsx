import axios from "axios";
import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { Navbar } from "../navbar/navbar";
import Container from "react-bootstrap/Container";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { LoginView } from "../login-view/login-view";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";

import { Col, Row } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      userData: null,
      registered: true,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
      this.getUserData(accessToken, localStorage.getItem("user"));
    }
    console.log("main view mounted");
  }

  // Passed to LoginView
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://give-me-movies.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserData(token, username) {
    axios
      .get(`https://give-me-movies.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          userData: response.data,
        });
        console.log(`This is the data we found:
          ${Object.keys(response.data)}`);
        console.log(`The current state is:`);
        console.log(this.state);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Passed to LogoutButton
  logoutUser(uselessParam) {
    this.setState({
      user: false,
      selectedMovie: null,
    });
    localStorage.clear();
    window.location.href = "/";
  }

  // This needs a param here even if I don't use it or else setState doesn't work
  toRegistrationView(asdf) {
    this.setState({
      registered: false,
    });
  }

  receiveUpdatedUserDataFromMovieView(userData) {
    this.setState({
      userData,
    });
  }

  render() {
    const { movies, user } = this.state;

    // Else, logic to display the main-view:
    // If no movie is selected (selecteMovie = null), display a MovieCard for each movie in the list
    // If a movie is selected (via setSelectedMovie, clicking on the MovieCard), display MovieView for this movie
    return (
      <Router>
        <Navbar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/login"
              render={() => {
                /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
                if (!user)
                  return (
                    <Col md={6}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                // If movie list is empty (while movies load from API), display empty page
                if (movies.length === 0) return <div className="main-view" />;

                return movies.map((m) => (
                  <Col xs={12} sm={6} md={4} lg={3} className="d-flex" key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />

            <Route
              path="/users/"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col xs={12} md={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:Title"
              render={({ match, history }) => {
                return (
                  <Col xs={12} md={10}>
                    <MovieView movie={movies.find((m) => m._id === match.params.Title)} onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
            <Route
              path={"/users/${user}"}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col xs={12} md={10}>
                    <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
            <Route
              path={"/directors/:Director"}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                // If movie list is empty (while movies load from API), display empty page
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col xs={12} md={10}>
                    <DirectorView movies={movies} director={movies.find((m) => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
            <Route
              path={"/genres/:Genre"}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/" />;
                // If movie list is empty (while movies load from API), display empty page
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col xs={12} md={10}>
                    <GenreView movies={movies} genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

export default MainView;
