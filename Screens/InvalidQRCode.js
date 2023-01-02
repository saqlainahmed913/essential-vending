import React from 'react';
import {View, Alert, ImageBackground} from 'react-native';
import ScanQR from './ScanQR';

import styles from './Styles/styles';

export default class InvalidQRCode extends React.Component {
  componentDidMount() {
    Alert.alert('Alert', 'Invalid QR Code', [
      {text: 'OK', onPress: () => this.props.navigation.navigate('ScanQR')},
    ]);
  }
  render() {
    return (
      <>
        <ImageBackground
          source={require('./background_image.png')}
          resizeMode="cover"
          style={styles.image}>
          <View style={{flex: 1}}></View>
        </ImageBackground>
      </>
    );
  }
}
