import React from 'react';
import {useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {Button, Text, Image} from 'react-native-elements';
import {
  StyleSheet,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  AsyncStorage,
  BackHandler,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import UserAccount from './UserAccount.js';
import HomeScreen from './Homepage.js';
import {StackNavigator} from 'react-navigation';
import {firebaseApp} from '../config/firebase';
import * as firebase from 'firebase';
import ScanQR from './ScanQR.js';
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont();
import PushNotification from 'react-native-push-notification';
import helpPage from './helpPage.js';
const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({experimentalForceLongPolling: true});

import styles from './Styles/styles';
import ViewTextKeyboard from './Components/ViewTextKeyboard.js';
import {ScreenWidth} from 'react-native-elements/dist/helpers';

const {width, height} = Dimensions.get('screen');

export default class SignUpEmail extends React.Component {
  constructor() {
    super();
  }

  createChannels = () => {
    console.log('Channel Created');
    PushNotification.createChannel({
      channelId: 'test-local-channel',
      channelName: 'Test Local Channel',
    });
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    console.log('Entered');
    this.createChannels();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.navigate('HomeScreen');
    return true;
  };

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
    hiddenPassword: true,
    hiddenConfirmPassword: true,
    errorMessage: null,
    isValidFirstName: true,
    tickValidFirstName: false,
    isValidLastName: true,
    tickValidlastName: false,
    isValidSchool: true,
    tickValidSchool: false,
    isValidCity: true,
    tickValidCity: false,
    isValidState: true,
    tickValidState: false,
    isValidZip: true,
    tickValidZip: false,
    isValidEmail: true,
    tickValidEmail: false,
    isValidPassword: true,
    tickValidPassword: false,
    isValidConfirmPassword: true,
    tickValidConfirmPassword: false,
    shouldShow: false,
  };

  /* 
    Check validity of email,password
  */

  handleEmail = text => {
    this.setState({email: text});
    this.setState({isValidEmail: true});
    this.setState({tickValidEmail: false});
  };
  handlePassword = text => {
    this.setState({password: text});
    this.setState({isValidPassword: true});
    this.setState({tickValidPassword: false});
  };
  handleConfirmPassword = text => {
    this.setState({confirmPassword: text});
    this.setState({isValidConfirmPassword: true});
    this.setState({tickValidConfirmPassword: false});
  };

  /* 
    Sending user details to the SignUp Name page
  */

  onHandleNext = async (email, pass) => {
    this.setState({error: false});
    this.setState({errorMessage: null});

    //Validation for Confirm Password
    if (pass !== this.state.confirmPassword) {
      await this.setState({isValidConfirmPassword: false});
    } else if (this.state.confirmPassword != '') {
      await this.setState({tickValidConfirmPassword: true});
    }

    if (this.state.email == '') {
      await this.setState({isValidEmail: false});
    } else {
      await this.setState({tickValidEmail: true});
    }

    if (this.state.password == '') {
      await this.setState({isValidPassword: false});
    } else {
      await this.setState({tickValidPassword: true});
    }
    if (
      this.state.tickValidEmail &&
      this.state.tickValidPassword &&
      this.state.tickValidConfirmPassword
    ) {
      this.props.navigation.navigate('SignUpName', {
        email: this.state.email,
        pass: this.state.password,
      });
    }
  };

  render() {
    return (
      <>
        <ImageBackground
          source={require('./background_image.png')}
          resizeMode="cover"
          style={styles.image}>
          <ViewTextKeyboard>
            <View style={styles.container}>
              {/* <SafeAreaView style={styles.container}>
            <KeyboardAwareScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flex: 1}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{flexGrow: 1}}
                style={styles.scrollView}>  */}
              {/* <TouchableOpacity
                  style={{width: 60, height: 60}}
                  onPress={() => this.props.navigation.navigate('HomeScreen')}>
                  <Image
                    source={require('./back-icon.png')}
                    style={{height: 50, width: 50, marginTop: 10}}
                  />
                </TouchableOpacity> */}

              <Text style={styles.toptext1}> Food at your </Text>
              <Text style={styles.toptext2}> fingertips </Text>

              <Image
                resizeMethod="auto"
                source={require('./burger.png')}
                style={styles.burgerImage}></Image>
              <Text style={styles.loginText}> Sign Up </Text>
              <View
                style={{
                  left: 0,
                  // left: 10
                }}>
                <TouchableOpacity
                  style={styles.textBox}
                  onPress={() =>
                    this.setState({
                      shouldShow: true,
                    })
                  }>
                  {/* <Text style={{color: 'red', fontSize: 20}}> * </Text> */}
                  {/* <Image
                  source={require('./email-icon.png')}
                  style={{height: 15, width: 15}}
                />
                <TextInput
                  autoCapitalize="none"
                  style={styles.emailText}
                  placeholder="Email Address"
                  placeholderTextColor="black"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChangeText={this.handleEmail}
                /> */}
                  <Image
                    source={require('./email-icon.png')}
                    style={styles.smallIcon}
                  />
                  {this.state.shouldShow ? null : (
                    <Text style={styles.emailText}> Email Address </Text>
                  )}

                  {this.state.shouldShow ? (
                    <TextInput
                      autoCapitalize="none"
                      style={styles.emailText}
                      placeholder="Email Address"
                      placeholderTextColor="rgba(0,0,0,0.7)"
                      keyboardType="email-address"
                      textContentType="emailAddress"
                      // autoFocus={true}
                      onChangeText={this.handleEmail}
                    />
                  ) : null}
                  {/* {this.state.tickValidEmail ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  ) : null} */}
                </TouchableOpacity>

                {this.state.isValidEmail ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.validateText}>
                      Please enter Email Address
                    </Text>
                  </Animatable.View>
                )}

                {this.state.errorMessage && (
                  <Text style={styles.errorText}>
                    {this.state.errorMessage}
                  </Text>
                )}
                {this.state.shouldShow ? (
                  <View>
                    <TouchableOpacity style={styles.textBox}>
                      {/* <Text style={{color: 'red', fontSize: 20}}> * </Text>
                <Image
                  source={require('./password-icon.png')}
                  style={{height: 15, width: 15}}
                />
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry={this.state.hiddenPassword}
                  style={styles.emailText}
                  placeholder="Password"
                  placeholderTextColor="black"
                  onChangeText={this.handlePassword}
                /> */}
                      <Image
                        source={require('./password-icon.png')}
                        style={styles.smallIcon}
                      />
                      <TextInput
                        autoCapitalize="none"
                        secureTextEntry={this.state.hiddenPassword}
                        style={styles.emailText}
                        placeholder="Password"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        onChangeText={this.handlePassword}
                      />

                      <TouchableOpacity
                        style={{alignItems: 'flex-end'}}
                        onPress={() =>
                          this.setState({
                            hiddenPassword: !this.state.hiddenPassword,
                          })
                        }>
                        <Image
                          source={require('./passwordshow-icon.png')}
                          style={{height: 20, width: 20}}
                        />
                        {/* {this.state.tickValidPassword ? (
                          <Animatable.View animation="bounceIn">
                            <Feather
                              name="check-circle"
                              color="green"
                              size={20}
                            />
                          </Animatable.View>
                        ) : null} */}
                      </TouchableOpacity>
                    </TouchableOpacity>

                    {this.state.isValidPassword ? null : (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.validateText}>
                          Please enter Password
                        </Text>
                      </Animatable.View>
                    )}

                    <TouchableOpacity style={styles.textBox}>
                      {/* <Text style={{color: 'red', fontSize: 20}}> * </Text>
                <Image
                  source={require('./password-icon.png')}
                  style={{height: 15, width: 15}}
                />
                <TextInput
                  autoCapitalize="none"
                  secureTextEntry={this.state.hiddenConfirmPassword}
                  style={styles.emailText}
                  placeholder="Confirm Password"
                  placeholderTextColor="black"
                  onChangeText={this.handleConfirmPassword}
                /> */}
                      <Image
                        source={require('./password-icon.png')}
                        style={styles.smallIcon}
                      />
                      <TextInput
                        autoCapitalize="none"
                        secureTextEntry={this.state.hiddenConfirmPassword}
                        style={styles.emailText}
                        placeholder="Confirm Password"
                        placeholderTextColor="rgba(0,0,0,0.7)"
                        onChangeText={this.handleConfirmPassword}
                      />
                      <TouchableOpacity
                        style={{alignItems: 'flex-end'}}
                        //style={{height: 44, width: 44}}
                        onPress={() =>
                          this.setState({
                            hiddenConfirmPassword:
                              !this.state.hiddenConfirmPassword,
                          })
                        }>
                        <Image
                          source={require('./passwordshow-icon.png')}
                          style={{height: 20, width: 20}}
                        />
                      </TouchableOpacity>
                      {/* {this.state.tickValidConfirmPassword ? (
                        <Animatable.View animation="bounceIn">
                          <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                          />
                        </Animatable.View>
                      ) : null} */}
                    </TouchableOpacity>

                    {this.state.isValidConfirmPassword ? null : (
                      <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.validateText}>
                          Password and Confirm Password are not matching
                        </Text>
                      </Animatable.View>
                    )}
                  </View>
                ) : null}
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    width: width - 74,
                    justifyContent: 'space-between',
                    left: 37,
                  }}>
                  <Text
                    onPress={() => this.props.navigation.navigate('HomeScreen')}
                    style={[styles.accountText]}>
                    {' '}
                    Previous{' '}
                  </Text>
                  <Text
                    onPress={() =>
                      this.onHandleNext(this.state.email, this.state.password)
                    }
                    style={[styles.accountText]}>
                    {' '}
                    Next{' '}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.accountText}>
                    <Text style={styles.accountText}>
                      Already have an account?
                    </Text>
                    <Text
                      onPress={() => this.props.navigation.navigate('Login')}
                      style={[styles.accountText, {color: '#8B69E5'}]}>
                      {' '}
                      Sign In{' '}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.footer}>
                <TouchableOpacity
                  style={styles.questionbutton}
                  onPress={() => this.props.navigation.navigate('helpPage')}>
                  <View>
                    <Image
                      source={require('./assests/question_mark.png')}
                      style={styles.question}
                    />
                  </View>
                </TouchableOpacity>

                <View style={styles_page.sliderdiv}>
                  <Text style={styles_page.dot}></Text>
                  <Text style={styles_page.dot2}></Text>
                  <Text style={styles_page.dot3}>{''}</Text>
                </View>
              </View>
            </View>
          </ViewTextKeyboard>
        </ImageBackground>
      </>
    );
  }
}

const styles_page = StyleSheet.create({
  dot: {
    justifyContent: 'flex-start',
    marginTop: 25,
    height: 7,
    width: 7,
    backgroundColor: '#ADA1A1',
    borderRadius: 50,
    alignContent: 'center',
    marginRight: 20,
    //left: 100,
    // display: inline-block
  },
  dot2: {
    justifyContent: 'flex-start',
    marginTop: 25,
    height: 7,
    width: 7,
    backgroundColor: '#000000',
    borderRadius: 50,
    alignContent: 'center',
    marginleft: 20,
  },
  dot3: {
    justifyContent: 'flex-start',
    marginTop: 25,
    height: 7,
    width: 7,
    backgroundColor: '#ADA1A1',
    borderRadius: 50,
    alignContent: 'center',
    marginLeft: 20,
  },
  sliderdiv: {
    flexDirection: 'row',
    left: width - 260,
  },
});
