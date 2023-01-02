import React from 'react';
import {Button, Text, Image} from 'react-native-elements';
import {View, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import UserAccount from './UserAccount.js';
import Login from './LoginPage.js';
import {StackNavigator} from 'react-navigation';
import ScanQR from './ScanQR.js';
import styles from './Styles/styles.js';

export default class VendingMachine extends React.Component {
  render() {
    const amount = this.props.navigation.getParam('text');
    return (
      <>
        <ImageBackground
          source={require('./background_image.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={{alignItems: 'flex-end', paddingRight: 20}}
              onPress={() => this.props.navigation.navigate('ScanQR')}>
              <Text
                style={{
                  height: 50,
                  width: 50,
                  marginTop: 40,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>
                {' '}
                Done{' '}
              </Text>
            </TouchableOpacity>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('./vendingMachineDisburse.gif')}
                style={styles.vendingMachine}
              />
            </View>
            <Text style={styles.successText}>
              {' '}
              Please collect your item from the vending machine
            </Text>
          </View>
        </ImageBackground>
      </>
    );
  }
}
