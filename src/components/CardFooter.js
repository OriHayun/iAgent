import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Zocial, MaterialIcons } from '@expo/vector-icons'
import { navigate } from '../navigationRef';

const cardFooter = ({ arrLength, handleClick, item }) => {
    return (
        <View style={styles.cardFooter}>
            {arrLength > 0 ?
                <TouchableOpacity onPress={handleClick} >
                    <Zocial name='wikipedia' size={30} />
                </TouchableOpacity>
                : null
            }
            <TouchableOpacity onPress={() => navigate('Details', { item })}>
                <MaterialIcons name='perm-device-information' size={30} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cardFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    }
})

export default cardFooter;