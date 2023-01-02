import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useState} from 'react';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Slider = props => {
  const [sliderState, setSliderState] = useState({currentPage: 0});

  /*
    Change the slide on scrolling
  */
  const setSliderPage = event => {
    const {currentPage} = sliderState;
    const {x} = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / (screenWidth - 100));
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  const {currentPage: pageIndex} = sliderState;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          style={{flex: 1}}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={event => {
            setSliderPage(event);
          }}>
          {props.locations &&
            props.locations.map(loc => (
              <View style={styles.body}>
                <View style={styles.wrapper}>
                  <Text style={styles.title}>{loc.title}</Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => props.goTo(loc.latitude, loc.longitude)}>
                    <Image
                      style={styles.image}
                      source={require('./direct-instagram.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.googleButton}
                    onPress={() => props.goToGoogleMaps(loc.title)}>
                    <Image
                      style={styles.googleImage}
                      source={require('./google-maps.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(3).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                {opacity: pageIndex === index ? 1 : 0.2},
              ]}
              key={index}
            />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    width: screenWidth - 50,
    height: 160,
    marginTop: 30,
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  image: {
    height: 35,
    width: 35,
    marginLeft: screenWidth - 290,
  },
  googleImage: {
    height: 50,
    width: 50,
    marginLeft: screenWidth - 150,
  },
  googleButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    width: 80,
    color: 'black',
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
    backgroundColor: '#A7AEF9',
    marginLeft: 10,
  },
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 30,
  },
});

export default Slider;
