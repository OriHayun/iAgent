import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons'

const showDistance = ({ goToLocation, distance, name }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={goToLocation}>
                <Text h6 style={{ alignSelf: 'center' }} >{distance}m <Ionicons name='md-navigate' size={16} /></Text>
            </TouchableOpacity>
            <Text h4 >{name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
})

export default showDistance;