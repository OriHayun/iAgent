import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking, Image } from 'react-native';
import { Text } from 'react-native-elements';
import { Zocial, MaterialCommunityIcons } from '@expo/vector-icons';
import Spacer from '../spacer';
import axios from 'axios';


const ticketInfo = ({ _destination, _depart, _return }) => {
    const [flagUri, setFlagUri] = useState('');

    handleClick = () => {
        const wikipediaUrl = `https://en.wikipedia.org/wiki/${_destination}`
        Linking.canOpenURL(wikipediaUrl).then(supported => {
            if (supported) {
                Linking.openURL(wikipediaUrl);
            } else {
                console.log("Don't know how to open URI: " + wikipediaUrl);
            }
        });
    };

    bringTwoLetterCuntryCode = async (destination) => {
        const codeResponse = await axios.get(`http://proj.ruppin.ac.il/igroup4/mobile/servertest/api/flag/city/${destination}`)
        setFlagUri(`https://www.countryflags.io/${codeResponse.data}/shiny/64.png`)
        console.log(flagUri)

    }

    useEffect(() => {
        bringTwoLetterCuntryCode(_destination);
    })



    return (
        <View style={styles.info}>
            <Spacer>
                <View style={{ flexDirection: 'row' }}>
                    {flagUri != '' ?
                        <Image source={{ uri: flagUri }} style={styles.flag} />
                        : null
                    }
                    <Text h4>{_destination} </Text>
                </View>
            </Spacer>
            <Text style={{ fontSize: 12 }}> <MaterialCommunityIcons name="airplane-takeoff" /> {_depart}</Text>
            <Text style={{ fontSize: 12 }}> <MaterialCommunityIcons name="airplane-landing" /> {_return}</Text>
            <TouchableOpacity style={{ padding: 10 }} onPress={handleClick}>
                <Text style={styles.wikipedia}>הכר את היעד  <Zocial name='wikipedia' size={13} /></Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    info: {
        alignItems: 'flex-end',
    },
    wikipedia: {
        color: 'blue'
    },
    flag: {
        height: 16,
        width: 20,
        marginTop: 8
    }
})

export default ticketInfo;