import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class Drawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>FYR LOGO</Text>
        <Text>Menu</Text>
        <Text>Games</Text>
        <Text>Golfers</Text>
        <Text>Messages</Text>
        <Text>Profile</Text>
        <Text>Other Logo</Text>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  auth: state.auth,
  golfer: state.golfer,
});

// const mapDispatchToProps = dispatch => bindActionCreators({
// }, dispatch);

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(Drawer);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
})
