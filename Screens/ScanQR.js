import React from 'react';
import {Button, Text, Image, ImageBackground} from 'react-native-elements';
import {View, TouchableOpacity, StyleSheet, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import UserAccount from './UserAccount.js';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {firebaseApp} from '../config/firebase';
import PushNotification from 'react-native-push-notification';
import SendNotification from './sendNotification.js';
import Map from './Map.js';
import PaymentOptions from './PaymentOptions.js';
import helpPage from './helpPage.js';
import notifications from './notifications.js';
import InvalidQRCode from './InvalidQRCode.js';
import reportAdmin from './reportAdmin.js';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const {width, height} = Dimensions.get('screen');
// import styles from './Styles/styles';

export default class ScanQR extends React.Component {
  constructor() {
    super();
  }

  state = {
    isAdmin: '',
  };

  createChannels = () => {
    console.log('Channel Created');
    PushNotification.createChannel({
      channelId: 'test-local-channel',
      channelName: 'Test Local Channel',
    });
  };

  componentDidMount = async () => {
    console.log('Entered');
    this.createChannels();
    userEmail = await AsyncStorage.getItem('UserEmail');
    console.log('UserEmail' + userEmail);
    if (userEmail.startsWith('"')) {
      userEmail = userEmail.slice(1, -1);
    }
    if (userEmail == 'contact@theessentialmachine.com') {
      this.setState({isAdmin: 1});
      window.location.reload();
    }
  };

  /* 
        Entering Vending Machine
  */
  getTransactionDetails = async (vm_id, email) => {
    console.log('Entered VM!');
    var machineId = '';
    var amt = '';
    await firebaseApp
      .database()
      .ref('machines/')
      .orderByChild('name')
      .equalTo(vm_id)
      .on('value', snapshot => {
        machineId = Object.keys(snapshot.val())[0];
        console.log('jdvkjsdvb' + machineId);
        let responseList = Object.values(snapshot.val());
        console.log(responseList[0].transaction_amount);
        amt = responseList[0].transaction_amount;
      });
    console.log('MachineId ' + machineId);
    console.log('Amount' + amt);
    var ref = await firebaseApp.database().ref('machines/').child(machineId);
    ref.update({active_user_id: email});
    return [amt, machineId, vm_id];
  };

  /* 
        Extracting details from the QR code
  */
  onSuccess = async e => {
    console.log(e.data);
    if (e.data == 'VM1' || e.data == 'VM2' || e.data == 'VM3') {
      let user = await AsyncStorage.getItem('UserEmail');
      var obj = await this.getTransactionDetails(e.data, user);
      var amt = obj[0];
      var machineId = obj[1];
      var vm_num = obj[2];
      console.log('Got amount ' + amt);
      console.log('Got id ' + machineId);
      console.log('Got VM ' + vm_num);
      this.props.navigation.navigate('PaymentOptions', {
        text: amt,
        id: machineId,
        vm_id: vm_num,
      });
      this.props.navigation.navigate('PaymentOptions', {
        text: amt,
        id: machineId,
        vm_id: vm_num,
      });
      this.props.navigation.navigate('PaymentOptions', {
        text: amt,
        id: machineId,
        vm_id: vm_num,
      });
      this.scanner.reactivate();
      this.scanner.reactivate();
      this.scanner.reactivate();
    } else {
      this.props.navigation.navigate('InvalidQRCode');
    }
  };

  render() {
    const email = this.props.navigation.getParam('text');
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#00bfff',
        justifyContent: 'space-between',
      },
      headerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        padding: 25,
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
      header: {
        top: 10,
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        justifyContent: 'center',
      },
      icon: {
        height: 60,
        width: 60,
      },
      helpIcon: {
        height: 20,
        width: 20,
        marginTop: 15,
        marginBottom: 20,
        left: 1,
      },
    });

    return (
      <>
        <View style={{flex: 1}}>
          <Image
            source={require('./background_image.png')}
            style={{width: screenWidth, height: screenHeight}}>
            <View style={styles.headerView}>
              <Text style={styles.header}> Please Scan QR Code </Text>
            </View>

            <View style={{marginTop: 62, paddingLeft: 10}}>
              <QRCodeScanner
                reactivate={true}
                showMarker={true}
                ref={node => {
                  this.scanner = node;
                }}
                onRead={this.onSuccess}
                cameraStyle={[
                  {
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    position: 'absolute',
                    height: 330,
                    width: screenWidth - 20,
                  },
                ]}
                flashMode={RNCamera.Constants.FlashMode.auto}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingLeft: 25,
                paddingRight: 25,
                marginTop: 400,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('helpPage')}>
                <Image
                  source={require('./new-help-icon.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Map')}>
                <Image
                  source={require('./new-map-icon.png')}
                  style={{width: 45, height: 60}}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('UserAccount', {text: email})
                }>
                <Image
                  source={require('./new-profile-icon.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>

              <View>
                {(this.state.isAdmin == 1 ||
                  email == 'contact@theessentialmachine.com') && (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('SendNotification')
                    }>
                    <Image
                      source={require('./send-notification-icon.png')}
                      style={{height: 45, width: 60}}
                    />
                  </TouchableOpacity>
                )}
                {(this.state.isAdmin == 1 ||
                  email == 'contact@theessentialmachine.com') && (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('reportAdmin')
                    }
                    style={{marginTop: 20}}>
                    <Image
                      source={require('./chart-line-solid.png')}
                      style={{height: 45, width: 60}}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Image>
        </View>
      </>
    );
  }
}
