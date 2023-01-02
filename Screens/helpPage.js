import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
import CardPage from './card.js';
import { StackNavigator } from "react-navigation";
import { Dimensions } from 'react-native';
import Map from './Map.js';
import ForgotPassword from './ForgotPassword.js';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class helpPage extends Component {
  render() {
    return (
    <View style={{flex:1}}>
     
     <ImageBackground source={require('./background_image.png')}  resizeMode="cover" style={styles.image}>
      
      <View style={{flex:1}}>
      {/* <Image source={require('./background-image.png')} style={{ width: screenWidth, height: screenHeight }}/> */}
     
        <TouchableOpacity>
        {/* <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/> */}
      <Text style={{fontSize:15,top:730,left:screenWidth-100, textAlign: "justify", fontWeight:"normal", color:"#8359E3"}} onPress={() => this.props.navigation.goBack()}> Back </Text>
      </TouchableOpacity></View>

      <ScrollView style={{textAlign: "center",backgroundColor: 'rgba(0,0,0,0.05)',position:"absolute",flex:1, background:"linear-gradient(to bottom, rgba(167, 174, 249, 0.5) 0%, rgba(98, 132, 255, 0.5) 48.64%, rgba(131, 89, 227, 0.5) 100%)", 
      width: screenWidth-58, height:635, left: 29, top:84, box:"0px 20px 30px rgba(0, 0, 0, 0.25)", borderRadius:20, shadowOpacity: 1, borderColor:"black"}}>

        <Text style={{left: 25, fontSize:25, top:30, textAlign: "justify", fontWeight:"normal", color:"black"}}> How can we help? </Text>

        <View style={{flexDirection:"row",justifyContent:'space-between', marginTop:50, width:screenWidth-98,left:20}}>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:5,  alignItems:"center",width:(screenWidth-108)/2, height:52.5,left:0,right:20, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 1})} >
        <Text style={{height:22.75,fontSize:16, top:6, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> About Us </Text>
        </TouchableOpacity>
        <TouchableOpacity 
         style={{backgroundColor:"white", paddingTop:8, borderRadius:5,  alignItems:"center",width:(screenWidth-108)/2, height:52.5, left:0,right:15, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 2})} >
           <View style={{flex:1}}>
        <Text style={{height:40.75,fontSize:16,bottom:0,left:0, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Account </Text>
        <Text style={{height:40.75,fontSize:16,right:3,left:0, bottom:24,textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Creation </Text></View>
        {/* <Text style={{width:62,height:40.75,fontSize:16,bottom:2, textAlign: "justify",alignItems:"center", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Account Creation </Text> */}
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row",justifyContent:'space-between', width:screenWidth-98,left:20}}>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:5,  alignItems:"center",width:(screenWidth-108)/2, height:52.5, left:0, marginTop:20}}
         onPress={() => this.props.navigation.navigate('ForgotPassword')} >
           <View style={{flex:1}}>
        <Text style={{height:40.75,fontSize:16,bottom:0,left:5, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Forgot </Text>
        <Text style={{fontSize:16,right:3,left:0, bottom:24,textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Password </Text></View>
        {/* <Text style={{width:75,height:40.75,fontSize:16,bottom:2, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}>Forgot Password </Text> */}
        </TouchableOpacity>
        <TouchableOpacity 
         style={{backgroundColor:"white", paddingTop:8, borderRadius:5,  alignItems:"center",width:(screenWidth-108)/2, height:52.5, left:0, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 4})} >
           <View style={{flex:1}}>
        <Text style={{height:40.75,fontSize:16,bottom:0,left:5, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Edit </Text>
        <Text style={{height:40.75,fontSize:16,right:3, bottom:24,textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Account </Text></View>
        {/* <Text style={{width:60,height:40.75,fontSize:16, bottom:3,right:5, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}>  </Text> */}
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row",justifyContent:'space-between',width:screenWidth-98,left:20}}>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:5,  alignItems:"center",width:(screenWidth-108)/2, height:52.5, left:0, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 5})} >
        <View style={{flex:1}}>
        <Text style={{height:40.75,fontSize:16,bottom:0, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Payment </Text>
        <Text style={{height:40.75,fontSize:16, bottom:24,left:3,textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Issues </Text></View>
        </TouchableOpacity>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:5,  alignItems:"center",width:(screenWidth-108)/2, height:52.5, left:0, marginTop:20}}
         onPress={() => this.props.navigation.navigate('Map')} >
           <View style={{flex:1}}>
        <Text style={{height:40.75,fontSize:16,bottom:0,left:6, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Locate </Text>
        <Text style={{height:40.75,fontSize:16,right:3, bottom:24,textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Machines </Text></View>
        {/* <Text style={{width:75,height:22.75,fontSize:16, top:6, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Locate Machines </Text> */}
        </TouchableOpacity>
        </View>

        <View style={{flexDirection:"row",justifyContent:'space-between',width:screenWidth-98,left:20}}>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:5,  alignItems:"center",width:(screenWidth-108)/2, height:52.5, left:0, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 7})} >
        <Text style={{height:22.75,fontSize:16, top:6,left:0, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Take a tour </Text>
        </TouchableOpacity>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:5,  alignItems:"center",width:(screenWidth-108)/2, height:52.5, left:0, marginTop:20}}
         onPress={() => this.props.navigation.navigate('CardPage', {option : 8})} >
        <Text style={{height:22.75,fontSize:16, top:6, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Contact Us </Text>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row",justifyContent:'space-between',width:screenWidth-98,left:20}}>
        <TouchableOpacity 
         style={{backgroundColor:"white", padding:8, borderRadius:5,  alignItems:"center",width:(screenWidth-108)/2, height:52.5, left:0, marginTop:20}}
         onPress={() => this.props.navigation.navigate('Promotions')} >
        <Text style={{height:22.75,fontSize:16, top:6,left:2, textAlign: "justify", fontWeight:"500", color:"black", fontFamily:"Poppins"}}> Promotions </Text>
        </TouchableOpacity></View>
       
        </ScrollView>
        </ImageBackground>
    
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'flex-start',
    //alignItems: 'stretch',
    backgroundColor: '#B0BEC5',
    //borderRadius : 25
  },
  image: {
    justifyContent: "center",
    width:'110%',
    height:'100%',
    // flex:
  }
});
