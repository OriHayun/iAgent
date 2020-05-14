import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import AgendaCalender from '../components/Calendar/AgendaCalender';
import moment from 'moment';
import { key } from '../api/unsplash';
import axios from 'axios';
import { MaterialIcons, Entypo } from '@expo/vector-icons';

const tripScreen = ({ navigation }) => {
    const trip = navigation.getParam('trip')
    const [rangeOfDates, setRangeOfDates] = useState([]);
    const StartDateArr = trip.DepartDate.split('-');
    const current = `${StartDateArr[0]}-${StartDateArr[1]}-${StartDateArr[2]}`
    const [imageUri, setImageUri] = useState('');

    useEffect(() => {
        (async function image() {
            const response = await axios.get(`https://api.unsplash.com/search/photos?query=${trip.Destination}&orientation=landscape&client_id=${key}`)
            setImageUri(response.data.results[1].urls.full)
        })();
    }, [])

    useEffect(() => {
        const arr = getDates(trip.DepartDate, trip.ReturnDate)
        setRangeOfDates(arr);
    }, [])


    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }


    return (
        <>
            <View style={{ flex: 0.4 }}>
                <TouchableOpacity
                    style={styles.findAttractionContainer}
                    onPress={() => navigation.navigate('search', { trip })}
                >
                    {imageUri != '' ?
                        < Image style={styles.image} source={{ uri: imageUri }} />
                        : null
                    }
                    <Text style={styles.searchAttractionText}>
                        חפש אטרקציה
                        <MaterialIcons name="touch-app" size={18} color="blue" />
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 0.6 }}>
                <AgendaCalender
                    current={current}
                    rangeOfDates={rangeOfDates}
                    tripId={trip.TripID}
                />
            </View>
        </>
    );
};

tripScreen.navigationOptions = ({ navigation }) => {
    let trip = navigation.getParam('trip')
    return {
        title: trip.Destination,
        headerTitleAlign: 'center',
        headerRight: () => {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('info')}>
                    <>{
                        <Entypo name="info" style={styles.info} />
                    }
                    </>
                </TouchableOpacity>
            )
        }
    }
}

const styles = StyleSheet.create({
    image: {
        width: undefined,
        height: undefined,
        aspectRatio: 1.65,
    },
    tripProfileIcon: {
        fontSize: 30,
        marginRight: 10
    },
    findAttractionContainer: {
        flex: 1,
    },
    searchAttractionText: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'blue'
    },
    info: {
        fontSize: 20,
        marginRight: 10

    }
})

export default tripScreen;