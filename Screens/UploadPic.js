import React from 'react';
import {Button, Text, Image, ImageBackground} from 'react-native-elements';
import {View, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import UserAccount from './UserAccount.js';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import * as Animatable from 'react-native-animatable';
import {firebaseApp} from '../config/firebase';
import * as firebase from 'firebase';
import PushNotification from 'react-native-push-notification';
import SendNotification from './sendNotification.js';
import Map from './Map.js';
import PaymentOptions from './PaymentOptions.js';
import helpPage from './helpPage.js';
import notifications from './notifications.js';
import InvalidQRCode from './InvalidQRCode.js';
import {Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import {AntDesign} from '@expo/vector-icons';
import ImagePicker from 'react-native-image-crop-picker';
import {BottomSheet} from 'react-native-elements';

const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({experimentalForceLongPolling: true});

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class UploadPic extends React.Component {
  constructor() {
    super();
  }

  state = {
    image: '',
    setImage: '',
    resourcePath: '',
  };

  createChannels = () => {
    console.log('Channel Created');
    PushNotification.createChannel({
      channelId: 'test-local-channel',
      channelName: 'Test Local Channel',
    });
  };

  /* 
    Adding user info in the notifications table
  */
  addUserInfoForNotifications = async (email, fullname) => {
    console.log('Entered addUserInfoForNotifications');
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.map((result, i, store) => {
          console.log({[store[i][0]]: store[i][1]});
          return true;
        });
      });
    });

    deviceToken = await AsyncStorage.getItem('deviceToken');
    var dbRef = firestoreDb
      .collection('notifications')
      .where('email', '==', email);
    await dbRef.get().then(async querySnapshot => {
      const data = querySnapshot.docs.map(doc => doc.data());
      const key = querySnapshot.docs.map(doc => doc.id);
      const docId = Object.values(key)[0];
      if (Object.keys(data).length) {
        console.log('Document Already Exists');
        deviceInfo = {platform: Platform.OS, token: deviceToken};
        await firestoreDb
          .collection('notifications')
          .doc(docId)
          .update({
            devices: firebase.firestore.FieldValue.arrayUnion(deviceInfo),
          });
      } else {
        console.log('No Such Document Exists');
        await firestoreDb.collection('notifications').add({
          name: fullname,
          email: email,
          devices: {platform: Platform.OS, token: deviceToken},
        });
      }
      this.props.navigation.navigate('ScanQR', {text: email});
    });
    console.log('Updation Complete');
  };

  /* 
    Create account and store user details in the firebase user's table
  */

  storeUser = async (uid, email, firstName, lastName) => {
    console.log('Entered Store User');
    firestoreDb
      .collection('users')
      .doc(uid)
      .set({
        firstName: firstName,
        lastName: lastName,
        email: email,
        timestamp: Date.now(),
      })
      .then(async res => {
        await AsyncStorage.setItem('isLoggedIn', '1');
        await AsyncStorage.setItem('UserEmail', JSON.stringify(email));
        await AsyncStorage.setItem('firstName', JSON.stringify(firstName));
        await AsyncStorage.setItem('lastName', JSON.stringify(lastName));
        await this.addUserInfoForNotifications(email, firstName + lastName);
      })
      .catch(err => {
        console.error('Error found: ', err);
      });
    if (this.state.resourcePath != '') {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', this.state.resourcePath, true);
        xhr.send(null);
      });

      firebase
        .storage()
        .ref()
        .child('users/' + uid)
        .put(blob)
        .then(uri => {
          console.log(uri);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  /* 
    Creating user with email and password
  */

  onHandleSignup = async (email, pass, firstName, lastName) => {
    this.setState({error: false});
    this.setState({errorMessage: null});
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(userCredential =>
        this.storeUser(userCredential.user.uid, email, firstName, lastName),
      )
      .catch(error => this.setState({errorMessage: error.message}));
  };

  /* 
    Choose phot for profile picture
  */

  choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      this.setState({
        resourcePath: image.path,
      });
    });
  };

  /* 
    Removes profile picture when pressed remove
  */
  onHandleRemove = () => {
    this.setState({
      resourcePath: '',
    });
  };

  render() {
    const email = this.props.navigation.getParam('email');
    const pass = this.props.navigation.getParam('pass');
    const firstName = this.props.navigation.getParam('firstName');
    const lastName = this.props.navigation.getParam('lastName');
    return (
      <>
        <View style={{flex: 1}}>
          <Image
            source={require('./background_image.png')}
            style={{width: screenWidth, height: screenHeight}}>
            <View style={styles.headerView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('SignUpName')}>
                <Image
                  source={require('./new-back-icon.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <Text style={styles.header}> Upload Image </Text>
            </View>
            {this.state.resourcePath == '' ? (
              <TouchableOpacity
                onPress={this.choosePhotoFromLibrary}
                style={styles.imgContainer}>
                <Image
                  source={require('./user-icon.png')}
                  style={{
                    width: 0.25 * screenWidth,
                    height: 0.25 * screenWidth,
                    //marginTop: 0.5 * screenWidth,
                  }}
                />
              </TouchableOpacity>
            ) : (
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={this.choosePhotoFromLibrary}
                  style={styles.imgContainerNew}>
                  <Image
                    source={{uri: this.state.resourcePath}}
                    style={{
                      borderRadius: 10,
                      width: 200,
                      height: 200,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </TouchableOpacity>
              </View>
            )}

            {/* <Text style={{alignItems: 'center'}}>
              {this.state.resourcePath}
            </Text> */}

            <TouchableOpacity
              onPress={this.onHandleRemove}
              style={styles.button}>
              <Text style={styles.buttonText}>Remove Image</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.onHandleSignup(email, pass, firstName, lastName)
              }
              style={styles.button}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            {this.state.errorMessage && (
              <Text style={styles.errorText}>{this.state.errorMessage}</Text>
            )}
          </Image>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderWidth: 1,
    marginTop: 0.06 * screenHeight,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    backgroundColor: 'rgba(136, 129, 129, 0.12)',
    borderColor: 'rgba(0, 0, 0, 0.42)',
  },
  backIcon: {
    width: 0.03 * screenWidth,
    height: 16,
  },
  container: {
    marginTop: 0.06 * screenHeight,
    flex: 0.5,
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.8 * screenWidth,
    height: 80,
    backgroundColor: '#fff',
  },
  imgContainer: {
    marginTop: 0.06 * screenHeight,
    marginLeft: 0.1 * screenWidth,
    flex: 0.7,
    padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.8 * screenWidth,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#EBECF0',
  },
  imgContainerNew: {
    marginTop: 0.06 * screenHeight,
    //left: screenWidth - 200,
    //flex: 0.7,
    //padding: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: '#EBECF0',
  },
  button: {
    width: 0.6 * screenWidth,
    marginLeft: 0.2 * screenWidth,
    height: 60,
    marginTop: 20,
    flexDirection: 'column',
    backgroundColor: '#A7AEF9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    left: screenWidth / 3,
    top: 15,
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
  },
  icon: {
    height: 60,
    width: 60,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '600',
  },
});
