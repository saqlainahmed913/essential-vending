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
import {StackNavigator} from 'react-navigation';
import {firebaseApp} from '../config/firebase';
import * as firebase from 'firebase';
const firestoreDb = firebaseApp.firestore();
firestoreDb.settings({experimentalForceLongPolling: true}, {merge: true});
import notifications from './notifications.js';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const {width, height} = Dimensions.get('screen');
const screenHeight = Dimensions.get('window').height;

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    // this.setState({email: text})
  }

  state = {
    receipts: [],
    email: '',
  };
  /* 
    Extracts Recipts to display
  */
  componentDidMount = async () => {
    const email = this.props.navigation.getParam('text');
    console.log(email);
    await firestoreDb
      .collection('receipts')
      .where('email', '==', email)
      .get()
      .then(snapshot => {
        console.log(JSON.stringify(snapshot));
        const data = snapshot.docs.map(doc => doc.data());
        console.log(data);
        this.setState({receipts: data});
        console.log(JSON.stringify(this.state.receipts));
      });
  };

  render() {
    return (
      <>
        <View style={{flex: 1}}>
          <ImageBackground
            source={require('./background_image.png')}
            resizeMode="cover"
            style={styles.image}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{flexGrow: 1}}
              style={styles.scrollView}>
              <TouchableOpacity>
                {/* <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/> */}
                <Text
                  style={{
                    fontSize: 15,
                    top: 600,
                    left: screenWidth - 100,
                    textAlign: 'justify',
                    fontWeight: 'normal',
                    color: '#8359E3',
                    // color: 'black',
                  }}
                  onPress={() => this.props.navigation.goBack()}>
                  {' '}
                  Back{' '}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingLeft: 15,
                  paddingRight: 10,
                }}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('notifications')
                  }>
                  <Image
                    source={require('./notification-icon.png')}
                    style={{height: 35, width: 35, marginTop: 70}}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={{
                  fontSize: 30,
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginBottom: 20,
                }}>
                {' '}
                Your Receipts{' '}
              </Text>

              {this.state.receipts &&
                this.state.receipts.map(receipt => (
                  <View
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
                      width: width - 58,
                      height: 50,
                      left: 0,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                      }}>
                      {' '}
                      Paid ${receipt.amount} to Vending Machine{' '}
                      {receipt.vendingMachineNumber}{' '}
                    </Text>
                  </View>
                ))}
            </ScrollView>
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
  image: {
    justifyContent: 'center',
    width: '110%',
    height: '100%',
    // flex:
  },
});
