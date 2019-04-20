
/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import {
    USER_INFO_COLUMN,
    REGISTERED_FLAG,
} from './costom/Constants';
import { CustomButton, Card, CardItem, Input, Spinner } from './components';

import DBUserHandler  from './costom/DBUserHandler' ;
import {Alert} from "react-native";

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            password:'',
            show:false
        };
    }

    _successRegistration = async (value) => {
        try {
            AsyncStorage.setItem(REGISTERED_FLAG, value)
                .then(token => {
                    this.setState({
                        show: false,
                    });
                    this.props.navigation.navigate('Home');
                });
            await AsyncStorage.setItem(REGISTERED_FLAG, value);


        } catch (e) {
            // saving error
            this.setState({
                show: false,
            });
            this.props.navigation.navigate('Home');

        }
    }
    _register_user = () => {

        let parseUserData=()=>{
         return  JSON.stringify(this.state);

        }
        if(this.state.userName == "" || this.state.password == ""  || this.state.firstName == "" || this.state.lastName == "" ){
            Alert.alert("Please Fill all fields  ");
        }
        else{
            this.setState({
                show: true,
            });
            let userMetaType = USER_INFO_COLUMN;
            let DBUser = DBUserHandler.getInstance();

            DBUser.setUserInfo(userMetaType , parseUserData() ).then(res => {
                console.log(res);
                this._successRegistration(parseUserData()).then(

                )
            },(error) => {
                console.log(error);
                this.props.navigation.navigate('Home');

            })
        }


    };
    _renderButton() {
        if (this.state.show) {
            return <Spinner />;
        }
        return (
            <CustomButton onPress={this._register_user.bind(this)}>Sign Up</CustomButton>
        );
    }
    render(){
        return (
            <Card>
                <CardItem>
                    <Input
                        label='UserName'
                        placeholder='Enter UserName'
                        secureTextEntry={false}
                        onChangeText={(userName) => this.setState({ userName  }) }
                    />
                </CardItem>
                <CardItem>
                    <Input
                        label='First Name'
                        placeholder='Enter your First Name'
                        secureTextEntry={false}
                        onChangeText={(firstName) => this.setState({ firstName  }) }
                    />
                </CardItem>
                <CardItem>
                    <Input
                        label='Last Name'
                        placeholder='Enter your Last Name '
                        secureTextEntry={false}
                        onChangeText={(lastName) => this.setState({ lastName  }) }
                    />
                </CardItem>
                <CardItem>
                    <Input
                        label='Password'
                        placeholder='Enter your Password'
                        secureTextEntry
                        onChangeText={(password) => this.setState({ password }) }
                    />
                </CardItem>

                <CardItem>

                    { this._renderButton() }
                </CardItem>


            </Card>

        );
    }
}