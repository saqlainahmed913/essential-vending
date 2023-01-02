import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import HomeScreen from "../Screens/Homepage";
import Login from "../Screens/LoginPage";
import SignUp from "../Screens/SignUp";

const screens = {
    Home: {
        screen: HomeScreen
    },
    SignUp : {
        screen: SignUp
    },
    Login : {
        screen: Login
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack)