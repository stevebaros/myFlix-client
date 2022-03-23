
import React from 'react';
import ReactDOM from 'react-dom';
import { MainView } from './components/main-view/main-view';
// Import statement indicating that we need to bundle `./index.scss`
import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);