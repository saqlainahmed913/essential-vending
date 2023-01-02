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
import {VictoryBar, VictoryChart, VictoryGroup} from 'victory-native';
import CardPage from './card.js';
import {StackNavigator} from 'react-navigation';
import {Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {firebaseApp} from '../config/firebase';
import 'intl';
import 'intl/locale-data/jsonp/en-ZA';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const todaysDate = new Intl.DateTimeFormat('en-US', {
  month: '2-digit',
  day: '2-digit',
  year: 'numeric',
})
  .format(Date.now())
  .split('/');

const newDate = new Date(
  Date.UTC(todaysDate[0], todaysDate[1] - 1, todaysDate[2]),
).getTime();

const currentMonth = new Date(
  Date.UTC(todaysDate[0], todaysDate[1] - 1, '01'),
).getTime();

var amount = 0;

export default class reportAdmin extends React.Component {
  state = {
    receipts: [],
    totalSales: '',
    todaysDate: [],
    dict: {},
    totalMonthlyUsers: [],
  };

  componentDidMount() {
    /* 
        Bar chart for total sales per vending machine
   */
    firebaseApp
      .firestore()
      .collection('receipts')
      .where('timestamp', '<=', Date.now())
      .where('timestamp', '>=', newDate)
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        this.setState({receipts: data});
        const amt = data.map(doc => (amount += doc['amount']));
        console.log(JSON.stringify(this.state.receipts));
        console.log(Date.now());
      });
    /* 
        Total purchases per day
    */
    firebaseApp
      .firestore()
      .collection('receipts')
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        // const amt = data.map(doc => (amount += doc['amount']));
        // const amt = data.map(doc => doc['vendingMachineNumber']);
        var dictionary = {};
        for (let i = 0; i < data.length; i++) {
          var key = data[i].vendingMachineNumber;
          console.log(key);
          if (key in dictionary) {
            var tempAmount = dictionary[key] + data[i].amount;
            dictionary[key] = tempAmount;
          } else {
            dictionary[key] = data[i].amount;
          }
        }
        this.setState({dict: dictionary});
        console.log(this.state.dict);
      });

    /* 
         Number of new monthly users
    */

    firebaseApp
      .firestore()
      .collection('users')
      .where('timestamp', '<=', Date.now())
      .where('timestamp', '>=', currentMonth)
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        this.setState({totalMonthlyUsers: data});
        console.log(JSON.stringify(this.state.totalMonthlyUsers));
      });
  }
  render() {
    return (
      <>
        <View style={{flex: 1}}>
          <ImageBackground
            source={require('./background_image.png')}
            resizeMode="cover"
            style={styles.image}>
            <ScrollView
              style={{
                textAlign: 'center',
                backgroundColor: 'rgba(0,0,0,0.05)',
                position: 'absolute',
                flex: 1,
                background:
                  'linear-gradient(to bottom, rgba(167, 174, 249, 0.5) 0%, rgba(98, 132, 255, 0.5) 48.64%, rgba(131, 89, 227, 0.5) 100%)',
                width: screenWidth - 10,
                height: screenHeight - 50,
                left: 5,
                top: 20,
                bottom: 10,
                box: '0px 20px 30px rgba(0, 0, 0, 0.25)',
                borderRadius: 20,
                shadowOpacity: 1,
                borderColor: 'black',
              }}>
              <Text
                style={{
                  fontSize: 25,
                  textAlign: 'center',
                  color: 'black',
                  top: 10,
                }}>
                {' '}
                Bar Chart for Total Sales Per Machine{' '}
              </Text>
              <BarChart
                data={{
                  // labels: ['VM1', 'VM2', 'VM3', 'VM4', 'VM5'],
                  // datasets: [{data: [10, 20, 50, 40, 20]}],
                  labels: Object.keys(this.state.dict),
                  datasets: [{data: Object.values(this.state.dict)}],
                }}
                width={screenWidth - 20}
                height={230}
                yAxis={{
                  left: {granularityEnabled: true, granularity: 1},
                  right: {granularityEnabled: true, granularity: 1},
                }}
                fromNumber={0}
                fromZero={true}
                withInnerLines={false}
                xAxis={{drawGridLines: false}}
                drawGridBackground={false}
                yAxisLabel={'$'}
                chartConfig={{
                  backgroundColor: 'yellow',
                  backgroundGradientFrom: '#fff',
                  backgroundGradientTo: '#fff',
                  fillShadowGradient: '#8359E3',
                  fillShadowGradientOpacity: 10,
                  color: (opacity = 1) => '#023047',
                  decimalPlaces: 2,
                  style: {
                    borderRadius: 12,
                    padding: 10,
                    left: 5,
                  },
                }}
                style={{left: 5, borderRadius: 10, top: 20}}
              />
              <Text
                style={{
                  fontSize: 25,
                  textAlign: 'center',
                  marginTop: 50,
                  color: 'black',
                }}>
                {' '}
                Total Purchases Per Day{' '}
              </Text>
              <View
                style={{
                  left: (screenWidth - 260) / 2,
                  marginTop: 10,
                  height: 250,
                  width: 250,
                  top: 0,
                  borderRadius: 35,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    marginLeft: 25 / 2,
                    height: 225,
                    width: 225,
                    top: 0,
                    borderRadius: 300,
                    backgroundColor: '#8359E3',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      textAlign: 'center',
                      color: '#ccc',
                      bottom: 10,
                    }}>
                    {/* 5th April 2022 */}
                    {new Intl.DateTimeFormat('en-US', {
                      month: 'long',
                      day: '2-digit',
                      year: 'numeric',
                      // hour: '2-digit',
                      // minute: '2-digit',
                      // second: '2-digit',
                    }).format(Date.now())}
                  </Text>
                  <Text
                    style={{fontSize: 50, textAlign: 'center', color: '#fff'}}>
                    {/* $45 */}
                    {this.state.receipts.length}
                  </Text>
                </View>
              </View>

              <Text
                style={{
                  fontSize: 25,
                  textAlign: 'center',
                  marginTop: 50,
                  color: 'black',
                }}>
                {' '}
                Monthly New Users{' '}
              </Text>
              <View
                style={{
                  left: (screenWidth - 260) / 2,
                  marginTop: 10,
                  marginBottom: 40,
                  height: 250,
                  width: 250,
                  top: 0,
                  borderRadius: 35,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    textAlign: 'left',
                    color: 'black',
                    left: 20,
                    top: 20,
                  }}>
                  Month
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'left',
                    color: '#ccc',
                    left: 20,
                    top: 20,
                  }}>
                  {/* April */}
                  {new Intl.DateTimeFormat('en-US', {
                    month: 'long',
                  }).format(Date.now())}
                </Text>

                <View style={{}}>
                  <ImageBackground
                    source={require('./gradient_circle-modified.png')}
                    style={{height: 150, width: 150, marginTop: 20, left: 90}}>
                    <Text
                      style={{
                        fontSize: 50,
                        textAlign: 'center',
                        top: 40,
                        color: '#fff',
                      }}>
                      {this.state.totalMonthlyUsers.length}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        textAlign: 'center',
                        top: 30,
                        color: '#ccc',
                      }}>
                      Users
                    </Text>
                  </ImageBackground>
                </View>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      </>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    flex: 1,
  },
});
