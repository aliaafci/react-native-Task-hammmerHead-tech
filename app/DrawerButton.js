import React  from 'react';

import { StyleSheet, TouchableHighlight, Image } from 'react-native';
export default class DrawerButton extends React.Component {
    _onDrawerButtonPress =()=>{
        console.log(this.props.navigation);
        console.log(this.props.navigation.getScreenProps());


        this.props.navigation.openDrawer();
    }
    render() {
        return (<TouchableHighlight style={styles.wrapper}
                                    onPress={this._onDrawerButtonPress.bind(this)}>
            <Image
                style={ styles.icon }
                source={require('./icons/menu.png')}
            />
        </TouchableHighlight>);
    }
}


const styles = StyleSheet.create({
         icon:{
             width:24,
             height:24
         },
    wrapper: {
     marginLeft:10
    }
       }
)
