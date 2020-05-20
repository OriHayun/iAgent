import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const timer = ({ departDate }) => { //departDate already Date type
    const [month, setMonth] = useState(0);
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    // const [minuts, setMinuts] = useState(0);
    // const [seconds, setSeconds] = useState(0);
    let timer;

    useEffect(() => {
        timer = setInterval(function () {
            timeBetweenDates(departDate);
        }, 1000);
    }, [])

    timeBetweenDates = (toDate) => {
        var dateEntered = toDate;
        var now = new Date();
        var difference = dateEntered.getTime() - now.getTime();

        if (difference <= 0) {

            // Timer done
            clearInterval(timer);

        } else {
            var seconds = Math.floor(difference / 1000);
            var minutes = Math.floor(seconds / 60);
            var hours = Math.floor(minutes / 60);
            var days = Math.floor(hours / 24);
            var months = Math.floor(month / 30);

            hours %= 24;
            minutes %= 60;
            seconds %= 60;

            setDays(days);
            setHours(hours);
            // setMinuts(minutes);
            // setSeconds(seconds);
        }
    }

    return (
        <View style={styles.timerContainer}>
            <Text style={styles.timer}>{days} ימים {hours} שעות </Text>
        </View >
    );
};


const styles = StyleSheet.create({
    timerContainer: {
        alignItems: 'center',
    },
    timer: {
        padding: 5,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 5,
        fontSize: 20,
        color: '#999',
        letterSpacing: -1
    },

});

export default timer;
