import React from 'react';
import {createDrawerNavigator, NavigationActions , DrawerActions} from 'react-navigation';
import  UserProfile from './UserProfile';
import  LoginScreen from  './LoginScreen';
import TimeLine from './timeLine';
import { Image , StyleSheet } from 'react-native';
import DrawerButton from "./StackNav";

const  DrawerNav = createDrawerNavigator(
    {
        Tweets:{
            screen:TimeLine,
            navigationOptions: {
                drawerLabel: 'TimeLine',
                headerTitle:'TimeLine',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('./icons/tweets.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
                ),
            }
        },
        UserProfile:{
            screen:UserProfile,
            navigationOptions: {
                drawerLabel: 'Profile',
                headerTitle:'Profile',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('./icons/profileIcon.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
                ),
            }
        },
        SignOut:{
            screen:LoginScreen,
            navigationOptions: {
                drawerLabel: 'SignOut',
                headerTitle:'SignOut',
                drawerIcon: ({ tintColor }) => (
                    <Image
                        source={require('./icons/logoutIcon.png')}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />
                ),

            }
        }
    }
);
const styles = StyleSheet.create({
        icon:{
            width:24,
            height:24
        }
    }
)
export default DrawerNav;
