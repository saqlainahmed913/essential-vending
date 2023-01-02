import React, {useEffect} from 'react';
import {Button, Text, Image} from 'react-native-elements';
import {
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Dimensions,
  BackHandler,
  ImageBackground,
  LogBox,
} from 'react-native';
import UserAccount from './UserAccount.js';
import {StackNavigator} from 'react-navigation';
import HomeScreen from './Homepage.js';
import ForgotPassword from './ForgotPassword.js';
import ScanQR from './ScanQR.js';
import {firebaseApp} from '../config/firebase';
import * as firebase from 'firebase';
import PushNotification from 'react-native-push-notification';
const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({experimentalForceLongPolling: true});
import helpPage from './helpPage.js';
import GoogleSignIn from './GoogleSignIn';
LogBox.ignoreAllLogs();
const {width, height} = Dimensions.get('screen');
import styles from './Styles/styles';
import ViewTextKeyboard from './Components/ViewTextKeyboard.js';

export default class Login extends React.Component {
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
    console.log('Entered');
    this.createChannels();
  }

  state = {
    email: '',
    password: '',
    hiddenPassword: true,
    errorMessage: null,
  };

  handleEmail = text => {
    this.setState({email: text});
  };

  handlePassword = text => {
    this.setState({password: text});
  };

  addUserInfoForNotifications = async (email, fullname) => {
    deviceToken = await AsyncStorage.getItem('deviceToken');
    console.log('Device Token found ' + deviceToken);
    var dbRef = firestoreDb
      .collection('notifications')
      .where('email', '==', email);
    await dbRef.get().then(async querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      const key = querySnapshot.docs.map(doc => doc.id);
      const docId = Object.values(key)[0];
      if (Object.keys(data).length) {
        console.log('Document Already Exists');
        var deviceInfo = {platform: Platform.OS, token: deviceToken};
        var currentDeviceInfo = data[0].devices;
        console.log(typeof currentDeviceInfo);
        console.log('Updated' + JSON.stringify(currentDeviceInfo));
        currentDeviceInfo.push(deviceInfo);
        console.log('Updated' + JSON.stringify(currentDeviceInfo));
        await firestoreDb.collection('notifications').doc(docId).update({
          devices: currentDeviceInfo,
        });
      } else {
        console.log('No Such Document Exists');
        await firestoreDb.collection('notifications').add({
          name: fullname,
          email: email,
          devices: {platform: Platform.OS, token: deviceToken},
        });
      }
    });
    console.log('Updation Complete');
  };

  handleSignIn = (email, pass) => {
    this.setState({error: false});
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then(async () => {
        await AsyncStorage.setItem('isLoggedIn', '1');
        await AsyncStorage.setItem('UserEmail', email);
        var response = firestoreDb
          .collection('users')
          .where('email', '==', this.state.email)
          .get()
          .then(async querySnapshot => {
            const data = querySnapshot.docs.map(doc => doc.data());
            res = data[0];
            console.log(JSON.stringify(res));
            await AsyncStorage.setItem('firstName', res.firstName);
            await AsyncStorage.setItem('lastName', res.lastName);
            this.addUserInfoForNotifications(
              this.state.email,
              this.state.firstName + this.state.lastName,
            );
            this.props.navigation.navigate('ScanQR', {text: email});
          });
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    this.props.navigation.navigate('HomeScreen');
    return true;
  };

  /*
    Add the user in the users table if a new user, otherwise on successful login 
    redirect to ScanQR page
  */
  handleGoogleSignIn = payload => {
    var data;
    firestoreDb
      .collection('users')
      .where('email', '==', payload.email)
      .get()
      .then(querySnapshot => {
        data = querySnapshot.docs.map(doc => doc.data());
        if (data && data.length == 0) {
          firestoreDb
            .collection('users')
            .doc(payload.uid)
            .set({
              firstName: payload.firstName,
              lastName: payload.lastName,
              email: payload.email,
              timestamp: payload.timestamp,
            })
            .catch(err => {
              console.error('Error found: ', err);
            });
        }
        this.addUserInfoForNotifications(
          payload.email,
          payload.firstName + payload.lastName,
        );
        this.setState({
          email: payload.email,
        });
        this.props.navigation.navigate('ScanQR', {text: payload.email});
      });
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
              {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Image
              source={require('./back-icon.png')}
              style={{height: 50, width: 50, marginTop: 70, left: 20}}
            />
          </TouchableOpacity> */}

              <Text style={styles.toptext1}> Food at your </Text>
              <Text style={styles.toptext2}> fingertips </Text>

              <Image
                resizeMethod="auto"
                source={require('./burger.png')}
                style={styles.burgerImage}></Image>

              <Text style={styles.loginText}> Login </Text>

              <TouchableOpacity style={styles.textBox}>
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

              <TouchableOpacity style={styles.textBox}>
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
                  onPress={() =>
                    this.setState({
                      hiddenPassword: !this.state.hiddenPassword,
                    })
                  }
                  style={{alignItems: 'flex-end'}}>
                  <Image
                    source={require('./passwordshow-icon.png')}
                    style={{height: 20, width: 20}}
                  />
                </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ForgotPassword')
                }>
                <Text
                  style={
                    styles.forgotText
                    // fontSize: 20,
                    // color: 'white',
                    // fontWeight: 'bold',
                    // textAlign: 'right',
                    // marginTop: 40,
                    // paddingRight: 30,
                  }>
                  {' '}
                  Forgot Password?{' '}
                </Text>
              </TouchableOpacity>

              {/* <View styles={{flex: 1, flexDirection: 'row', marginTop: 20}}> */}
              <TouchableOpacity
                style={styles.loginbutton}
                onPress={() =>
                  this.handleSignIn(this.state.email, this.state.password)
                }>
                <Text style={styles.loginButtonText}> Login </Text>
              </TouchableOpacity>
              <GoogleSignIn
                styles={{
                  width: width - 50,
                  left: 25,
                  height: 55,
                  marginTop: 10,
                  borderRadius: 10,
                }}
                handleGoogleSignIn={this.handleGoogleSignIn}
              />

              {/* <TouchableOpacity
                style={styles.appleButton}
                onPress={() =>
                  this.handleSignIn(this.state.email, this.state.password)
                }>
                <Text style={styles.loginButtonText}> Apple </Text>
              </TouchableOpacity> */}
              {/* </View> */}

              {this.state.errorMessage && (
                <Text
                  style={{
                    color: '#ff0000',
                    fontSize: 18,
                    textAlign: 'center',
                    marginTop: 10,
                    fontWeight: '600',
                  }}>
                  {this.state.errorMessage}
                </Text>
              )}

              <TouchableOpacity
                style={{width: 30, left: 8.33}}
                onPress={() => this.props.navigation.navigate('helpPage')}>
                <Image
                  source={require('./circle-question-solid.png')}
                  style={styles.helpIcon}
                />
              </TouchableOpacity>
            </View>
          </ViewTextKeyboard>
        </ImageBackground>
      </>
    );
  }
}
