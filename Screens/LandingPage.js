// import { createStackNavigator } from "react-navigation-stack";
import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomeScreen from './Homepage';
import Login from './LoginPage';
import SignUpEmail from './SignUpEmail';
import SignUpName from './SignUpName';
// import Dots from 'react-native-dots-pagination';

/* 
    Not in use
*/
const Stack = createStackNavigator();

export default class LandingPage extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{animation: 'slide_from_left'}}
        />
        <Stack.Screen
          name="SignUpEmail"
          component={SignUpEmail}
          options={{animation: 'slide_from_left'}}
        />
        <Stack.Screen
          name="SignUpName"
          component={SignUpName}
          options={{animation: 'slide_from_left'}}
        />
      </Stack.Navigator>
    );
  }
}

// export default LandingPage;
