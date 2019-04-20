
import React from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,

    TouchableHighlight,
    TouchableOpacity,
} from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'



const userImage = {uri : 'https://pbs.twimg.com/profile_images/951903664809050114/Grfd40ih_400x400.jpg'}
Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}
String.prototype.capitalizeFirstLetter = function() {
    return `${this.substr(0,1).toUpperCase()}${this.substr(1)}`;
}
export default class Tweet extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            tweetObject:props.tweetObject,
            show:false
        }

        this.tweetPressed = this
            .tweetPressed
            .bind(this)

        this.retweet = this.retweet.bind(this)
        this.like = this.like.bind(this)
    }

    tweetPressed(pressed = false) {

        this.setState({touched: pressed})
    }

    retweet(){

        const {retweeted, retweets} = this.state


        if (retweeted)
            this.setState({retweeted: false, retweets: retweets-1})


        else this.setState({retweeted: true, retweets: retweets+1})
    }
    like(){
        const {liked, likes} = this.state


        if (liked)
            this.setState({liked: false, likes: likes-1})


        else this.setState({liked: true, likes: likes+1})
    }

    render() {

        const {navigation} = this.props


        return(
            <TouchableHighlight onPress={()=>navigation.navigate('Thread')} onPressIn={() => this.tweetPressed(true)} onPressOut={() => this.tweetPressed()}>
                <View key={this.state.tweetObject.id} style={styles.container}>
                    { !this.state.tweetObject.in_reply_to_status_id ?
                        <View style={styles.isReplyContainer}>

                            <View style={{flex:0.23, borderColor:"red", borderWidth:0, alignItems:"flex-end"}}>
                                <EvilIcons  name={'retweet'} size={25} color={'rgb(136, 153, 166)'}/>
                            </View>
                            <Text style={{flex:0.5, color:"rgb(136, 153, 166)"}}>{"this.state.tweetObject.retweetedBy"} {this.state.tweetObject.retweeted}</Text>
                        </View>
                        :
                        true
                    }
                    <View style={styles.innerContainer}>

                        <View style={styles.photoContainer}>
                            <View style={styles.innerPhotoContainer}>
                                <TouchableOpacity

                                    onPress={() => navigation.navigate('Profile')}>
                                    <Image
                                        source={ {uri :  this.state.tweetObject.user.profile_image_url} }
                                        style={styles.photo}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.info}>

                            <View style={styles.userDetails}>
                                <Text style={styles.userName}>{this.state.tweetObject.user.name}
                                    <Text style={styles.userHandleAndTime}>{this.state.tweetObject.user.name} · {this.state.tweetObject.created_at}</Text>
                                </Text>
                            </View>
                            <View style={styles.tweetTextContainer}>
                                <Text style={styles.tweetText}>{this.state.tweetObject.text}</Text>

                            </View>
                            <View style={styles.tweetActionsContainer}>
                                <TouchableOpacity style={styles.commentButton}>
                                    <EvilIcons name={'comment'} style={styles.commentButtonIcon} size={25} color={'rgb(136, 153, 166)'}/>
                                    <Text style={styles.commentsCount}>this.state.tweetObject.text</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> this.retweet()}  style={styles.retweetButton}>
                                    <EvilIcons name={'retweet'} size={25} color={(this.state.tweetObject.retweeted) ? "rgb(23, 191, 99)":'rgb(136, 153, 166)'}/>
                                    <Text style={[styles.retweetButtonIcon, {color: this.state.tweetObject.retweeted ? "rgb(23, 191, 99)" : "rgb(136, 153, 166)",fontWeight: this.state.tweetObject.retweeted ? "bold" : "300",}]}>{this.state.tweetObject.retweet_count}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> this.like()}  style={styles.likeButton}>
                                    { this.state.tweetObject.favorited ?
                                        <Entypo name={'heart'} size={this.state.tweetObject.favorite_count } style={{marginLeft:4}} color={this.state.tweetObject.favorited ? "rgb(224, 36, 94)" : 'rgb(136, 153, 166)'}/>
                                        :
                                        <EvilIcons name={'heart'} size={this.state.tweetObject.favorited} color={this.state.tweetObject.favorite_count ? "rgb(224, 36, 94)" : 'rgb(136, 153, 166)'}/>

                                    }
                                    <Text style={[styles.likeButtonIcon, {color: this.state.tweetObject.favorited ? "rgb(224, 36, 94)" : "rgb(136, 153, 166)",fontWeight: this.state.tweetObject.favorited ? "bold" : "300",}]}>{this.state.tweetObject.favorite_count}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.shareButton}>

                                    <SimpleLineIcons name={'share'} size={16} color={'rgb(136, 153, 166)'}/>

                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </TouchableHighlight>

        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderBottomColor: "black",
        borderBottomWidth: 0.5,
        flexDirection: "column",
        backgroundColor: "#1b2836"
    },
    isReplyContainer: {
        flex: 1,
        borderColor: "green",
        flexDirection: "row",
        borderWidth: 0,
        height: 20,
        marginTop: 5
    },
    innerContainer: {
        flex: 1,
        borderColor: "green",
        flexDirection: "row",
        borderWidth: 0,
        height: "auto"
    },
    photoContainer: {
        flex: 0.23,
        borderColor: "yellow",
        flexDirection: "column",
        borderWidth: 0
    },
    innerPhotoContainer: { height: 100, alignItems: "center" },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginTop: 15
    },
    info: {
        flex: 0.77,
        borderColor: "yellow",
        flexDirection: "column",
        borderWidth: 0
    },
    userDetails: {
        flex: 1,
        borderColor: "blue",
        borderWidth: 0,
        marginBottom: 5
    },
    userName: { color: "white", fontWeight: "bold" },
    userHandleAndTime: {
        color: "rgb(136, 153, 166)",
        marginLeft: 5
    },
    tweetTextContainer: { flex: 1, borderColor: "blue", borderWidth: 0 },
    tweetText: { color: "white", paddingRight: 10 },
    tweetActionsContainer: {
        flex: 1,
        borderColor: "blue",
        borderWidth: 0,
        marginTop: 5,
        flexDirection: "row",
        paddingBottom: 5
    },
    commentButton: {
        paddingLeft: 0,
        flex: 0.25,
        alignItems: "center",
        flexDirection: "row",
        borderColor: "red",
        borderWidth: 0
    },
    commentButtonIcon: {
        margin: 0,
        marginLeft: -4,
        borderColor: "red",
        borderWidth: 0
    },
    commentsCount: {
        position: "absolute",
        left: 27,
        color: "rgb(136, 153, 166)",
        marginLeft: -4
    },
    retweetButton: {
        padding: 5,
        flex: 0.25,
        alignItems: "center",
        flexDirection: "row",
        borderColor: "red",
        borderWidth: 0
    },
    retweetButtonIcon: {
        position: "absolute",
        left: 27,

        marginLeft: 3
    },
    likeButton: {
        padding: 5,
        flex: 0.25,
        alignItems: "center",
        flexDirection: "row",
        borderColor: "red",
        borderWidth: 0
    },
    likeButtonIcon: {
        position: "absolute",
        left: 27,

        marginLeft: 3
    },
    shareButton: {
        padding: 5,
        flex: 0.25,
        alignItems: "center",
        flexDirection: "row",
        borderColor: "red",
        borderWidth: 0
    }
});
