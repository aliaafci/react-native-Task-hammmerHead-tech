/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import DBUserHandler  from './app/costom/DBUserHandler' ;
import App from './App';

let DBUser = DBUserHandler.getInstance();

DBUser.initiateDB().then(res => {

    console.log(res);
},(error) => {
    console.log(res);

})

AppRegistry.registerComponent(appName, () => App);
