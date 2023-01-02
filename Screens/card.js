import React from 'react';
import { StyleSheet,Text, Image, View, ImageBackground} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native';
import Unorderedlist from 'react-native-unordered-list';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;



export default class CardPage extends React.Component {

render (){
    const x = this.props.navigation.getParam('option')
     if(x == 1)
    {
    return<>
     <View style={{flex:1}}>
     <ImageBackground source={require('./background_image.png')} style={{ width: screenWidth, height: screenHeight }}>
      
      <View style={{flex:1}}>
      {/* <Image source={require('./background-image.png')} style={{ width: screenWidth, height: screenHeight }}/> */}
     
        <TouchableOpacity>
        {/* <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/> */}
      <Text style={{fontSize:15,top:730,left:screenWidth-100, textAlign: "justify", fontWeight:"normal", color:"#8359E3"}} onPress={() => this.props.navigation.goBack()}> Back </Text>
      </TouchableOpacity></View></ImageBackground>
     
   <ScrollView style={{textAlign: "center",backgroundColor: 'rgba(0,0,0,0.05)',position:"absolute",flex:1, background:"linear-gradient(to bottom, rgba(167, 174, 249, 0.5) 0%, rgba(98, 132, 255, 0.5) 48.64%, rgba(131, 89, 227, 0.5) 100%)", 
      width: screenWidth-58, height:635, left: 29, top:84, box:"0px 20px 30px rgba(0, 0, 0, 0.25)", borderRadius:20, shadowOpacity: 1, borderColor:"black"}}>
   {/* <Unorderedlist marginTop = '100' alignItems = 'center' style={{left:10, fontSize:50}}> */}
   <Text style={{left: 25, fontSize:25, top:30, textAlign: "justify", fontWeight:"normal", color:"black", marginBottom:8}}> About Us </Text>
   <View style={{backgroundColor:"#c5c5c5", top:25, marginLeft:23,fontWeight:"normal",fontSize:10, paddingRight:10, width: screenWidth-98, height:360, fontFamily:"Poppins"}}>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>VenMe is an payment platform that utalizes the power of cryptocurrecy in order to facilitate transactions between people and machines. </Text>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>Our focus is on creating a smooth and speedy checkout experience without the need of cash, coins, and cards.</Text>
   </View>
  
   <Image source={require('./helpPage-image.png')} style={{height:245, width:250,marginTop:4, left:50,bottom:3}}/>
    
    {/* </Unorderedlist> */}
     {/* <Unorderedlist alignItems = 'center' style={{left:10, fontSize:50}}> */}
    
    {/* </Unorderedlist> */} 
    </ScrollView>
    </View>
    
    </>
    }

    else if(x == 2)
    {
    return<>
     <View style={{flex:1}}>
     <ImageBackground source={require('./background_image.png')}  resizeMode="cover" style={styles.image}>
      
      <View style={{flex:1}}>
      {/* <Image source={require('./background-image.png')} style={{ width: screenWidth, height: screenHeight }}/> */}
     
        <TouchableOpacity>
        {/* <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/> */}
      <Text style={{fontSize:15,top:730,left:300, textAlign: "justify", fontWeight:"normal", color:"#8359E3"}} onPress={() => this.props.navigation.goBack()}> Back </Text>
      </TouchableOpacity></View></ImageBackground>
    {/* <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
    <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/>
    </TouchableOpacity> */}
    <ScrollView style={{textAlign: "center",backgroundColor: 'rgba(0,0,0,0.05)',position:"absolute",flex:1, background:"linear-gradient(to bottom, rgba(167, 174, 249, 0.5) 0%, rgba(98, 132, 255, 0.5) 48.64%, rgba(131, 89, 227, 0.5) 100%)", 
      width: 359, height:635, left: 24, top:84, box:"0px 20px 30px rgba(0, 0, 0, 0.25)", borderRadius:20, shadowOpacity: 1, borderColor:"black"}}>
    <Text style={{left: 25, fontSize:25, top:30, textAlign: "justify", fontWeight:"normal", color:"black", marginBottom:8}}>Account Creation {"\n"} </Text>
    <View style={{backgroundColor:"#c4c4c4", top:5, marginLeft:23,paddingLeft:5,fontWeight:"normal",fontSize:10, paddingRight:10, width: screenWidth-98, height:360, fontFamily:"Poppins"}}>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins", paddingTop:35}}>VenMe is an payment platform that utilizes the power of cryptocurrecy in order to facilitate transactions between people and machines.</Text>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>Our focus is on creating a smooth and speedy checkout experience without the need of cash, coins, and cards.</Text>
   </View>
   <Image source={require('./helpPage-image.png')} style={{height:245, width:250,marginTop:2, left:50,bottom:15}}/>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </ScrollView>
    </View>
    
    </>
    }

    else if(x == 3)
    {
    return<>
     <View style={{flex:1}}>
     <ImageBackground source={require('./background_image.png')}  resizeMode="cover" style={styles.image}>
      
      <View style={{flex:1}}>
      {/* <Image source={require('./background-image.png')} style={{ width: screenWidth, height: screenHeight }}/> */}
     
        <TouchableOpacity>
        {/* <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/> */}
      <Text style={{fontSize:15,top:730,left:300, textAlign: "justify", fontWeight:"normal", color:"#8359E3"}} onPress={() => this.props.navigation.goBack()}> Back </Text>
      </TouchableOpacity></View></ImageBackground>
    <ScrollView style={{textAlign: "center",backgroundColor: 'rgba(0,0,0,0.05)',position:"absolute",flex:1, background:"linear-gradient(to bottom, rgba(167, 174, 249, 0.5) 0%, rgba(98, 132, 255, 0.5) 48.64%, rgba(131, 89, 227, 0.5) 100%)", 
      width: 359, height:635, left: 24, top:84, box:"0px 20px 30px rgba(0, 0, 0, 0.25)", borderRadius:20, shadowOpacity: 1, borderColor:"black"}}>
    <Text style={{left: 25, fontSize:25, top:30, textAlign: "justify", fontWeight:"normal", color:"black", marginBottom:8}}>Forgot Password {"\n"} </Text>
    <View style={{backgroundColor:"#c4c4c4", top:5, marginLeft:23,paddingLeft:5,fontWeight:"normal",fontSize:10, paddingRight:10, width: screenWidth-98, height:360, fontFamily:"Poppins"}}>
   <Text style={{margin: 20,paddingTop:45, fontSize:18, textAlign: 'left', textAlignVertical: 'top',fontWeight:"bold", color:"black", fontFamily:"Poppins"}}>To create an account, enter your email address followed by “passsword” and “confirm password”. Or select the “Google” or “Apple” icon to sign into either account.</Text>
   </View>
   <Image source={require('./helpPage-image.png')} style={{height:245, width:250,marginTop:2, left:50,bottom:15}}/>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </ScrollView>
    </View>
    
    </>
    }

    else if(x == 4)
    {
    return<>
     <View style={{flex:1}}>
     <ImageBackground source={require('./background_image.png')}  resizeMode="cover" style={styles.image}>
      
      <View style={{flex:1}}>
      {/* <Image source={require('./background-image.png')} style={{ width: screenWidth, height: screenHeight }}/> */}
     
        <TouchableOpacity>
        {/* <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/> */}
      <Text style={{fontSize:15,top:730,left:300, textAlign: "justify", fontWeight:"normal", color:"#8359E3"}} onPress={() => this.props.navigation.goBack()}> Back </Text>
      </TouchableOpacity></View></ImageBackground>
    <ScrollView style={{textAlign: "center",backgroundColor: 'rgba(0,0,0,0.05)',position:"absolute",flex:1, background:"linear-gradient(to bottom, rgba(167, 174, 249, 0.5) 0%, rgba(98, 132, 255, 0.5) 48.64%, rgba(131, 89, 227, 0.5) 100%)", 
      width: 359, height:635, left: 24, top:84, box:"0px 20px 30px rgba(0, 0, 0, 0.25)", borderRadius:20, shadowOpacity: 1, borderColor:"black"}}>
    <Text style={{left: 25, fontSize:25, top:30, textAlign: "justify", fontWeight:"normal", color:"black", marginBottom:8}}>Edit Account {"\n"} </Text>
    <View style={{backgroundColor:"#c4c4c4", top:5, marginLeft:23,paddingLeft:5,fontWeight:"normal",fontSize:10, paddingRight:10, width: screenWidth-98, height:360, fontFamily:"Poppins"}}>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>VenMe is an payment platform that utilizes the power of cryptocurrecy in order to facilitate transactions between people and machines.</Text>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>Our focus is on creating a smooth and speedy checkout experience without the need of cash, coins, and cards.</Text>
   </View>
   <Image source={require('./helpPage-image.png')} style={{height:245, width:250,marginTop:2, left:50,bottom:15}}/>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </ScrollView>
    </View>
    
    </>
    }

    else if(x == 5)
    {
    return<>
     <View style={{flex:1}}>
     <ImageBackground source={require('./background_image.png')}  resizeMode="cover" style={styles.image}>
      
      <View style={{flex:1}}>
      {/* <Image source={require('./background-image.png')} style={{ width: screenWidth, height: screenHeight }}/> */}
     
        <TouchableOpacity>
        {/* <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/> */}
      <Text style={{fontSize:15,top:730,left:300, textAlign: "justify", fontWeight:"normal", color:"#8359E3"}} onPress={() => this.props.navigation.goBack()}> Back </Text>
      </TouchableOpacity></View></ImageBackground>
    <ScrollView style={{textAlign: "center",backgroundColor: 'rgba(0,0,0,0.05)',position:"absolute",flex:1, background:"linear-gradient(to bottom, rgba(167, 174, 249, 0.5) 0%, rgba(98, 132, 255, 0.5) 48.64%, rgba(131, 89, 227, 0.5) 100%)", 
      width: 359, height:635, left: 24, top:84, box:"0px 20px 30px rgba(0, 0, 0, 0.25)", borderRadius:20, shadowOpacity: 1, borderColor:"black"}}>
    <Text style={{left: 25, fontSize:25, top:30, textAlign: "justify", fontWeight:"normal", color:"black", marginBottom:8}}>Payment Issues {"\n"} </Text>
    <View style={{backgroundColor:"#c4c4c4", top:5, marginLeft:23,paddingLeft:5,fontWeight:"normal",fontSize:10, paddingRight:10, width: screenWidth-98, height:360, fontFamily:"Poppins"}}>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>VenMe is an payment platform that utilizes the power of cryptocurrecy in order to facilitate transactions between people and machines. </Text>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>Our focus is on creating a smooth and speedy checkout experience without the need of cash, coins, and cards.</Text>
   </View>
   <Image source={require('./helpPage-image.png')} style={{height:245, width:250,marginTop:2, left:50,bottom:15}}/>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </ScrollView>
    </View>
    
    </>
    }


    else if(x == 6)
    {
    return<>
     <View style={{flex:1}}>
     <ImageBackground source={require('./background_image.png')}  resizeMode="cover" style={styles.image}>
      
      <View style={{flex:1}}>
      {/* <Image source={require('./background-image.png')} style={{ width: screenWidth, height: screenHeight }}/> */}
     
        <TouchableOpacity>
        {/* <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/> */}
      <Text style={{fontSize:15,top:730,left:300, textAlign: "justify", fontWeight:"normal", color:"#8359E3"}} onPress={() => this.props.navigation.goBack()}> Back </Text>
      </TouchableOpacity></View></ImageBackground>
    <ScrollView style={{textAlign: "center",backgroundColor: 'rgba(0,0,0,0.05)',position:"absolute",flex:1, background:"linear-gradient(to bottom, rgba(167, 174, 249, 0.5) 0%, rgba(98, 132, 255, 0.5) 48.64%, rgba(131, 89, 227, 0.5) 100%)", 
      width: 359, height:635, left: 24, top:84, box:"0px 20px 30px rgba(0, 0, 0, 0.25)", borderRadius:20, shadowOpacity: 1, borderColor:"black"}}>
    <Text style={{left: 25, fontSize:25, top:30, textAlign: "justify", fontWeight:"normal", color:"black", marginBottom:8}}>Locate Machines {"\n"} </Text>
    <View style={{backgroundColor:"#c4c4c4", top:5, marginLeft:23,paddingLeft:5,fontWeight:"normal",fontSize:10, paddingRight:10, width: screenWidth-98, height:360, fontFamily:"Poppins"}}>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>VenMe is an payment platform that utilizes the power of cryptocurrecy in order to facilitate transactions between people and machines. </Text>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>Our focus is on creating a smooth and speedy checkout experience without the need of cash, coins, and cards.</Text>
   </View>
   <Image source={require('./helpPage-image.png')} style={{height:245, width:250,marginTop:2, left:50,bottom:15}}/>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </ScrollView>
    </View>
    
    </>
    }


    else if(x == 7)
    {
    return<>
     <View style={{flex:1}}>
     <ImageBackground source={require('./background_image.png')}  resizeMode="cover" style={styles.image}>
      
      <View style={{flex:1}}>
      {/* <Image source={require('./background-image.png')} style={{ width: screenWidth, height: screenHeight }}/> */}
     
        <TouchableOpacity>
        {/* <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/> */}
      <Text style={{fontSize:15,top:730,left:300, textAlign: "justify", fontWeight:"normal", color:"#8359E3"}} onPress={() => this.props.navigation.goBack()}> Back </Text>
      </TouchableOpacity></View></ImageBackground>
    <ScrollView style={{textAlign: "center",backgroundColor: 'rgba(0,0,0,0.05)',position:"absolute",flex:1, background:"linear-gradient(to bottom, rgba(167, 174, 249, 0.5) 0%, rgba(98, 132, 255, 0.5) 48.64%, rgba(131, 89, 227, 0.5) 100%)", 
      width: 359, height:635, left: 24, top:84, box:"0px 20px 30px rgba(0, 0, 0, 0.25)", borderRadius:20, shadowOpacity: 1, borderColor:"black"}}>
    <Text style={{left: 25, fontSize:25, top:30, textAlign: "justify", fontWeight:"normal", color:"black", marginBottom:8}}>Take a Tour {"\n"} </Text>
    <View style={{backgroundColor:"#c4c4c4", top:5, marginLeft:23,paddingLeft:5,fontWeight:"normal",fontSize:10, paddingRight:10, width: screenWidth-98, height:360, fontFamily:"Poppins"}}>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>VenMe is an payment platform that utilizes the power of cryptocurrecy in order to facilitate transactions between people and machines. </Text>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>Our focus is on creating a smooth and speedy checkout experience without the need of cash, coins, and cards.</Text>
   </View>
   <Image source={require('./helpPage-image.png')} style={{height:245, width:250,marginTop:2, left:50,bottom:15}}/>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </ScrollView>
    </View>
    
    </>
    }


    else if(x == 8)
    {
    return<>
     <View style={{flex:1}}>
     <ImageBackground source={require('./background_image.png')}  resizeMode="cover" style={styles.image}>
      
      <View style={{flex:1}}>
      {/* <Image source={require('./background-image.png')} style={{ width: screenWidth, height: screenHeight }}/> */}
     
        <TouchableOpacity>
        {/* <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/> */}
      <Text style={{fontSize:15,top:730,left:300, textAlign: "justify", fontWeight:"normal", color:"#8359E3"}} onPress={() => this.props.navigation.goBack()}> Back </Text>
      </TouchableOpacity></View></ImageBackground>
    <ScrollView style={{textAlign: "center",backgroundColor: 'rgba(0,0,0,0.05)',position:"absolute",flex:1, background:"linear-gradient(to bottom, rgba(167, 174, 249, 0.5) 0%, rgba(98, 132, 255, 0.5) 48.64%, rgba(131, 89, 227, 0.5) 100%)", 
      width: 359, height:635, left: 24, top:84, box:"0px 20px 30px rgba(0, 0, 0, 0.25)", borderRadius:20, shadowOpacity: 1, borderColor:"black"}}>
    <Text style={{left: 25, fontSize:25, top:30, textAlign: "justify", fontWeight:"normal", color:"black", marginBottom:8}}>Contact Us {"\n"} </Text>
    <View style={{backgroundColor:"#c4c4c4", top:5, marginLeft:23,paddingLeft:5,fontWeight:"normal",fontSize:10, paddingRight:10, width: screenWidth-98, height:360, fontFamily:"Poppins"}}>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>VenMe is an payment platform that utilizes the power of cryptocurrecy in order to facilitate transactions between people and machines. </Text>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>Our focus is on creating a smooth and speedy checkout experience without the need of cash, coins, and cards.</Text>
   </View>
   <Image source={require('./helpPage-image.png')} style={{height:245, width:250,marginTop:2, left:50,bottom:15}}/>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </ScrollView>
    </View>
    
    </>
    }


    else if(x == 9)
    {
    return<>
     <View style={{flex:1}}>
     <ImageBackground source={require('./background_image.png')}  resizeMode="cover" style={styles.image}>
      
      <View style={{flex:1}}>
      {/* <Image source={require('./background-image.png')} style={{ width: screenWidth, height: screenHeight }}/> */}
     
        <TouchableOpacity>
        {/* <Image source={require('./back-icon.png')} style={{height:50, width:50,marginTop:70, left:10}}/> */}
      <Text style={{fontSize:15,top:730,left:300, textAlign: "justify", fontWeight:"normal", color:"#8359E3"}} onPress={() => this.props.navigation.goBack()}> Back </Text>
      </TouchableOpacity></View></ImageBackground>
    <ScrollView style={{textAlign: "center",backgroundColor: 'rgba(0,0,0,0.05)',position:"absolute",flex:1, background:"linear-gradient(to bottom, rgba(167, 174, 249, 0.5) 0%, rgba(98, 132, 255, 0.5) 48.64%, rgba(131, 89, 227, 0.5) 100%)", 
      width: 359, height:635, left: 24, top:84, box:"0px 20px 30px rgba(0, 0, 0, 0.25)", borderRadius:20, shadowOpacity: 1, borderColor:"black"}}>
    <Text style={{left: 25, fontSize:25, top:30, textAlign: "justify", fontWeight:"normal", color:"black", marginBottom:8}}>Promotions {"\n"} </Text>
    <View style={{backgroundColor:"#c5c5c5", top:5, marginLeft:23,paddingLeft:5,fontWeight:"normal",fontSize:10, paddingRight:10, width: screenWidth-98, height:360, fontFamily:"Poppins"}}>
   <Text style={{margin: 20, fontSize:18, textAlign: 'left', textAlignVertical: 'top', color:"black", fontFamily:"Poppins"}}>Clicking on for various promotional opportunities.</Text>
   
   </View>
   <Image source={require('./helpPage-image.png')} style={{height:245, width:250,marginTop:2, left:50,bottom:15}}/>
    {/* <Text style={{top: 20, margin: 20, fontSize:20, textAlign: 'justify', textAlignVertical: 'top'}}>The Essential Machine is more advanced & safer than the typical vending machine allowing mobile payments and a smooth and faster checkout experience without the need of physical form of currencies.Our machine seeks to minimize this issue and help the regular population to perform a transaction easily.</Text> */}
    </ScrollView>
    </View>
    
    </>
    }

}

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#B0BEC5',
    borderRadius : 25
  },
  image: {
    flex: 1,
    justifyContent: "center"
  }
});