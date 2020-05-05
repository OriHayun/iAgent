import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Text } from 'react-native-elements';
import ProfileComboBox from './ProfileComboBox';
import axios from 'axios';

const tripProfileCard = ({ trip }) => {
    console.log(trip)
    const [flagUri, setFlagUri] = useState('');


    useEffect(() => {
        (async function TwoLetterCuntryCode() {
            const codeResponse = await axios.get(`http://proj.ruppin.ac.il/igroup4/prod/api/flag/city/${trip.Destination}`)
            setFlagUri(`https://www.countryflags.io/${codeResponse.data}/shiny/64.png`)
        })();
    }, [])

    return (
        <View style={styles.container}>
            <Text h4>{trip.Destination} </Text>
            <View style={{ marginLeft: -15 }}>
                {flagUri != '' ?
                    <Image source={{ uri: flagUri }} style={styles.flag} />
                    : null
                }
                <Text h4>{trip.destination} </Text>
            </View>
            {/* <ProfileComboBox
                profileName={trip.profileName}
                tripId={trip.id}
            /> */}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: Math.round(Dimensions.get('window').width) - 55
    },
    flag: {
        height: 16,
        width: 20,
        marginTop: 8
    }
});

export default tripProfileCard;