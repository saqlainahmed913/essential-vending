import React from 'react';
import {Button, Text, Image} from 'react-native-elements';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import UserAccount from './UserAccount.js';
import {StackNavigator} from 'react-navigation';
import {firebaseApp} from '../config/firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({experimentalForceLongPolling: true});
import helpPage from './helpPage.js';
import {Dimensions} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const screenWidth = Dimensions.get('window').width;
const {width, height} = Dimensions.get('screen');
const screenHeight = Dimensions.get('window').height;
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export default class EditProfile extends React.Component {
  constructor() {
    super();
  }

  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    school: '',
    city: '',
    state: '',
    zip: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    passwordChangeNeeded: false,
    errorMessage: '',
    successMessage: '',
    resourcePath: '',
    refURL: '',
    hiddenCurrentPassword: true,
    hiddenNewPassword: true,
    hiddenConfirmNewPassword: true,
  };
  /* 
    Fetch current user data
  */

  fetchUserData = () => {
    console.log('Entered');
    const response = firestoreDb
      .collection('users')
      .where('email', '==', this.state.email)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        res = data[0];
        // alert(res);
        this.setState({firstName: res.firstName});
        this.setState({lastName: res.lastName});
      });
  };

  handleEmail = text => {
    this.setState({email: text});
  };
  handlePassword = text => {
    this.setState({password: text});
    this.setState({passwordChangeNeeded: true});
  };
  handleFirstName = text => {
    this.setState({firstName: text});
  };
  handleLastName = text => {
    this.setState({lastName: text});
  };

  handleCurrentPassword = text => {
    this.setState({currentPassword: text});
    this.setState({passwordChangeNeeded: true});
  };

  handleNewPassword = text => {
    this.setState({newPassword: text});
  };
  handleConfirmNewPassword = text => {
    this.setState({confirmNewPassword: text});
    this.setState({passwordChangeNeeded: true});
  };

  reauthenticate = password => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(user.email, password);
    return user.reauthenticateWithCredential(cred);
  };

  /* 
    Change current user's assword if entered
  */

  changePassword = user => {
    this.setState({error: false});
    alert('Entered');
    this.reauthenticate(this.state.currentPassword)
      .then(() => {
        alert('yay!');
        firebase
          .auth()
          .currentUser.updatePassword(this.state.newPassword)
          .then(() => {
            this.setState({successMessage: 'Changes saved successfully!'});
            this.timeoutHandle = setTimeout(() => {
              this.props.navigation.navigate('UserAccount');
            }, 1000);
          })
          .catch(error => this.setState({errorMessage: error.message}));
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };

  /* 
    Get google user's uid
  */

  getGoogleSignInCred = async () => {
    var uid;
    var userInfo = await GoogleSignin.getCurrentUser();
    const googleCredential = auth.GoogleAuthProvider.credential(
      userInfo.idToken,
    );
    const userProfile = await auth().signInWithCredential(googleCredential);
    uid = userProfile.user.uid;
    return uid;
  };

  /* 
    Update changes in the users table in firebase
  */

  updateChanges = async () => {
    this.setState({error: false});

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
      var user = firebase.auth().currentUser;
      var uid;
      if (!user) {
        uid = await this.getGoogleSignInCred();
      } else {
        uid = user.uid;
      }

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
    } else {
      var user = firebase.auth().currentUser;
      var uid;
      if (!user) {
        uid = await this.getGoogleSignInCred();
      } else {
        uid = user.uid;
      }
      if (this.state.refURL != '') {
        let imageRef = firebase.storage().ref('users/' + uid);
        imageRef
          .delete()
          .then(function () {
            console.log('File deleted successfully');
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }

    if (this.state.firstName == '') {
      this.setState({errorMessage: 'Please enter your first name'});
    } else if (this.state.lastName == '') {
      this.setState({errorMessage: 'Please enter your last name'});
    } else {
      if (this.state.passwordChangeNeeded == true) {
        if (this.state.currentPassword == '') {
          this.setState({errorMessage: 'Please enter the current Password'});
        } else if (this.state.newPassword == '') {
          this.setState({errorMessage: 'Please enter the new Password'});
        } else if (this.state.confirmNewPassword == '') {
          this.setState({errorMessage: 'Please confirm the new Password'});
        } else if (this.state.newPassword !== this.state.confirmNewPassword) {
          this.setState({errorMessage: 'Passwords does not match'});
        } else {
          var user = firebase.auth().currentUser;
          var uid;
          if (!user) {
            uid = await this.getGoogleSignInCred();
          } else {
            uid = user.uid;
          }

          firestoreDb
            .collection('users')
            .doc(uid)
            .update({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              email: this.state.email,
            })
            .then(() => {
              if (this.state.passwordChangeNeeded == true) {
                this.changePassword();
              }
            });
        }
      } else {
        var user = firebase.auth().currentUser;
        var uid;
        if (!user) {
          uid = await this.getGoogleSignInCred();
        } else {
          uid = user.uid;
        }

        firestoreDb
          .collection('users')
          .doc(uid)
          .update({
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
          })
          .then(() => {
            this.setState({successMessage: 'Changes saved successfully!'});
            this.timeoutHandle = setTimeout(() => {
              this.props.navigation.navigate('UserAccount');
            }, 1000);
          });
      }
    }
  };

  /* 
    Get profile photo from firebase
  */

  async componentDidMount() {
    this.fetchUserData();
    var user = firebase.auth().currentUser;
    var uid;
    if (!user) {
      uid = await this.getGoogleSignInCred();
    } else {
      uid = user.uid;
    }
    let imageRef = firebase.storage().ref('users/' + uid);
    imageRef
      .getDownloadURL()
      .then(url => {
        //from url you can fetched the uploaded image easily
        console.log(url);
        this.setState({resourcePath: url});
        this.setState({refURL: url});
      })
      .catch(e => console.log('getting downloadURL of image error => ', e));
  }

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

  onHandleRemove = () => {
    this.setState({
      resourcePath: '',
    });
  };

  render() {
    const email = this.props.navigation.getParam('text');
    this.state.email = email;
    return (
      <>
        <View style={{flex: 1}}>
          <ImageBackground
            source={require('./background_image.png')}
            resizeMode="cover"
            style={styles.image}>
            {/* <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flex: 1}}> */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              style={styles.scrollView}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 15,
                  paddingRight: 10,
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(167,174,249,0.5)',
                    borderRadius: 5,
                    alignItems: 'center',
                    width: (screenWidth - 220) / 2,
                    left: 0,
                    marginTop: 60,
                    height: 30,
                  }}
                  onPress={() => this.props.navigation.navigate('UserAccount')}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      fontStyle: 'underlined',
                      color: 'black',
                      top: 10,
                    }}>
                    {' '}
                    Back{' '}
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('UserAccount')}>
                  <Image
                    source={require('./cross-icon.png')}
                    style={{height: 50, width: 50, marginTop: 60}}
                  />
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={{
                    backgroundColor: 'rgba(167,174,249,0.5)',
                    borderRadius: 5,
                    alignItems: 'center',
                    width: (screenWidth - 220) / 2,
                    right: 20,
                    marginTop: 60,
                    height: 30,
                  }}
                  onPress={() => this.updateChanges()}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: 'bold',
                      fontStyle: 'underlined',
                      color: 'black',
                      top: 10,
                    }}>
                    {' '}
                    Save{' '}
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => this.updateChanges()}>
                  <Image
                    source={require('./tick-icon.png')}
                    style={{height: 50, width: 50, marginTop: 60}}
                  />
                </TouchableOpacity> */}
              </View>

              <Text
                style={{
                  fontSize: 30,
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                  marginBottom: 20,
                }}>
                {' '}
                Edit Profile{' '}
              </Text>

              <View>
                {this.state.resourcePath == '' ? (
                  <TouchableOpacity
                    onPress={this.choosePhotoFromLibrary}
                    style={styles.imgContainer}>
                    <Image
                      source={require('./user-icon.png')}
                      style={{
                        width: 0.1 * screenWidth,
                        height: 0.1 * screenWidth,
                        marginTop: 20,
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
              </View>
              <TouchableOpacity
                onPress={this.onHandleRemove}
                style={styles.button}>
                <Text style={styles.buttonText}>Remove Profile Picture</Text>
              </TouchableOpacity>
              <View style={{left: 5}}>
                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    elevation: 0,
                    backgroundColor: 'rgba(0,0,0,0.07)',
                    borderRadius: 10,
                    alignItems: 'center',
                    //padding: 8,
                    width: 0.85 * screenWidth,
                    height: 50,
                    left: 0,
                  }}>
                  <Image
                    source={require('./name-icon.png')}
                    style={{height: 20, width: 20}}
                  />
                  <TextInput
                    value={this.state.firstName}
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      color: 'black',
                    }}
                    placeholder="  First Name"
                    placeholderTextColor="rgba(0,0,0,0.7)"
                    onChangeText={this.handleFirstName}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    elevation: 0,
                    backgroundColor: 'rgba(0,0,0,0.07)',
                    borderRadius: 10,
                    alignItems: 'center',
                    //padding: 8,
                    width: 0.85 * screenWidth,
                    height: 50,
                    left: 0,
                  }}>
                  <Image
                    source={require('./name-icon.png')}
                    style={{height: 20, width: 20}}
                  />
                  <TextInput
                    value={this.state.lastName}
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      color: 'black',
                    }}
                    onChangeText={this.handleLastName}
                    placeholder="  Last Name"
                    placeholderTextColor="rgba(0,0,0,0.7)"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    elevation: 0,
                    backgroundColor: 'rgba(0,0,0,0.07)',
                    borderRadius: 10,
                    alignItems: 'center',
                    //padding: 8,
                    width: 0.85 * screenWidth,
                    height: 50,
                    left: 0,
                  }}
                  onPress={() => {
                    alert('You cannot edit the email address');
                  }}>
                  <Image
                    source={require('./email-icon.png')}
                    style={{height: 20, width: 20}}
                  />
                  <TextInput
                    editable={false}
                    value={this.state.email}
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                      color: 'black',
                    }}
                    onChangeText={this.handleEmail}
                    placeholder="  Email Address"
                    placeholderTextColor="rgba(0,0,0,0.7)"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    elevation: 0,
                    backgroundColor: 'rgba(0,0,0,0.07)',
                    borderRadius: 10,
                    alignItems: 'center',
                    //padding: 8,
                    width: 0.85 * screenWidth,
                    height: 50,
                    left: 0,
                  }}>
                  <Image
                    source={require('./password-icon.png')}
                    style={{height: 20, width: 20}}
                  />
                  <TextInput
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                    }}
                    secureTextEntry={this.state.hiddenCurrentPassword}
                    onChangeText={this.handleCurrentPassword}
                    placeholder="  Current Password"
                    placeholderTextColor="rgba(0,0,0,0.7)"
                  />
                  <TouchableOpacity
                    style={{alignItems: 'flex-end'}}
                    onPress={() =>
                      this.setState({
                        hiddenCurrentPassword:
                          !this.state.hiddenCurrentPassword,
                      })
                    }>
                    <Image
                      source={require('./passwordshow-icon.png')}
                      style={{height: 15, width: 15}}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    elevation: 0,
                    backgroundColor: 'rgba(0,0,0,0.07)',
                    borderRadius: 10,
                    alignItems: 'center',
                    //padding: 8,
                    width: 0.85 * screenWidth,
                    height: 50,
                    left: 0,
                  }}>
                  <Image
                    source={require('./password-icon.png')}
                    style={{height: 20, width: 20}}
                  />
                  <TextInput
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                    }}
                    secureTextEntry={this.state.hiddenNewPassword}
                    onChangeText={this.handleNewPassword}
                    placeholder="  New Password"
                    placeholderTextColor="rgba(0,0,0,0.7)"
                  />
                  <TouchableOpacity
                    style={{alignItems: 'flex-end'}}
                    onPress={() =>
                      this.setState({
                        hiddenNewPassword: !this.state.hiddenNewPassword,
                      })
                    }>
                    <Image
                      source={require('./passwordshow-icon.png')}
                      style={{height: 15, width: 15}}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    elevation: 0,
                    backgroundColor: 'rgba(0,0,0,0.07)',
                    borderRadius: 10,
                    alignItems: 'center',
                    //padding: 8,
                    width: 0.85 * screenWidth,
                    height: 50,
                    left: 0,
                  }}>
                  <Image
                    source={require('./password-icon.png')}
                    style={{height: 20, width: 20}}
                  />
                  <TextInput
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '700',
                    }}
                    secureTextEntry={this.state.handleConfirmNewPassword}
                    onChangeText={this.handleConfirmNewPassword}
                    placeholder="  Confirm New Password"
                    placeholderTextColor="rgba(0,0,0,0.7)"
                  />
                  <TouchableOpacity
                    style={{alignItems: 'flex-end'}}
                    onPress={() =>
                      this.setState({
                        handleConfirmNewPassword:
                          !this.state.handleConfirmNewPassword,
                      })
                    }>
                    <Image
                      source={require('./passwordshow-icon.png')}
                      style={{height: 15, width: 15}}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>

                {this.state.errorMessage != '' && (
                  <Text
                    style={{
                      color: '#ff0000',
                      fontSize: 18,
                      textAlign: 'center',
                      fontWeight: '600',
                    }}>
                    {' '}
                    {this.state.errorMessage}{' '}
                  </Text>
                )}

                {this.state.successMessage != '' && (
                  <Text
                    style={{
                      color: '#57f416',
                      fontSize: 18,
                      textAlign: 'center',
                      fontWeight: '600',
                    }}>
                    {' '}
                    {this.state.successMessage}{' '}
                  </Text>
                )}
              </View>
            </ScrollView>
            {/* </KeyboardAwareScrollView> */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 0,
                width: screenWidth - 50,
                left: 25,
                right: 25,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('helpPage')}
                style={{left: 20, width: (screenWidth - 220) / 3}}>
                <Image
                  source={require('./circle-question-solid.png')}
                  style={styles.helpIcon}
                />
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('helpPage');
              }}>
              <Image
                source={require('./help-icon.png')}
                style={{height: 60, width: 60, left: 20, marginTop: 30}}
              />
            </TouchableOpacity> */}
          </ImageBackground>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    marginHorizontal: 30,
    flexGrow: 1.5,
  },
  helpIcon: {
    height: 20,
    width: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    width: 0.85 * screenWidth,
    marginLeft: 5,
    height: 40,
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#A7AEF9',
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 12,
  },
  buttonText: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
  },
  imgContainer: {
    marginTop: 10,
    marginLeft: 5,
    flex: 0.7,
    padding: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 0.85 * screenWidth,
    height: 0.85 * screenWidth,
    backgroundColor: '#EBECF0',
  },
  image: {
    justifyContent: 'center',
    width: '110%',
    height: '100%',
    // flex:
  },
});
