import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import AgendaCalender from '../components/Calendar/AgendaCalender';
import CalendarList from '../components/Calendar/CalendarList';


const tripScreen = ({ navigation }) => {
    const trip = navigation.getParam('trip')
    const StartDateArr = trip._Depart.split('-');
    const current = `${StartDateArr[2]}-${StartDateArr[1]}-${StartDateArr[0]}`
    return (
        <>
            <View style={{ flex: 0.4 }}>

            </View>
            <View style={{ flex: 0.6 }}>
                <CalendarList current={current} />
            </View>
        </>
    );
};

tripScreen.navigationOptions = ({ navigation }) => {
    let trip = navigation.getParam('trip')
    return {
        title: trip._Destination,
        headerTitleAlign: 'center',

    }
}

const styles = StyleSheet.create({})

export default tripScreen;