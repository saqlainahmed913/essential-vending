import React from 'react';
import {Button, Text, Image} from 'react-native-elements';
import {View, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import UserAccount from './UserAccount.js';
import Login from './LoginPage.js';
import {StackNavigator} from 'react-navigation';
import styles from './Styles/styles.js';

export default class ResetPasswordSuccess extends React.Component {
  render() {
    return (
      <>
        <ImageBackground
          source={require('./background_image.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{alignItems: 'flex-end', paddingRight: 20}}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text
                style={{
                  height: 50,
                  width: 50,
                  marginTop: 40,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {' '}
                Done{' '}
              </Text>
            </TouchableOpacity>

            <View style={{alignItems: 'center'}}>
              <Image
                source={require('./circle-check-solid.png')}
                style={{
                  height: 200,
                  width: 200,
                  marginTop: 60,
                }}
              />
            </View>

            <Text
              style={
                styles.forgotTitleText
                //   fontSize: 30,
                //   color: 'white',
                //   fontWeight: '300',
                //   textAlign: 'center',
                //   marginTop: 40,
              }>
              {' '}
              Password Reset Email Sent{' '}
            </Text>

            <Text
              style={{
                fontSize: 20,
                color: 'black',
                textAlign: 'center',
                marginTop: 20,
                paddingRight: 10,
                paddingLeft: 10,
              }}>
              {' '}
              An email has been sent to the email address provided. Follow the
              instructions in the email to reset your password. If you haven't
              received the email, try waiting for few minutes or check your spam
              folder.{' '}
            </Text>
          </View>
        </ImageBackground>
      </>
    );
  }
}
