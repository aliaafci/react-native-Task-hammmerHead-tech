/*Custom Text*/
import React from 'react';
import { Text, StyleSheet } from 'react-native';
const CustomHint = props => {
    return <Text style={styles.text}>{props.text}</Text>;
};

const styles = StyleSheet.create({
    text: {
        color: '#3cc4dd',
        fontSize: 18,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        fontWeight: 'bold'
    },
});

export { CustomHint }
