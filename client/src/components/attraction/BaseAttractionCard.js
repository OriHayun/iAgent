import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const baseAttractionCard = ({ attraction }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={attraction.images.length > 0  ? { uri: attraction.images[0].sizes.medium.url } : require('../../../assets/defaultImage.png')} />
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