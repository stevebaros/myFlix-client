import React from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: props.user,
      movies: props.movies,
    };
    this.form = React.createRef();
    this.updateUserData = this.updateUserData.bind(this);
    this.unregister = this.unregister.bind(this);
    this.sendUpdatedUserDataToMainView = props.sendUpdatedUserDataToMainView;
  }

  //load user data AND get a list of favorite movies
  getUser(token, username) {
    Axios.get(`https://give-me-movies.herokuapp.com/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        let birthday = response.data.Birthday ? response.data.Birthday.slice(0, 10) : null;
        this.setState(
          {
            username: response.data.Username,
            email: response.data.Email,
            birthday: birthday,
            favoriteMovies: response.data.FavoriteMovies,
          },
          () => {
            // callback determines the favorite movies after loading user data
            // and updates state again
            this.findFavorites(this.state.movies, this.state.favoriteMovies);
            this.setState({
              favoriteMovieList: this.findFavorites(this.state.movies, this.state.favoriteMovies),
            });
          }
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //This gets the user info before mounting the component
  componentWillMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken, this.state.username);
    }
  }

  updateUserData() {
    if (this.form.current.reportValidity()) {
      console.log("valid form");
      let Username = this.form.current[0].value;
      let Password = this.form.current[1].value;
      let Email = this.form.current[2].value;
      let Birthday = this.form.current[3].value;
      let updatedData = {};
      if (Username.length > 0) updatedData.Username = Username;
      if (Password.length > 0) updatedData.Password = Password;
      if (Email.length > 0) updatedData.Email = Email;
      if (Birthday.length > 0) updatedData.Birthday = Birthday;
      console.log(updatedData);

      // Axios PUT
      let authHeader = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };
      Axios.put(`https://give-me-movies.herokuapp.com/users/${this.state.username}`, updatedData, authHeader)
        .then((response) => {
          window.alert("successfully updated user data");
          let birthday = response.data.Birthday ? response.data.Birthday.slice(0, 10) : null;
          this.setState({
            username: response.data.Username,
            email: response.data.Email,
            birthday: birthday,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("invalid form");
    }
  }

  // helper function for findFavorites()
  isFavorite(movie, favoriteMovieIds) {
    console.log(movie);
    return favoriteMovieIds.indexOf(movie._id) > -1 ? true : false;
  }

  // takes in a list of movie objects and a list of ids
  // returns a list of movies matching the ids
  findFavorites(movies, favoriteMovieIds) {
    let favorites = [];
    for (let i = 0; i < movies.length; i++) {
      if (favoriteMovieIds.indexOf(movies[i]._id) > -1) {
        favorites.push(movies[i]);
      }
    }
    return favorites;
  }

  removeFromFavorites(movie_id) {
    console.log(`deleting: ${movie_id} for user: ${this.state.username}`);
    Axios.delete(`https://give-me-movies.herokuapp.com/users/${this.state.username}/movies/${movie_id}`, {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((response) => {
        this.sendUpdatedUserDataToMainView(response.data);
        this.setState(
          {
            favoriteMovies: response.data.FavoriteMovies,
          },
          () => {
            // callback determines the favorite movies after loading user data
            // and updates state again
            this.findFavorites(this.state.movies, this.state.favoriteMovies);
            this.setState({
              favoriteMovieList: this.findFavorites(this.state.movies, this.state.favoriteMovies),
            });
          }
        );
        console.log(`We deleted a movie`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  unregister() {
    console.log("unregistering");
    let reallyUnregister = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    console.log(reallyUnregister);
    if (reallyUnregister) {
      Axios.delete(`https://give-me-movies.herokuapp.com/users/${this.state.username}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      })
        .then((response) => {
          console.log("user deleted");
          localStorage.clear();
          window.location.href = "/";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="profile-view">
        <Row>
          <Col sm={12} md={7}>
            <h2>Profile</h2>
          </Col>
          <Col md={5}>
            <Link to={"/"}>
              <Button className="btn btn-secondary btn-sm genre-view__title-line__nav" type="button">
                All movies
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form className="update-info-form" ref={this.form} onSubmit={(e) => e.preventDefault()}>
              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>Username</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control placeholder={this.state.username} pattern="^[a-zA-Z0-9]{5,}$" />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>Password</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control placeholder={"new password"} />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>E-mail</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control placeholder={this.state.email} pattern=".*@.*\..*" />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row>
                  <Col>
                    <Form.Label>Date of birth</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control placeholder={this.state.birthday ? this.state.birthday : "yyyy-mm-dd"} pattern="^[0-9]{4}-[0-9]{2}-[0-9]{2}$" />
                  </Col>
                </Row>
              </Form.Group>

              <Row>
                <Col>
                  <Button className="btn btn-secondary btn-sm" variant="primary" type="submit" onClick={this.updateUserData}>
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col>
            <Button className="btn btn-secondary btn-sm" variant="danger" type="submit" onClick={this.unregister}>
              Unregister
            </Button>
          </Col>
        </Row>

        <p>My Favorite movies</p>
        <Row>
          {this.state.favoriteMovieList &&
            this.state.favoriteMovieList.map((m) => (
              <Col md={3} key={m._id}>
                <Row>
                  <MovieCard movie={m} />
                </Row>
                <Row>
                  <Button onClick={() => this.removeFromFavorites(m._id)}>remove favorite</Button>
                </Row>
              </Col>
            ))}
        </Row>
      </div>
    );
  }
}
