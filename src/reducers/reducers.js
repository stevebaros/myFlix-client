import { combineReducers } from "redux";

// Import actions
import { ADD_FAVORITEMOVIE, REMOVE_FAVORITEMOVIE, SET_FAVORITEMOVIES, SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER } from "../actions/actions";

/*
 * reducer functions
 */

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log('Reached the reducer SET_MOVIES!');
      return action.value;
    default:
      return state;
  }
}

function user(state = null, action) {
  switch (action.type) {
    case SET_USER:
      console.log('Reached the reducer SET_USER!');
      return action.value;
    case UPDATE_USER:
      console.log('Reached the reducer UPDATE_USER!');
      return action.value;
    default:
      return state;
  }
}

function favoriteMovies(state = [], action) {
  switch (action.type) {
    case SET_FAVORITEMOVIES:
      console.log('Reached the reducer SET_FAVORITEMOVIES!');
      return action.value;
    case ADD_FAVORITEMOVIE:
      console.log('Reached the reducer ADD_FAVORITEMOVIES!');
      return [
        ...state, action.value
      ]
    case REMOVE_FAVORITEMOVIE:
      console.log('Reached the reducer REMOVE_FAVORITEMOVIES!');
      return state.filter(movie => movie._id != action.value._id);
    default:
      return state;
  }
}

/*
 * combined reducer
 */

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  favoriteMovies
});

export default moviesApp;