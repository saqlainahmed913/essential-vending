import React from 'react';
import {Button, Text, Image} from 'react-native-elements';
import {
  View,
  TextInput,
  TouchableOpacity,
  BackHandler,
  ImageBackground,
} from 'react-native';
import UserAccount from './UserAccount.js';
import Login from './LoginPage.js';
import ResetPasswordSuccess from './ResetPasswordSuccess.js';
import {StackNavigator} from 'react-navigation';
import {firebaseApp} from '../config/firebase';

import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const {width, height} = Dimensions.get('screen');
const screenHeight = Dimensions.get('window').height;

import styles from './Styles/styles';

export default class ForgotPassword extends React.Component {
  constructor() {
    super();
  }

  state = {
    email: '',
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    console.log('Entered');
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.navigate('Login');
    return true;
  };

  handleEmail = text => {
    this.setState({email: text});
  };

  HandleForgotPassword = email => {
    this.setState({error: false});
    firebaseApp
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => this.props.navigation.navigate('ResetPasswordSuccess'))
      .catch(error => this.setState({errorMessage: error.message}));
  };

  render() {
    return (
      <>
        <ImageBackground
          source={require('./background_image.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={{flex: 1}}>
            {/* <TouchableOpacity onPress={()=> this.props.navigation.navigate('Login')} >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:20}}/>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('./back-icon.png')}
                style={{height: 30, width: 30, left: 40, marginTop: 50}}
              />
            </TouchableOpacity>

            <Text
              style={
                styles.forgotTitleText
                //   fontSize: 30,
                //   color: 'white',
                //   fontWeight: 'bold',
                //   textAlign: 'center',
                //   marginTop: 100,
              }>
              {' '}
              Forgot Your Password?{' '}
            </Text>

            <Text
              style={{
                fontSize: 20,
                color: 'black',
                textAlign: 'center',
                // marginTop: 10,
                paddingRight: 10,
                paddingLeft: 10,
              }}>
              {' '}
              Dont Worry! Just fill in your email and we will send you a link to
              reset your password.{' '}
            </Text>

            <TouchableOpacity style={[styles.textBox, {marginTop: 50}]}>
              <Image
                source={require('./email-icon.png')}
                style={styles.smallIcon}
              />
              <TextInput
                autoCapitalize="none"
                style={styles.emailText}
                placeholder="Email Address"
                placeholderTextColor="rgba(0,0,0,0.7)"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={this.handleEmail}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.resetpasswordButton}
              onPress={() => this.HandleForgotPassword(this.state.email)}>
              <Text style={styles.loginButtonText}> RESET PASSWORD </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 15,
                  top: 730,
                  left: screenWidth - 100,
                  textAlign: 'justify',
                  fontWeight: 'normal',
                  color: '#8359E3',
                }}
                onPress={() => this.props.navigation.goBack()}>
                {' '}
                Back{' '}
              </Text>
            </TouchableOpacity>

            {this.state.errorMessage && (
              <Text
                style={{
                  color: '#ff0000',
                  fontSize: 18,
                  textAlign: 'center',
                  marginTop: 20,
                  fontWeight: '600',
                }}>
                {this.state.errorMessage}
              </Text>
            )}
          </View>
        </ImageBackground>
      </>
    );
  }
}
