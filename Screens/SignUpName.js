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

const {width, height} = Dimensions.get('screen');

export default class SignUpEmail extends React.Component {
  constructor() {
    super();
  }
  // imageURI = this.props.navigation.getParam('imageURI');
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
    this.props.navigation.navigate('SignUpEmail');
    return true;
  };

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    school: '',
    city: '',
    state: '',
    zip: '',
    confirmPassword: '',
    pic: '',
    // imageURI: this.props.navigation.getParam('imageURI'),
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
  };
  /* 
    Check validity of first name and last name
  */

  handleFirstName = text => {
    this.setState({firstName: text});
    this.setState({isValidFirstName: true});
    this.setState({tickValidFirstName: false});
  };
  handleLastName = text => {
    this.setState({lastName: text});
    this.setState({isValidLastName: true});
    this.setState({tickValidLastName: false});
  };
  /* 
    Send user details to the Upload Pic page
  */
  onHandleNext = async (email, pass) => {
    this.setState({error: false});
    this.setState({errorMessage: null});

    //Validation for First Name
    if (this.state.firstName == '') {
      await this.setState({isValidFirstName: false});
    } else {
      await this.setState({tickValidFirstName: true});
    }

    //Validation for Last Name
    if (this.state.lastName == '') {
      await this.setState({isValidLastName: false});
    } else {
      await this.setState({tickValidLastName: true});
    }
    if (this.state.tickValidFirstName && this.state.tickValidLastName) {
      this.props.navigation.navigate('UploadPic', {
        email: email,
        pass: pass,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
      });
    }
  };

  render() {
    const email = this.props.navigation.getParam('email');
    const pass = this.props.navigation.getParam('pass');
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
                <TouchableOpacity style={styles.textBox}>
                  {/* <Text style={{color: 'red', fontSize: 20}}> * </Text> */}
                  {/* <Image
                  source={require('./name-icon.png')}
                  style={{height: 15, width: 15}}
                />
                <TextInput
                  //autoFocus={true}
                  autoCapitalize="none"
                  style={styles.emailText}
                  placeholder="First Name"
                  placeholderTextColor="black"
                  //onChangeText={val => textInputChange(val)}
                  onChangeText={this.handleFirstName}
                /> */}
                  <Image
                    resizeMode="contain"
                    source={require('./name-icon.png')}
                    style={styles.smallIcon}
                  />
                  <TextInput
                    autoCapitalize="none"
                    style={styles.emailText}
                    placeholder="First Name"
                    placeholderTextColor="rgba(0,0,0,0.7)"
                    onChangeText={this.handleFirstName}
                  />
                  {/* {this.state.tickValidFirstName ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  ) : null} */}
                </TouchableOpacity>

                {this.state.isValidFirstName ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.validateText}>
                      Please enter first name
                    </Text>
                  </Animatable.View>
                )}

                <TouchableOpacity style={styles.textBox}>
                  {/* <Text style={{color: 'red', fontSize: 20}}> * </Text>
                <Image
                  source={require('./name-icon.png')}
                  style={{height: 15, width: 15}}
                />
                <TextInput
                  autoCapitalize="none"
                  style={styles.emailText}
                  placeholder="Last Name"
                  placeholderTextColor="black"
                  onChangeText={this.handleLastName}
                /> */}
                  <Image
                    resizeMode="contain"
                    source={require('./name-icon.png')}
                    style={styles.smallIcon}
                  />
                  <TextInput
                    autoCapitalize="none"
                    style={styles.emailText}
                    placeholder="Last Name"
                    placeholderTextColor="rgba(0,0,0,0.7)"
                    onChangeText={this.handleLastName}
                  />
                  {/* {this.state.tickValidLastName ? (
                    <Animatable.View animation="bounceIn">
                      <Feather name="check-circle" color="green" size={20} />
                    </Animatable.View>
                  ) : null} */}
                </TouchableOpacity>

                {this.state.isValidLastName ? null : (
                  <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.validateText}>
                      Please enter Last name
                    </Text>
                  </Animatable.View>
                )}

                <TouchableOpacity
                  style={styles.textBox}
                  onPress={() => this.onHandleNext(email, pass)}>
                  <Image
                    source={require('./camera-solid.png')}
                    // style={{height: 15, width: 15}}
                    style={styles.smallIcon}
                  />
                  <Text style={styles.emailText}> Upload Picture </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    width: width - 74,
                    justifyContent: 'space-between',
                    left: 37,
                  }}>
                  <Text
                    onPress={() =>
                      this.props.navigation.navigate('SignUpEmail')
                    }
                    style={[styles.accountText]}>
                    {' '}
                    Previous{' '}
                  </Text>
                  <Text
                    onPress={() => this.onHandleNext(email, pass)}
                    style={[styles.accountText]}>
                    {' '}
                    Next{' '}
                  </Text>
                </TouchableOpacity>

                {/* <Text style={{alignItems: 'center'}}>{pass}</Text> */}

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
  //
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
    backgroundColor: '#ADA1A1',
    borderRadius: 50,
    alignContent: 'center',
    marginleft: 20,
  },
  dot3: {
    justifyContent: 'flex-start',
    marginTop: 25,
    height: 7,
    width: 7,
    backgroundColor: '#000000',
    borderRadius: 50,
    alignContent: 'center',
    marginLeft: 20,
  },
  sliderdiv: {
    flexDirection: 'row',
    left: width - 260,
  },
});
