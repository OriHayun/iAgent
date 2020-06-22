import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Linking, Image, Alert } from 'react-native';
import { Text } from 'react-native-elements';
import { Zocial, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import Spacer from '../spacer';
import axios from 'axios';
import { navigate } from '../../navigationRef';
import firebase from 'firebase';
import moment from 'moment';
import { Context as CustomerContext } from '../../context/CustomerContext';

const ticketInfo = ({ _destination, _depart, _return, _Pdf_Flightticket }) => {

    const { state: { customerId, agentId } } = useContext(CustomerContext);

    const [flagUri, setFlagUri] = useState('');
    const [messages, setMessages] = useState([]);

    wikiHandleClick = () => {
        const wikipediaUrl = `https://en.wikipedia.org/wiki/${_destination}`
        Linking.canOpenURL(wikipediaUrl).then(supported => {
            if (supported) {
                Linking.openURL(wikipediaUrl);
            } else {
                console.log("Don't know how to open URI: " + wikipediaUrl);
            }
        });
    };

    ticketHandleClick = () => {
        Linking.canOpenURL(_Pdf_Flightticket).then(supported => {
            if (supported) {
                Linking.openURL(_Pdf_Flightticket);
            } else {
                console.log("Don't know how to open URI: " + _Pdf_Flightticket);
            }
        });
    };


    useEffect(() => {
        (async function TwoLetterCuntryCode() {
            const codeResponse = await axios.get(`http://proj.ruppin.ac.il/igroup4/prod/api/flag/city/${_destination}`)
            setFlagUri(`https://www.countryflags.io/${codeResponse.data}/shiny/64.png`)
        })();
    }, [])

    askForTicket = () => {
        let message = 'היי, אפשר את כרטיס הטיסה שלי ל ' + _destination;
        firebase.database().ref(`/chat/${customerId}`).push().set({
            //צריך פה להשתמש במזהה של היוזר שלנו כדי שנידע באיזה צד לשים את ההודעה
            time: moment().format('HH:mm'),
            userId: customerId,
            message: message,
            id: -10
        })
        Alert.alert(
            "הבקשה נשלחה",
            "הכרטיס ישלח בהקדם",
            [
                { text: "אישור", onPress: () => navigate('Chat', {}) }
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={styles.info}>
            <Spacer>
                <View style={{ flexDirection: 'row', marginLeft: -15 }}>
                    {flagUri != '' ?
                        <Image source={{ uri: flagUri }} style={styles.flag} />
                        : null
                    }
                    <Text h4>{_destination} </Text>
                </View>
            </Spacer>
            <Text style={{ fontSize: 12 }}> <MaterialCommunityIcons name="airplane-takeoff" /> {_depart}</Text>
            <Text style={{ fontSize: 12 }}> <MaterialCommunityIcons name="airplane-landing" /> {_return}</Text>
            <TouchableOpacity style={{ padding: 7 }} onPress={wikiHandleClick}>
                <Text style={styles.wikipedia}>הכר את היעד <Zocial name='wikipedia' size={13} /></Text>
            </TouchableOpacity>
            <>
                {_Pdf_Flightticket ?
                    <TouchableOpacity style={{ padding: 7 }} onPress={ticketHandleClick}>
                        <Text style={styles.wikipedia}>כרטיס טיסה <Entypo name='ticket' size={13} /></Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ padding: 7 }} onPress={askForTicket}>
                        <Text style={styles.wikipedia}>בקש את הכרטיס <Entypo name='ticket' size={13} /></Text>
                    </TouchableOpacity>
                }
            </>

        </View >
    );
};


const styles = StyleSheet.create({
    info: {
        flex: 0.7,
        alignItems: 'flex-end'
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