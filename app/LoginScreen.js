/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';
import {Alert , View  } from 'react-native';
import {
    USER_INFO_COLUMN
} from './costom/Constants';
import DBUserHandler  from './costom/DBUserHandler' ;

import { CustomButton, Card, CardItem, Input, Spinner } from './components';

export default class LoginScreen extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            userName: '',
            password:'',
            show:false
        };

    }
    static navigationOptions = ({ navigation }) => {
       header:null
    };
    _loginUser = () => {

        let userMetaType = USER_INFO_COLUMN;
        let DBUser = DBUserHandler.getInstance();
        if(this.state.userName == "" || this.state.password == ""  ){
            Alert.alert("Please Fill all fields  ");
        }
         if(this.state.userName.length > 0 && this.state.password.length > 0){
             this.setState({
                 show: true,
             });
             DBUser.getUserInfo(userMetaType ).then(res => {
                 this.setState({
                     show: false,
                 });

                 console.log(res);
                 // check if user name && password equal
                 if(this.state.userName != res.userMetaValue.userName || this.state.password != res.userMetaValue.password  ){
                     Alert.alert("invalid username or password");

                 }else{
                     this.props.navigation.navigate('Home');

                 }

             },(error) => {
                 console.log(error);
                 this.setState({
                     show: false,
                 });
             })
         }

    };

    _renderButton() {
        if (this.state.show) {
            return <Spinner />;
        }
        return (
            <CustomButton onPress={this._loginUser.bind(this)}>Login</CustomButton>
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