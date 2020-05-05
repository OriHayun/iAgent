import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import AgendaCalender from '../components/Calendar/AgendaCalender';
import CalendarList from '../components/Calendar/CalendarList';
import { AntDesign } from '@expo/vector-icons'
import moment from 'moment';


const tripScreen = ({ navigation }) => {
    const trip = navigation.getParam('trip')
    const [rangeOfDates, setRangeOfDates] = useState([]);
    const StartDateArr = trip.DepartDate.split('-');
    const current = `${StartDateArr[0]}-${StartDateArr[1]}-${StartDateArr[2]}`

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
            <View style={{ flex: 0.3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                <Image style={styles.image} source={{ uri: 'https://previews.123rf.com/images/noravector/noravector1709/noravector170900217/86271996-super-agent-comic-book-style-word-on-abstract-background-.jpg' }} />
                <Image style={styles.image} source={{ uri: 'https://previews.123rf.com/images/noravector/noravector1709/noravector170900217/86271996-super-agent-comic-book-style-word-on-abstract-background-.jpg' }} />
            </View>
            <View style={{ flex: 0.7 }}>
                {/* <CalendarList current={current} /> */}
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
        headerTitleAlign: 'center'
    }
}

const styles = StyleSheet.create({
    image: {
        height: 100,
        width: 100
    },
    tripProfileIcon: {
        fontSize: 30,
        marginRight: 10
    },
})

export default tripScreen;