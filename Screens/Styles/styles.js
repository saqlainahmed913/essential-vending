import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
const windowHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundImage: require('./bg.png'),

    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  toptext1: {
    fontSize: 40,
    color: 'black',
    textAlign: 'left',
    fontFamily: 'serif',
    marginTop: 52,
  },
  toptext2: {
    fontSize: 40,
    color: 'black',
    textAlign: 'left',
    fontFamily: 'serif',
  },
  burgerImage: {
    left: 28,
    width: 320,
    height: 278.05,
  },
  loginText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 20,
    left: 31,
  },
  emailText: {
    fontFamily: 'Poly-Regular',
    fontSize: 20,
    width: width - 120,
    color: 'rgba(0,0,0,0.7)',
    left: 25,
  },
  smallIcon: {left: 5, height: 25, width: 25, marginRight: 10},
  forgotText: {
    fontFamily: 'Barlow',
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 20,
    right: 29,
  },
  accountText: {
    fontFamily: 'Barlow',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 36,
  },
  textBox: {
    display: 'flex',
    flexDirection: 'row',
    elevation: 0,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 10,
    alignItems: 'center',
    //padding: 8,
    width: width - 58,
    height: 44,
    left: 29,
    marginTop: 10,
  },
  Loginbutton2: {
    backgroundColor: '#8359E3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 320,
    left: 45,
    height: 44,
    marginTop: 10,
    justifyContent: 'center',
  },
  loginbutton: {
    backgroundColor: '#8359E3',
    padding: 14.88,
    // borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    width: screenWidth - 54,
    //left: 31,
    marginTop: 10,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  appleButton: {
    backgroundColor: 'white',
    padding: 14.88,
    borderRadius: 5,
    //alignSelf: 'right',
    alignItems: 'center',
    width: '40%',
    //marginTop: 20,
  },
  helpIcon: {
    height: 20,
    width: 20,
    left: 8.33,
    justifyContent: 'flex-end',
    marginTop: 20,
    marginBottom: 30,
  },
  errorText: {
    color: '#ff0000',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '600',
  },
  validateText: {
    color: '#DC143C',
    fontSize: 15,
    fontWeight: 'bold',
    left: 40,
    marginTop: 10,
  },
  title: {
    width: 297,
    height: 99,
    top: 40,
    left: 39,
    fontFamily: 'sans-serif',
    fontSize: 38.57,
  },
  button: {
    backgroundColor: '#8359E3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 320,
    left: 45,
    height: 44,
    marginTop: 10,
    justifyContent: 'center',
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
    left: 110,
    // display: inline-block
  },
  dot2: {
    justifyContent: 'flex-start',
    marginTop: 25,
    height: 7,
    width: 7,
    backgroundColor: '#000000',
    borderRadius: 50,
    alignContent: 'center',
    left: 130,
  },
  dot3: {
    justifyContent: 'flex-start',
    marginTop: 25,
    height: 7,
    width: 7,
    backgroundColor: '#000000',
    borderRadius: 50,
    alignContent: 'center',
    left: 130,
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
    flexDirection: 'row',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    left: 150,
    top: 15,
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
  },
  icon: {
    height: 60,
    width: 60,
  },
  forgotTitleText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50
  },
  resetpasswordButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    width: 200,
    //left: 31,
    marginTop: 40,
  },
  vendingMachine: {
    height: 400,
    width: width - 40,
    marginTop: 60,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  successText: {
    fontSize: 30,
    fontWeight: '500',
    color: 'black',
    fontWeight: '300',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 40,
  },
});

export default styles;
