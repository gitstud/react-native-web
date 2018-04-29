import React from 'react';
import { DrawerNavigator } from 'react-navigation';
import Drawer from './containers/Drawer';

import Splash from './components/Splash';
import SignupGolfer from './containers/SignupGolfer';

import Home from './containers/Home';

const Router = DrawerNavigator(
  {
    Splash: { screen: Splash },
    SignupGolfer: { screen: SignupGolfer },
    Home: { screen: Home },
  }, {
    drawerPosition: 'right',
    contentComponent: props => <Drawer {...props} />
  }
);

export default Router;
