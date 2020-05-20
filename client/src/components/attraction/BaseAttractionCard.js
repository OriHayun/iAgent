import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const baseAttractionCard = ({ attraction, score }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={attraction.image != '' ? { uri: attraction.image } : require('../../../assets/defaultImage.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 20
    },

    image: {
        width: 250,
        height: 120,
        borderRadius: 4,
        marginBottom: 5
    },
    name: {
        fontWeight: 'bold',
    }
})

export default baseAttractionCard;