/*Home Screen With buttons to navigate to diffrent options*/
import React from 'react';
import { View, Alert ,ScrollView} from 'react-native';
import { Buffer } from 'buffer'
import Tweet from './Tweet';
import twitter from 'react-native-simple-twitter'
import {
    CHECK_TOKEN_API,
    FETCH_TWEETS_API,
    CONSUMER_SECRET, CONSUMER_KEY,
    CONSUMER_TOKEN,
    CONSUMER_TOKEN_SECRET,
    SIGNITURE_KEY
} from './costom/Constants';
import {CardItem, CustomButton, Spinner} from "./components";
export default class TimeLine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           show:false,
            tweets:[],
            tweetObject: {
                "id": 1119330669455454200
            }


        };
    }

    _refreshTweets=()=>{

        let statusCopy = Object.assign({}, this.state);
        statusCopy.show = true;
        this.setState(statusCopy);
        twitter.api('GET','statuses/user_timeline.json').then((res)=>{
            if(typeof res == 'object' && res.length > 0){
                this.setState({
                    show: false,
                });
                this.setState({
                    tweets: res,
                });

            }

        }) .catch((error) => {
            console.error(error);
            this.setState({
                show: false,
            });
            Alert.alert('Alert Title failure' + JSON.stringify(error))
        });

    }
    _loadTweets = () => {
        twitter.setConsumerKey(CONSUMER_KEY,CONSUMER_SECRET);
        twitter.setAccessToken(CONSUMER_TOKEN,CONSUMER_TOKEN_SECRET);
        this._refreshTweets()

    };

    componentDidMount(): void {
        this._loadTweets();
    }
    _renderTweets() {
        if (this.state.show) {
            return <Spinner />;
        }
        if(this.state.tweets.length > 0){
            return (

                this.state.tweets.map((val, key) => {
                    return (
                        <Tweet key={val.id} tweetId={val.id_str}/>
                    );
                })        );
        }

    }

    render() {
        return (
            <View>
                <CardItem>
                    <CustomButton onPress={this._refreshTweets.bind(this)}>Refresh </CustomButton>

                </CardItem>
                <CustomButton/>
                <ScrollView>
                    { this._renderTweets() }

                </ScrollView>


            </View>

        );
    }
}