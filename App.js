/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import StackNav from './app/StackNav';
import { BackHandler } from 'react-native'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <StackNav/>
    );
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', function () {
      return true
    })
  }
}

