import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Entypo, } from '@expo/vector-icons';

const chatHedder = ({ agentImage, agentPhone, agentMail }) => {

    handlePhoneClick = () => {
        Linking.openURL(`tel:${agentPhone}`)
    }
    handleMailClick = () => {
        Linking.openURL(`mailto:${agentMail}`)
    }

    return (
        <View style={styles.header}>
            <Image style={styles.image} source={agentImage} />
            <Text style={styles.text}>   היי, איך אוכל לעזור ?</Text>
            <View style={styles.iconView}>
                <TouchableOpacity style={styles.touchableOpacity} onPress={handleMailClick}>
                    <Entypo name="email" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.touchableOpacity} onPress={handlePhoneClick}>
                    <Entypo name="phone" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#dddce1',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },
    image: {
        height: 40,
        width: 40,
        borderRadius: 40,
        marginLeft: 18
    },
    text: {
        fontSize: 18,
        fontWeight: '800',
        alignSelf: 'center'
    },
    iconView: {
        flexDirection: 'row',
        marginLeft: 40
    },
    touchableOpacity: {
        padding: 10
    }

})

export default chatHedder;