import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import ProfileComboBox from './ProfileComboBox';
import axios from 'axios';

const tripProfileCard = ({ trip }) => {
    const [flagUri, setFlagUri] = useState('');


    useEffect(() => {
        (async function TwoLetterCuntryCode() {
            const codeResponse = await axios.get(`http://proj.ruppin.ac.il/igroup4/prod/api/flag/city/${trip.Destination}`)
            setFlagUri(`https://www.countryflags.io/${codeResponse.data}/shiny/64.png`)
        })();
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ flex: 0.5 }}>
                {flagUri != '' ?
                    <Text h4 style={{ marginTop: 30 }}>
                        {trip.Destination}
                        <Text> </Text>
                        <Image source={{ uri: flagUri }} style={styles.flag} />
                    </Text>
                    : <Text h4>{trip.Destination}</Text>
                }
            </View>
            <View style={{ flex: 0.5 }}>
                <ProfileComboBox
                    tripProfileId={trip.TripProfileID}
                    tripId={trip.TripID}
                />
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: Math.round(Dimensions.get('window').width) - 55,
        alignSelf: 'center',
        justifyContent: 'space-around',
        paddingBottom: 20
    },
    flag: {
        height: 16,
        width: 20,
        marginTop: 8,
        marginLeft: -15
    }
});

export default tripProfileCard;