import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown'


const profileComboBox = ({ profileName, tripId }) => {

    const [listOfProfileName, setListOfProfileName] = useState([]);

    // useEffect(() => {
    //     // ולהביא את רשימת פרופילי הטיול מהדאטה בייס ולאחסן אותם במערך בסטייט 
    // }, [])

    // const changeProfileTrip = (item) => {
    //     לקרוא לפונקציה בקונטקס לשינוי הפרופיל בטיול ספציפי
    // }
    return (
        <>
            <Dropdown
                label={profileName ? profileName : 'בחר פרופיל טיול'}
                data={listOfProfileName}
            // valueExtractor={(item) => changeProfileTrip(item)}
            />
        </>
    );
};

const styles = StyleSheet.create({});

export default profileComboBox;