import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Navbar } from "../navbar/navbar";
import { ProfileView } from "../profile-view/profile-view";
import { RegistrationView } from "../registration-view/registration-view";

// #0
import { setMovies } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";
/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

// #2 export keyword removed from here
class MainView extends React.Component {
  constructor() {
    super();

    // Initial state is set to null
    // #3 movies state removed from here

    this.state = {
      //movies: [],
      selectedMovie: null,
      user: null,
      userData: null,
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
        // #4
        this.props.setMovies(response.data);
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

  receiveUpdatedUserDataFromMovieView(userData) {
    this.setState({
      userData,
    });
  }

  render() {
    // #5 movies is extracted from this.props rather than from the this.state
    let { movies } = this.props;
    const { user } = this.state;

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
              path="/"
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

                return <MoviesList movies={movies} />;
              }}
            />

            <Route
              path="/login"
              render={() => {
                if (user) return <Redirect to="/" />;

                return (
                  <Col md={6}>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/register" />;
                return (
                  <Col xs={12} md={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user) return <Redirect to="/login" />;
                return (
                  <Col xs={12} md={10}>
                    <MovieView movie={movies.find((m) => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
            <Route
              path={"/users/${user}"}
              render={({ history }) => {
                if (!user) return <Redirect to="/login" />;
                return (
                  <Col xs={12} md={10}>
                    <ProfileView user={user} movies={movies} onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
            <Route
              path={"/directors/:name"}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/login" />;
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
              path={"/genres/:name"}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/login" />;
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

// #7
let mapStateToProps = (state) => {
  return { movies: state.movies };
};

// #8
export default connect(mapStateToProps, { setMovies })(MainView);
