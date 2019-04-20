import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ImageBackground  } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Spinner } from './components';

import {
  REGISTERED_FLAG
} from './costom/Constants';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgb(42, 55, 68)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
    paddingTop: 10
  },
  image: {
    width: '100%', height: '100%',
    flex: 1,
    justifyContent: 'center'
  }
});

class SplashScreen extends Component {

  componentDidMount() {

    this._checkIsRegistered().then(

    );
  }

    //Added this dummy method to cause a delay just to see the splash
  _navigate(screen) {
    setTimeout(() => {
      this.props.navigation.navigate(screen);
    }, 2000 );

  }
  _checkIsRegistered = async () => {
    try {
      AsyncStorage.getItem(REGISTERED_FLAG)
          .then(token => {
            if (token) {
              this._navigate('LoginScreen');
            }else {
              this._navigate('Registration');
            }
          });
      // const value = await AsyncStorage.getItem('registered')
      // if(value !== null) {
      //   this._navigate('LoginScreen');
      // }else{
      //   this._navigate('Registration');
      //
      // }
    } catch(e) {
      this._navigate('Registration');
    }
  }
  render(){
    return (
      <View style={styles.container}>
        <ImageBackground  source={require('./res/splash.png')} style={styles.image}>
        <Spinner  />
        <Text style={styles.loadingText}>Loading ...</Text>
        </ImageBackground >
      </View>
    );
  }
}

export default SplashScreen;
