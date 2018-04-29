import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
} from 'react-native';

class SignupGolfer extends Component {
  render() {
    return (
      <View><Text>Home Page</Text></View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  golfer: state.golfer,
});

// const mapDispatchToProps = dispatch => bindActionCreators({
//
// }, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(SignupGolfer);
