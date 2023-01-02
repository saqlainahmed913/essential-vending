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
  Alert,
} from 'react-native';
import UserAccount from './UserAccount.js';
import Login from './LoginPage.js';
import SignUp from './SignUp.js';
import SignUpEmail from './SignUpEmail.js';
import {StackNavigator} from 'react-navigation';
import helpPage from './helpPage.js';
import {urlencoded} from 'body-parser';
import {
  initialWindowMetrics,
  SafeAreaView,
} from 'react-native-safe-area-context';
import ViewTextKeyboard from './Components/ViewTextKeyboard.js';
import {Dimensions} from 'react-native';
import Video from 'react-native-video';
import styles from './Styles/styles';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const {width, height} = Dimensions.get('screen');


let promo_obj = [
  {
    "url" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "description" : "Introducing Chromecast. The easiest way to enjoy online video and music on your TV"
  },
  {
    "url" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "description" : "The first Ice Skating rink in Buffalo. Starts from 27th March, bring your UB card and get discount of upto 10%."
  },
  {
    "url" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "description" : "Tears of Steel was realized with crowd-funding by users of the open source 3D creation tool Blender. Get 20% off on your first order. Use Code: TEM_FTW"
  },
  {
    "url" : "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "description" : "Welcome to CDS, Sign Up with us and get 30% discount on your first order. Use Code : TEST_123"
  }
];


export default class Promotions extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            url: '',
            description: ''
        }
    }

    componentDidMount() {
      let rand_ele = promo_obj[Math.floor(Math.random()*promo_obj.length)];
      // Alert.alert(rand_ele.url);
      this.setState({
        url:rand_ele.url,
        description:rand_ele.description
      })
    }

    render() {
        let video_url = this.state.url;
        // Alert.alert(video_url);
        return(
            <View style={{flex:1}}>
             <Image source={require('./background_image.png')} style={{ width: screenWidth, height: screenHeight }}>
                <View style={style2.headerView}>
                <TouchableOpacity onPress={()=> this.props.navigation.goBack()} >
                <Image source={require('./back-icon.png')} style={{height:30, width:30}}/>
                </TouchableOpacity>
                <Text style={style2.header}> Promotions </Text>
                </View>
                <View>
                  <View>
                <Video
                source={{uri: video_url}}
                style={style2.video}
                controls={false}
                />
                </View >
                </View>
                <View style={style2.card}>
                  <ScrollView>
                  <Text>{this.state.description}</Text>
                  </ScrollView>
                </View>
             </Image>
            </View>
        )
    }
}

const style2 = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 19,
        borderWidth: 1,
        marginTop: 0.06 * screenHeight,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        backgroundColor: 'rgba(136, 129, 129, 0.12)',
        borderColor: 'rgba(0, 0, 0, 0.42)',
      },
      videoView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
      header: {
        justifyContent: 'center',
        alignContent: 'center',
        left: 0.35*screenWidth,
        top: 20,
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
      },
      video: {
        width:screenWidth,
        height: 400,
        top: 50,
        // flex:1,
        // alignSelf: 'center',
        resizeMode: 'contain'
      },
      card: {
        shadowColor: 'black',
        height:150,
        width:screenWidth-20,
        left:10,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: '#f0f8ff',
        padding: 10,
        borderRadius: 10,
        
      },
      videoStyle: {
          alignSelf: 'center',
          height: '80%',
          resizeMode: 'contain'
          
      }
})