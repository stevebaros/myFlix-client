import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from "react-bootstrap/Button";

import { UserData } from "./user-data";
import { UpdateUser } from "./update-user";
import { FavoriteMovies } from "./favorite-movies";

export function ProfileView(props) {
  // constant to hold the userdata loaded from the server
  const [userdata, setUserdata] = useState({});
  // constant to hold the data that the user updates through the form
  const [updatedUser, setUpdatedUser] = useState({});
  // constant to hold favorite movie list from userdata
  const [favoriteMovieList, setFavoriteMovieList] = useState([]);

  // Set default Authorization for axios requests
  let token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  /* Create function to get the user data from server, assign to userdata variable  */
  const getUserData = (cancelToken, username) => {
    axios
      .get(`https://give-me-movies.herokuapp.com/users/${username}`, {
        cancelToken: cancelToken,
      })
      .then((response) => {
        //Assign the result to the userdata
        setUserdata(response.data);
        //Set favorite movie list with values from FavoriteMovies in userdata
        setFavoriteMovieList(props.movies.filter((m) => response.data.FavoriteMovies.includes(m._id)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* Get the user data in useEffect hook */
  useEffect(() => {
    let source = axios.CancelToken.source();

    // Load user data
    if (token !== null) {
      getUserData(source.token, props.user);
    } else {
      console.log("Not authorized");
    }

    // Cleanup effect
    return () => {
      source.cancel();
    };
  }, []);

  /* Update userdata through API */
  /* TBD: Validation? */
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default submit button behaviour, i.e., don't reload the page

    // Sending request to server, if successful, update userdata
    axios
      .put(`https://give-me-movies.herokuapp.com/users/${userdata.Username}`, updatedUser)
      .then((response) => {
        // Update userdata with the new userdata from the server
        setUserdata(response.data);
        alert("Profile successfully updated");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* Function to handle the updates in the form input fields, adding to updatedUser variable which will be passed to server in handleSubmit */
  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  /* Allow users to deregister !!! TBD: ADD 'Are you sure?'-MODAL !!! */
  const deleteProfile = (e) => {
    axios
      .delete(`https://give-me-movies.herokuapp.com/users/${userdata.Username}`)
      .then((response) => {
        alert("Your profile was deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        window.open("/", "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* Function that allows users to remove a movie from their list of favorites */
  const removeFav = (id) => {
    axios
      .delete(`https://give-me-movies.herokuapp.com//users/${userdata.Username}/movies/${id}`)
      .then(() => {
        // Change state of favoriteMovieList to rerender component
        setFavoriteMovieList(favoriteMovieList.filter((movie) => movie._id != id));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      {/* Display userdata */}
      <UserData userdata={userdata} />

      {/* Form to update user data */}
      <UpdateUser userdata={userdata} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />

      {/* Button to delete user */}
      <div>
        <Button className="mb-3" variant="danger" type="submit" onClick={deleteProfile}>
          Delete Profile
        </Button>
      </div>

      {/* List of favorite movies */}
      <FavoriteMovies favoriteMovieList={favoriteMovieList} removeFav={removeFav} />

      <div>
        <Button
          variant="outline-light"
          onClick={() => {
            props.onBackClick();
          }}
        >
          Back to full list
        </Button>
      </div>
    </>
  );
}
