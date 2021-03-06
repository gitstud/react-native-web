import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';

export default class Splash extends Component {
  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    if (window.location) { window.location.hash = 'welcome' };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
          <ImageBackground source={require('../static/splashImage.jpeg')} style={styles.container}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.buttonCenter]}
                onPress={() => {
                  navigate('SignupGolfer');
                  if (window.location) { window.location.hash = 'dashboard' };
                }}>
                <View style={styles.golfer}>
                  <Text style={styles.whiteText}>Hello World!</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.buttonCenter]} onPress={() => navigate('SignupOrganizer')}>
                <View style={styles.organizer}>
                  <Text style={styles.whiteText}>I'm a game organizer</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.buttonCenter]} onPress={() => navigate('Login')}>
                <View style={[styles.organizer, { backgroundColor: 'black' }]}>
                  <Text style={styles.whiteText}>Login</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonContainer: {
    marginBottom: '5%',
    width: '90%',
    height: '5%'
  },
  buttonCenter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',

  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
  },
  golfer: {
    backgroundColor: '#EA3350',
    width: '90%',
    padding: 10,
    borderRadius: 50,
  },
  organizer: {
    backgroundColor: '#22212E',
    width: '90%',
    padding: 10,
    borderRadius: 50,
  }
})
