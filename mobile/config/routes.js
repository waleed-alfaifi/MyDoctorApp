import React from 'react';
import {
  createAppContainer,
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';

import Drawer from '../components/Drawer';

// Screens
import HomeScreen from '../screens/Home';
import DoctorsScreen from '../screens/Doctors';
import SignUpScreen from '../screens/SignUp';
import SignInScreen from '../screens/SignIn';
import ProfileScreen from '../screens/Profile';

// const AppNavigator = createDrawerNavigator(
//   {
//     Home: { screen: HomeScreen },
//     Doctors: { screen: DoctorsScreen },
//   },
//   {
//     contentOptions: {
//       itemStyle: {
//         flexDirection: 'row-reverse',
//       },
//       labelStyle: {
//         fontSize: 18,
//       },
//       activeTintColor: '#fff',
//       activeBackgroundColor: '#007bff',
//     },
//     drawerBackgroundColor: '#fff',
//     drawerPosition: 'right',
//   }
// );

// export default createAppContainer(AppNavigator);

//** instructor code **//

const DoctorsStack = createStackNavigator(
  {
    DoctorsScreen: {
      screen: DoctorsScreen,
    },
  },
  {
    headerMode: 'none',
  }
);

// Pass only the screens that need to have a drawer navigation.
const DrawerNavigation = createDrawerNavigator(
  {
    Doctors: {
      screen: DoctorsStack,
      navigationOptions: {
        title: 'الأطباء',
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        title: 'الملف الشخصي',
      },
    },
  },
  {
    contentOptions: {
      itemStyle: {
        flexDirection: 'row-reverse',
      },
      labelStyle: {
        fontSize: 15,
      },
      activeTintColor: '#fff',
      activeBackgroundColor: '#007bff',
    },
    hideStatusBar: true,
    drawerBackgroundColor: '#fff',
    drawerPosition: 'right',
    contentComponent: props => {
      return <Drawer drawerProps={props} />;
    },
  }
);

export default createAppContainer(
  createStackNavigator(
    {
      Main: HomeScreen,
      SignUp: SignUpScreen,
      SignIn: SignInScreen,
      DrawerNav: DrawerNavigation,
    },
    {
      headerMode: 'none',
    }
  )
);
