import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

import "./favorite-button.scss";

export class FavoriteButton extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isFavorite: props.isFavorite,
    };
    this.clickAdd = this.clickAdd.bind(this);
    this.clickRemove = this.clickRemove.bind(this);
    this.removeFromFavorites = props.removeFromFavorites;
    this.addToFavorites = props.addToFavorites;
  }

  // When the user clicks the star, the movie should be removed from the user's favorite list
  // and the star should become empty
  clickRemove() {
    this.removeFromFavorites();
    console.log(`Removed from favorites`);
    this.setState({
      isFavorite: false,
    });
  }

  // When the user clicks the star, the movie should be added to the user's favorite list
  // and the star should become empty
  // This does not work properly for an unknown reason
  clickAdd() {
    this.addToFavorites();
    console.log(`Added to favorites`);
    this.setState({
      isFavorite: true,
    });
  }

  render() {
    const { isFavorite } = this.state;
    return isFavorite ? (
      <Button id="favorite-button" onClick={this.clickRemove}>
        &#9733;
      </Button>
    ) : (
      <Button id="favorite-button" onClick={this.clickAdd}>
        &#9734;
      </Button>
    );
  }
}

// prop-types
// Give informational warnings in browser if data does not match required shape
FavoriteButton.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
  removeFromFavorites: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
};
