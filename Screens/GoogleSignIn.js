import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import Config from '../android/app/google-services.json';
import {Alert} from 'react-native';
import {firebaseApp} from '../config/firebase';
const firestoreDb = firebaseApp.firestore();

GoogleSignin.configure({
  webClientId: Config.client[0].oauth_client[1].client_id,
});

export default class GoogleSignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    userProfile: {},
  };

  /*
    Fetch the google credentials and check if the user already exist, if not then sign in 
  */
  signInGoogle = async () => {
    try {
      const userInfo = await GoogleSignin.signIn();
      firestoreDb
        .collection('users')
        .where('email', '==', userInfo.user.email)
        .get()
        .then(async querySnapshot => {
          const data = querySnapshot.docs.map(doc => doc.data());
          if (data && data.length > 0) {
            Alert.alert(
              'Alert',
              'Account already exist. Sign in using email and password.',
              [{text: 'OK'}],
            );
          } else {
            const googleCredential = auth.GoogleAuthProvider.credential(
              userInfo.idToken,
            );
            const userProfile = await auth().signInWithCredential(
              googleCredential,
            );
            let payload = {
              email: userInfo.user.email,
              firstName: userInfo.user.givenName,
              lastName: userInfo.user.familyName,
              uid: userProfile.user.uid,
              timestamp: Date.now(),
            };
            this.setState({userProfile: payload});
            this.props.handleGoogleSignIn(this.state.userProfile);
          }
        })
        .catch(err => {
          console.error('Error in completion: ', err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  /*
    Revoke the access and sign in on button click.
  */
  onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      await this.signInGoogle();
    } catch (error) {
      this.signInGoogle();
    }
  };

  render() {
    return (
      <GoogleSigninButton
        style={this.props.styles}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={this.onGoogleButtonPress}
      />
    );
  }
}
