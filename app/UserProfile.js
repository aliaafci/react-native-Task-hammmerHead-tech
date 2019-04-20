/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';
import { View, Text, Alert } from 'react-native';
import {HintContainer, CardItem, CustomHint, CustomText, Spinner, CustomButton} from './components';
import {
    USER_INFO_COLUMN
} from './costom/Constants';
import DBUserHandler  from './costom/DBUserHandler' ;
export default class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            show:false
        };
    }

    getUserInfo = () => {
        let userMetaType = USER_INFO_COLUMN;
        this.setState({
            show: true
        });
        let DBUser = DBUserHandler.getInstance();
 // TODO use Redex to manage state
        DBUser.getUserInfo(userMetaType ).then(res => {
            console.log(res);
            if(res != {} && res.userMetaValue){
                this.setState({
                    firstName: res.userMetaValue.firstName,
                });
                this.setState({
                    userName: res.userMetaValue.userName,
                });
                this.setState({
                    lastName: res.userMetaValue.lastName,
                });
            }
            this.setState({
                show: false
            });
        },(error) => {
            //TODO make Error handler
            console.log(error);

        })
    };




    componentDidMount(): void {
        this.getUserInfo();
        // this._getBearer();
    }
    _renderProfileInfo()  {
        if (this.state.show) {
            return <Spinner />;
        }
        return (
            <HintContainer>
                <View style={{flexDirection: 'row'}}>
                    <CustomHint text= 'User name :'/>
                    <CustomText text={this.state.userName}/>

                </View>
                <View style={{flexDirection: 'row'}}>
                    <CustomHint text= 'First Name :'/>
                    <CustomText text={this.state.firstName}/>

                </View>
                <View style={{flexDirection: 'row'}}>
                    <CustomHint text= 'Last  Name :'/>
                    <CustomText text={this.state.lastName}/>

                </View>

            </HintContainer>        );
    }
    render() {
        return (
            this._renderProfileInfo()


        );
    }
}