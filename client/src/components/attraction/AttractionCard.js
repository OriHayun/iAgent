import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { accountId, key } from '../../api/triposo'
import axios from 'axios';

const attractionCard = ({ attractionId, location }) => {
    const [attraction, setAttraction] = useState(null);

    useEffect(() => {
        (async function () {
            const response = await axios.get(`https://www.triposo.com/api/20190906/poi.json?location_id=${location}&id=${attractionId}&fields=all&count=20&account=${accountId}&token=${key}`)
            const obj = {
                name: response.data.results[0].name,
                imageUri: response.data.results[0].images[0].sizes.medium.url
            }
            setAttraction(obj);
        })();
    }, [])

    return (
        <>
            {attraction ?
                <View style={styles.trueContainer}>
                    <Image style={styles.image} source={{ uri: attraction.imageUri }} />
                    <Text style={styles.name}>{attraction.name}</Text>
                </View>
                :
                <View style={styles.falseContainer}>
                    <ActivityIndicator size='small' />
                    <Image style={{
                        height: 80,
                        width: 140,
                        resizeMode: 'contain',
                    }} source={require('../../../assets/iAgentLogo.png')} />
                </View>
            }
        </>
    );
};

const styles = StyleSheet.create({
    trueContainer: {
        marginLeft: 20
    },
    falseContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
});

export default attractionCard;