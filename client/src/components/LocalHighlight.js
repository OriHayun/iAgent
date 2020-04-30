import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Text } from 'react-native-elements';
import ShowDistance from './ShowDistance';
import CardImage from './CardImage';
import Score from './Score';
import CardFooter from './CardFooter';
import Spacer from '../components/spacer';
import { getDistance } from 'geolib';
import openMap from 'react-native-open-maps';


const localHighlight = ({ myCoords, item, arrLength, uri, name, score }) => {
    const [distance, setDistance] = useState(0);
    const toCoords = {
        latitude: item.coordinates.latitude,
        longitude: item.coordinates.longitude
    }
    if (item.content.attribution.length > 0) {
        var wikipediaUrl = item.content.attribution[0].url
    }

    handleClick = () => {
        Linking.canOpenURL(wikipediaUrl).then(supported => {
            if (supported) {
                Linking.openURL(wikipediaUrl);
            } else {
                console.log("Don't know how to open URI: " + wikipediaUrl);
            }
        });
    };

    goToLocation = () => {
        openMap(toCoords);
    }

    useEffect(() => {
        setDistance(getDistance(myCoords, toCoords))
    })

    return (
        <Spacer>
            <View style={styles.container}>
                <View style={styles.card}>
                    <CardImage
                        arrLength={arrLength}
                        uri={uri}
                    />
                    <ShowDistance
                        name={name}
                        distance={distance}
                        goToLocation={goToLocation}
                    />
                    <Score
                        grade={score}
                    />
                    <CardFooter
                        arrLength={item.content.attribution.length}
                        handleClick={handleClick}
                        item={item}
                    />
                </View>
            </View>
        </Spacer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        marginTop: 35,
        height: 350,
        width: 300,
        borderColor: 'rgba(0,0,0,0.7)',
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,0.6)',
        shadowOffset: { width: 5, height: 5 },
        shadowColor: 'black',
        shadowOpacity: 0.9,
        borderRadius: 10
    }
})

export default localHighlight;