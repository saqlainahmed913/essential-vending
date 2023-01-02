import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {View} from 'react-native';
import {firebaseApp} from '../config/firebase';
import Geolocation from 'react-native-geolocation-service';
import {Dimensions} from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import Slider from './MapSlider';
import Config from '../android/app/google-services.json';
import openMap from 'react-native-open-maps';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const API_KEY = Config.client[0].api_key[0].current_key;

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liveLocation: undefined,
      locations: [],
      origin: {},
      destination: {},
    };
  }

  /* 
    Fetch the vending machine locations from the firebase. 
  */
  loadVendingMachineLocationData = () => {
    firebaseApp
      .database()
      .ref('machines/')
      .on('value', snapshot => {
        let responseList = Object.values(snapshot.val());
        this.setState({
          locations: responseList,
        });
        console.log('Response ' + JSON.stringify(this.state.locations));
      });
  };

  /* 
    Fetch the live location of the user
  */
  getLiveLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        this.setState({
          liveLocation: {latitude: latitude, longitude: longitude},
        });
        console.log('Live location ', this.state.liveLocation);
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: false, timeout: 15000},
    );
  };

  componentDidMount() {
    this.getLiveLocation();
    this.loadVendingMachineLocationData();
  }

  styles = {
    container: {
      flex: 1,
    },
    wrapper: {
      marginTop: screenHeight - 200,
      height: 160,
      marginLeft: 25,
      width: screenWidth - 50,
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: 10,
      overflow: 'scroll',
    },
  };

  goTo = (latitude, longitude) => {
    const origin = {
      latitude: this.state.liveLocation.latitude,
      longitude: this.state.liveLocation.longitude,
    };
    const destination = {
      latitude: latitude,
      longitude: longitude,
    };
    this.setState({
      origin: origin,
      destination: destination,
    });
  };

  goToGoogleMaps = title => {
    const options = {
      end: title,
    };
    openMap(options);
  };

  render() {
    return (
      <>
        {this.state.liveLocation && (
          <View style={this.styles.container}>
            <MapView
              style={{flex: 1}}
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              initialRegion={{
                latitude: this.state.liveLocation.latitude,
                longitude: this.state.liveLocation.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <MapViewDirections
                origin={this.state.origin}
                destination={this.state.destination}
                apikey={API_KEY}
                strokeWidth={4}
                strokeColor="#A7AEF9"
              />
              {this.state.locations &&
                this.state.locations.map(loc => (
                  <Marker
                    key={loc.title}
                    coordinate={{
                      latitude: loc.latitude,
                      longitude: loc.longitude,
                    }}
                    title={loc.title}
                  />
                ))}
            </MapView>
            <View style={this.styles.wrapper}>
              <Slider
                locations={this.state.locations}
                goTo={this.goTo}
                goToGoogleMaps={this.goToGoogleMaps}
              />
            </View>
          </View>
        )}
      </>
    );
  }
}
