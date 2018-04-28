// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */
//
// import React, { Component } from 'react';
// import {
// AppRegistry,
//   Platform,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// import { StackNavigator, createDrawerNavigator } from 'react-navigation';
//
// import { styles } from './config/styles.js';
//
// import { HomeScreen } from './screens/HomeScreen.js';
// import { ForwardScreen } from './screens/ForwardScreen.js';
// import { NightModeScreen } from './screens/NightModeScreen.js';
//
// const NativePlusWebApp = createDrawerNavigator({
//   // Home: { screen: HomeScreen },
//   // Forward: { screen: ForwardScreen },
//   // NightMode: { screen: NightModeScreen }
//   Inbox: {
//       path: '/',
//       screen: HomeScreen,
//     },
//   Drafts: {
//       path: '/sent',
//       screen: ForwardScreen,
//     },
//   },
//   {
//     initialRouteName: 'Home',
//     contentOptions: {
//       activeTintColor: '#e91e63',
//     },
// });
//
// export default class App extends Component {
//   render() {
//     return(
//         <NativePlusWebApp />
//     );
//   }
// }

import React, { Component } from 'react';
import { Platform, ScrollView, StatusBar, Button, AppRegistry } from 'react-native';
import {
  StackNavigator,
  DrawerNavigator,
  SafeAreaView,
} from 'react-navigation';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import SampleText from './SampleText';
// import { Button } from './commonComponents/ButtonWithMargin';

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Button onPress={() => navigation.navigate('DrawerOpen')} title="Open drawer" />
      <Button
        onPress={() => navigation.navigate('Email')}
        title="Open other screen"
      />
      <Button onPress={() => navigation.goBack(null)} title="Go back" />
    </SafeAreaView>
    <StatusBar barStyle="default" />
  </ScrollView>
);

const InboxScreen = ({ navigation }) => (
  <MyNavScreen banner={'Inbox Screen'} navigation={navigation} />
);
InboxScreen.navigationOptions = {
  drawerLabel: 'Inbox',
};

const EmailScreen = ({ navigation }) => (
  <MyNavScreen banner={'Email Screen'} navigation={navigation} />
);

const DraftsScreen = ({ navigation }) => (
  <MyNavScreen banner={'Drafts Screen'} navigation={navigation} />
);
DraftsScreen.navigationOptions = {
  drawerLabel: 'Drafts',
};

const InboxStack = StackNavigator({
  Inbox: { screen: InboxScreen },
  Email: { screen: EmailScreen },
});

const DraftsStack = StackNavigator({
  Drafts: { screen: DraftsScreen },
  Email: { screen: EmailScreen },
});

const DrawerExample = DrawerNavigator(
  {
    Inbox: {
      path: '/',
      screen: InboxStack,
    },
    Drafts: {
      path: '/sent',
      screen: DraftsStack,
    },
  },
  {
    initialRouteName: 'Drafts',
    contentOptions: {
      activeTintColor: '#e91e63',
    },
  }
);

export default class App extends Component {
  render() {
    return(
        <DrawerExample />
    );
  }
}

AppRegistry.registerComponent('NativePlusWebApp', () => NativePlusWebApp);
