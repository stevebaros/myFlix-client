import axios from "axios";
import React from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";

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
      userData: authData.user,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    Axios.get("https://give-me-movies.herokuapp.com/movies", {
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
    Axios.get(`https://give-me-movies.herokuapp.com/users/${username}`, {
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
    const { movies, user, registered } = this.state;

    // RegistrationView if user is not registered
    if (!registered) return <RegistrationView />;

    // LoginVIew if user is registered, but not logged in
    if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} toRegistrationView={(asdf) => this.toRegistrationView(asdf)} />;

    // Empty Mainview if there are no movies (or movies are still loading)
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        {/* If We get here then we are logged in and movies have loaded. */}
        {/* LogoutButton hangs out at the top of each logged in screen */}
        <Row>
          <Col>
            <LogoutButton
              logoutUser={(user) => {
                this.logoutUser(user);
              }}
            />
          </Col>
        </Row>

        <Row className="main-view justify-content-md-center">
          {/* This is what renders by default after logging in */}
          <Route
            exact
            path="/"
            render={() => {
              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          <Route
            path="/movies/:movieId"
            render={({ match }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.back()}
                    userData={this.state.userData}
                    sendUpdatedUserDataToMainView={(userData) => {
                      this.receiveUpdatedUserDataFromMovieView(userData);
                    }}
                  />
                </Col>
              );
            }}
          />

          {/* This route is linked to from MovieCard */}
          <Route
            path="/directors/:name"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView director={movies.find((m) => m.Director.Name === match.params.name).Director} onBackClick={() => history.back()} movies={movies} />
                </Col>
              );
            }}
          />

          {/* This route is linked to from MovieCard */}
          <Route
            path="/genres/:name"
            render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.back()} movies={movies} />
                </Col>
              );
            }}
          />

          {/* This route is linked to from main movie list page, 
              MovieView, DirectorView, and GenreView */}
          <Route
            exact
            path="/profile"
            render={() => {
              return (
                <ProfileView
                  user={user}
                  movies={movies}
                  userData={this.state.userData}
                  sendUpdatedUserDataToMainView={(userData) => {
                    this.receiveUpdatedUserDataFromMovieView(userData);
                  }}
                />
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}
