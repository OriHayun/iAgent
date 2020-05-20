import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import NotificationModal from './notifigationModal';

const listNotification = ({ notification, changeNot, notKey }) => {
    const [mailBox, setMailBox] = useState('ios-mail')
    // const [showMosal, setShowModal] = useState(false);

    changeMailIcon = () => {
        setMailBox('ios-mail-open')
    }

    return (
        <View>
            <TouchableOpacity onPress={() => {
                changeNot(notKey)
                // changeMailIcon()
            }}>
                <View style={styles.row}>
                    <View style={styles.textView}>
                        <Text style={styles.title}>{notification.attractionName}</Text>
                    </View>
                    <Ionicons name={mailBox} style={styles.mailBox} />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'rgba(200,200,200,0.7)',
        marginTop: 10,
    },
    title: {
        fontSize: 18,
    },
    mailBox: {
        fontSize: 30,
    },
    textView: {
        width: Dimensions.get('screen').width - 40
    }
})

export default listNotification;