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
import Receipts from './Receipts.js';
import Map from './Map.js';
import ScanQR from './ScanQR.js';
import UserAccount from './UserAccount.js';
import {Dimensions} from 'react-native';
import Clipboard from '@react-native-community/clipboard';

const screenWidth = Dimensions.get('window').width;
const {width, height} = Dimensions.get('screen');
const screenHeight = Dimensions.get('window').height;

export default class notifications extends React.Component {
  constructor(props) {
    super(props);

    // this.setState({email: text})
  }

  state = {
    promotions: [],
  };

  componentDidMount() {
    firebaseApp
      .firestore()
      .collection('promotions')
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        this.setState({promotions: data});
        console.log(JSON.stringify(this.state.promotions));
      });
  }

  handleCopy(coupon) {
    const coupon_code = coupon;
    Clipboard.setString(coupon_code);
    alert('Copied to clipboard');
  }

  render() {
    // const amount='$10'
    // const vendingMachine='VM1'

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
                
              <TouchableOpacity>
                
              </TouchableOpacity>
              <TouchableOpacity style={{
                // alignContent: 'center'
              }}>
                <Text
                  style={{
                    fontSize: 20,
                    top: 10,
                    // alignSelf: 'center',
                    textAlign: 'center',
                    alignItems: 'center',
                    alignContent:'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    color: 'black',
                  }}>
                  Notifications
                </Text>
              </TouchableOpacity>

              <View style={{marginTop: height / 18}}>
                {this.state.promotions &&
                  this.state.promotions.map(promo => (
                    <View
                      style={{
                        width: width - 58,
                        height: 50,
                        borderRadius: 20,
                        marginTop: 20,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        elevation: 0,
                        backgroundColor: 'rgba(255,255,255,0.5)',
                      }}>
                      <Text selectable={true}
                        multiline
                        style={{
                          fontSize: 14,
                          textAlign: 'center',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '700',
                          paddingLeft: 20,
                          marginTop: 15,
                          width: width - 100,
                        }}>
                        {promo.body} : {promo.coupon}{' '}
                      </Text>
                      <TouchableOpacity
                        onPress={() => this.handleCopy(promo.coupon)}>
                        {/* onPress={() => Clipboard.setString(promo.coupon)}> */}
                        {/* <Image
                          source={require('./copy-icon.png')}
                          style={{
                            height: 50,
                            width: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        /> */}
                      </TouchableOpacity>
                      
                    </View>
                  ))}
              </View>
              <TouchableOpacity>
              <Text
                  style={{
                    fontSize: 15,
                    top: height - height / 4,
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
