import React from 'react';
import {Text, Image} from 'react-native-elements';
import {
  View,
  Button,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import HomeScreen from './Homepage.js';
import EditProfile from './EditProfile.js';
import Receipts from './Receipts.js';
import ScanQR from './ScanQR.js';
import Map from './Map.js';
import helpPage from './helpPage.js';
import notifications from './notifications.js';
import {Dimensions} from 'react-native';
import {firebaseApp} from '../config/firebase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      resourcePath: '',
    };
  }

  handleLogOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('HomeScreen');
  };

  handleEmptyEmail = async () => {
    let user = await AsyncStorage.getItem('UserEmail');
    // user = user.slice(1, -1);
    if (user.startsWith('"')) {
      user = user.slice(1, -1);
    }
    this.setState({email: user});
  };

  /* 
        Showing profile picture and extracting user data
  */

  async componentDidMount() {
    const text = this.props.navigation.getParam('text');
    this.setState({email: text});
    if (text == undefined) {
      this.handleEmptyEmail();
    }
    var user = firebase.auth().currentUser;
    var uid;
    if (!user) {
      var userInfo = await GoogleSignin.getCurrentUser();
      const googleCredential = auth.GoogleAuthProvider.credential(
        userInfo.idToken,
      );
      const userProfile = await auth().signInWithCredential(googleCredential);
      uid = userProfile.user.uid;
    } else {
      uid = user.uid;
    }
    var imageRef = firebase.storage().ref('users/' + uid);
    imageRef
      .getDownloadURL()
      .then(url => {
        //from url you can fetched the uploaded image easily
        console.log(url);
        this.setState({resourcePath: url});
      })
      .catch(e => console.log('getting downloadURL of image error => ', e));
  }

  render() {
    return (
      <>
        <View style={{flex: 1}}>
          <ImageBackground
            source={require('./background_image.png')}
            resizeMode="cover"
            style={styles.image}>
            <View style={{paddingLeft: 15, paddingRight: 10}}>
              {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
            <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70}}/>
            </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('notifications')}>
                <Image
                  source={require('./notification-icon.png')}
                  style={{height: 30, width: 30, marginTop: 100}}
                />
              </TouchableOpacity>
            </View>

            {this.state.resourcePath == '' ? (
              <Image
                source={require('./user-icon.png')}
                style={{height: 200, width: 200, left: 100, marginTop: 30}}
              />
            ) : (
              <View
                style={{
                  borderRadius: 50,
                  width: screenWidth - 200,
                  height: 200,
                  left: 100,
                  marginTop: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: this.state.resourcePath}}
                  style={{
                    width: screenWidth - 200,
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                />
              </View>
            )}

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 100,
                paddingRight: 120,
                paddingTop: 20,
              }}
              onPress={() =>
                this.props.navigation.navigate('EditProfile', {
                  text: this.state.email,
                })
              }>
              <Text style={{fontSize: 18, textAlign: 'center'}}>
                {this.state.email}
              </Text>
              <Image
                source={require('./edit-icon.png')}
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('EditProfile', {
                  text: this.state.email,
                })
              }
              style={styles.button}>
              <Text style={styles.text}> Edit Profile </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: screenWidth - 50,
                left: 25,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  borderRadius: 5,
                  alignItems: 'center',
                  width: (screenWidth - 60) / 2,
                  left: 0,
                  marginTop: 20,
                  height: 44,
                }}
                onPress={() =>
                  this.props.navigation.navigate('Receipts', {
                    text: this.state.email,
                  })
                }>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'black',
                    top: 10,
                  }}>
                  {' '}
                  RECEIPTS{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  borderRadius: 5,
                  alignItems: 'center',
                  width: (screenWidth - 60) / 2,
                  left: 0,
                  marginTop: 20,
                  height: 44,
                  paddingLeft: (screenWidth - 60) / 2 / 5,
                }}
                onPress={() => this.handleLogOut()}>
                <Image
                  source={require('./logout-icon.png')}
                  style={{height: 30, width: 30}}
                />
                <Text
                  style={{fontSize: 18, fontWeight: 'bold', color: 'black'}}>
                  {' '}
                  LOGOUT{' '}
                </Text>
                {/* <Text style={{width:75,height:22.75,fontSize:16, top:6, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Locate Machines </Text> */}
              </TouchableOpacity>
            </View>
            {/* 
            <TouchableOpacity style={{backgroundColor:"white", padding:8, borderRadius:10,  alignItems:"center",width:150, height:45, left:120, marginTop:50}} onPress={()=> this.props.navigation.navigate('Receipts', {text: this.state.email})}>
            <Text style={{fontSize:22, fontWeight:"bold", color:"black"}}> RECEIPTS </Text>
            </TouchableOpacity> */}
            {/* 
            <TouchableOpacity style={{flexDirection:"row", backgroundColor:"white", alignItems:"center", padding:8, width:150, left:120, borderRadius:10, marginTop:50}} onPress={()=> this.handleLogOut()}> 
                <Image source={require('./logout-icon.png')} style={{height:30, width:30}} />
                <Text style={{fontSize:22,fontWeight:"bold", color:'black'}}> LOGOUT </Text>
            </TouchableOpacity> */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Map')}
                style={{bottom: 3, width: (screenWidth - 220) / 3}}>
                <Image
                  source={require('./map-icon.png')}
                  style={{height: 50, width: 50}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('ScanQR')}
                style={{right: 20, width: (screenWidth - 220) / 3}}>
                <Image
                  source={require('./scan-icon.png')}
                  style={{height: 40, width: 67}}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity>
                <Text
                  style={{
                    fontSize: 15,
                    left: screenWidth - 100,
                    fontWeight: 'normal',
                    color: '#8359E3',
                    marginTop: 170,
                  }}
                  onPress={() => this.props.navigation.goBack()}>
                  {' '}
                  Back{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    width: '110%',
    height: '100%',
    // flex:
  },
  helpIcon: {
    height: 40,
    width: 40,
  },
  button: {
    backgroundColor: '#A7AEF9',
    borderRadius: 10,
    alignItems: 'center',
    width: screenWidth - 50,
    height: 44,
    left: 25,
    marginTop: 30,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    alignItems: 'center',
    top: 13,
  },
});
