import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import openMap from 'react-native-open-maps';

const results = ({ name, coordinates, phone, facebook, destination }) => {

    facebookIt = () => {
        Linking.canOpenURL(facebook).then(supported => {
            if (supported) {
                Linking.openURL(facebook);
            } else {
                console.log("Don't know how to open URI: " + facebook);
            }
        });
    };

    googleIt = () => {
        const url = `https://www.google.com/search?q=${name}+${destination}`
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => openMap(coordinates)}>
                    <Ionicons name="md-navigate" size={24} color="black" />
                </TouchableOpacity>
                {phone ?
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${phone}`)}>
                        <AntDesign name="phone" size={24} color="green" />
                    </TouchableOpacity>
                    : null
                }
                {facebook ?
                    <TouchableOpacity onPress={facebookIt}>
                        <AntDesign name="facebook-square" size={24} color="blue" />
                    </TouchableOpacity>
                    : null
                }
                <TouchableOpacity onPress={googleIt}>
                    <AntDesign name="google" size={24} color="#ff0000" />
                </TouchableOpacity>
            </View>
        </View >
    );
};


const styles = StyleSheet.create({
    container: {
        height: 90,
        width: Dimensions.get('screen').width,
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        justifyContent: 'space-around'
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        alignSelf: 'center'
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    }
})


export default results