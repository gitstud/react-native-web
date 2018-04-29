import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import { Provider, connect } from 'react-redux';
import store from './store';
import Router from './Router';
import { addNavigationHelpers } from 'react-navigation';
import {
  createReduxBoundAddListener
} from 'react-navigation-redux-helpers';

const moment = require('moment');
moment().format();

// const addListener = createReduxBoundAddListener('root');

class Navigator extends Component {
  render() {
    console.log(this.props);
    return (
      <Router />
    );
  }
}

const mapStateToProps = state => ({
  navigation: state.nav,
});

// const AppWithNavigationState = connect(mapStateToProps)(Navigator);

export default class App extends Component {
  render() {
    return(
        <Provider store={store}>
          <Navigator />
        </Provider>
    );
  }
}

AppRegistry.registerComponent('App', () => App);
