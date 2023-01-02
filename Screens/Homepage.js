import React from 'react';
import {Button, Text, Image} from 'react-native-elements';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  StyleSheet,
  Systrace,
  ScrollView,
  ImageBackground,
  LogBox
} from 'react-native';
import UserAccount from './UserAccount.js';
import Login from './LoginPage.js';
import SignUp from './SignUp.js';
import SignUpEmail from './SignUpEmail.js';
import Promotions from './Promotions.js';
import {StackNavigator} from 'react-navigation';
import helpPage from './helpPage.js';
import {urlencoded} from 'body-parser';
import {
  initialWindowMetrics,
  SafeAreaView,
} from 'react-native-safe-area-context';
import ViewTextKeyboard from './Components/ViewTextKeyboard.js';
import {Dimensions} from 'react-native';
import Dots from 'react-native-dots-pagination';
LogBox.ignoreAllLogs();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const {width, height} = Dimensions.get('screen');
// import styles from './Styles/styles';
const settings = {
  dots: true,
  arrows: true,
  infinite: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 1,
  speed: 500,
  appendDots: dots => {
    return <MagicSliderDots dots={dots} numDotsToShow={4} dotWidth={30} />;
  },
};

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 0
    }
  }
  render() {
    return (
      <ImageBackground
        source={require('./background_image.png')}
        resizeMode="cover"
        style={styles.image}>
        <ScrollView>
          <View style={styles.container}>
            {/* <Image source={require('./bg.png')}> */}
            {/* <ImageBackground source={image} style={styles.backgroundImage}>     */}

            {/* <Text style={styles.title}>Fastest way to pay </Text> */}
            <View style={styles.container}>
              <Text style={styles.toptext1}> Fastest way to </Text>
              <Text style={styles.toptext2}> pay </Text>
              <View style={{justifyContent: 'space-between'}}>
                <Image
                  source={require('./assests/sally_home_page.png')}
                  style={{
                    height: 450,
                    width: screenWidth - 20,
                    left: 10,
                    marginTop: 10,
                  }}
                />
              </View>

              <View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate('Login')}>
                  <Text
                    style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
                    {' '}
                    Login{' '}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.props.navigation.navigate('SignUpEmail')}>
                  <Text
                    style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
                    {' '}
                    Sign Up{' '}
                  </Text>
                </TouchableOpacity>
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={styles.questionbutton}
                    onPress={() => this.props.navigation.navigate('helpPage')}>
                    <View>
                      <Image
                        source={require('./assests/question_mark.png')}
                        style={styles.question}
                      />
                    </View>
                  </TouchableOpacity>

                  <View style={styles.sliderdiv}>
                    <Text style={styles.dot}></Text>
                    <Text style={styles.dot2}></Text>
                    <Text style={styles.dot3}>{''}</Text>
                    {/* <Dots length={3} active={this.state.active} /> */}
                  </View>
                </View>

                {/* </ImageBackground> */}
              </View>

              {/* <ViewTextKeyboard> */}
            </View>
            {/* </ViewTextKeyboard> */}
            {/* <ImageBackground source={require('./background_image.png')}></ImageBackground> */}

            {/* <ViewTextKeyboard> */}
            {/* <ViewTextKeyboard> */}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    //backgroundColor: '#00bfff',
    // backgroundImage: require('./bg.png'),

    justifyContent: 'space-between',
  },
  toptext1: {
    fontSize: 45,
    color: 'black',
    textAlign: 'left',
    fontFamily: 'serif',
    marginTop: 52,
    left: 39,
  },
  toptext2: {
    fontSize: 45,
    color: 'black',
    textAlign: 'left',
    fontFamily: 'serif',
    left: 39,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    width: 297,
    height: 99,
    top: 40,
    left: 39,
    fontFamily: 'serif',
    fontSize: 38.57,
  },
  // button: {
  //   backgroundColor: '#8359E3',
  //   padding: 10,
  //   borderRadius: 10,
  //   alignItems: 'center',
  //   width: 320,
  //   left: 45,
  //   height: 44,
  //   marginTop: 10,
  //   justifyContent: 'center',
  // },
  button: {
    backgroundColor: '#8359E3',
    padding: 14.88,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    width: screenWidth - 54,
    //left: 31,
    marginTop: 10,
  },
  question: {
    height: 20,
    width: 20,
    marginTop: 15,
    marginBottom: 20,
    left: 15,
  },
  dot: {
    justifyContent: 'flex-start',
    marginTop: 25,
    height: 7,
    width: 7,
    backgroundColor: '#000000',
    borderRadius: 50,
    alignContent: 'center',
    // alignSelf: 'center',
    //marginLeft: 20,
    // display: inline-block
  },
  dot2: {
    justifyContent: 'center',
    // alignSelf: 'center',
    alignContent: 'center',
    marginTop: 25,
    height: 7,
    width: 7,
    backgroundColor: '#ADA1A1',
    borderRadius: 50,
    alignContent: 'center',
    marginLeft: 20,
  },
  dot3: {
    justifyContent: 'flex-start',
    marginTop: 25,
    height: 7,
    width: 7,
    backgroundColor: '#ADA1A1',
    borderRadius: 50,
    alignContent: 'center',
    marginLeft: 20,
  },
  footer: {
    flexDirection: 'row',
  },
  slider: {
    left: 50,
  },
  questionbutton: {
    width: 50,
    // left:8.33
  },
  sliderdiv: {
    // alignItems: 'center'
    flexDirection: 'row',
    left: screenWidth - 270,
  },
});
