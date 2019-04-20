import React from 'react';
import {createStackNavigator, createAppContainer, NavigationLeafRoute as navigationState} from 'react-navigation';
import  Registration from './RegisterScreen';
import  LoginScreen from  './LoginScreen';
import  SplashScreen from  './SplashScreen';
import DrawerNav from './DrawerNav';
import DrawerButton from './DrawerButton';
const  StackNav = createStackNavigator(
    {
        Splash: {
            screen: SplashScreen,
            navigationOptions: {
                headerLeft: null
            }
        },
        Registration:{
            screen:Registration,
            navigationOptions:{
                title: 'Registration',
                headerLeft: null,
                gesturesEnabled: false

            }
        },
        LoginScreen:{
            screen:LoginScreen,
            navigationOptions:{
                title: 'LoginScreen',
                headerLeft: null,
                headerMode: 'none',
                headerVisible: false,
                gesturesEnabled: false

            }
        },


        Home:{
            screen:DrawerNav,
            navigationOptions:({navigation})=>({
                title: navigation.state.routeName?'Home':navigation.state.routeName,
                navigationState: navigation.state,
                headerLeft:<DrawerButton navigation = {navigation}/>
            })
        },

    }
);
export default createAppContainer(StackNav);
