import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const score = ({ grade }) => {
    return (
        <View style={styles.scoreView}>
            <Text h4 style={styles.scoreText}>{grade}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    scoreView: {
        backgroundColor: '#0039e6',
        height: 30,
        width: 60,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreText: {
        color: 'white'
    }
})

export default score;